import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import FavoriteItem from '../../components/FavoriteItem';
import NotFound from '../../assets/nao-encontrado.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const navigation = useNavigation();

    const [listFavorite, setListFavorite] = useState([]);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getFavorites().then((response) => {
            if(response.data[0] != null) {
                setListFavorite(response.data);
                setMessageEmpty('none');
            }
            else {
                setListFavorite([]);
                setMessageEmpty('flex');
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let isFlag = true;
        setListFavorite([]);
        const unsubscribe = navigation.addListener('focus', () => {
            Api.getFavorites().then((response) => {
                if(isFlag) {
                    if(response.data[0] != null) {
                        setListFavorite(response.data);
                        setMessageEmpty('none');
                    }
                    else {
                        setListFavorite([]);
                        setMessageEmpty('flex');
                    }
                }
            }).catch((error) => {
                alert('Erro inesperado, contate o adminstrador');
            });
        });
        Api.getFavorites().then((response) => {
            if(isFlag) {
                if(response.data[0] != null) {
                    setListFavorite(response.data);
                    setMessageEmpty('none');
                }
                else {
                    setListFavorite([]);
                    setMessageEmpty('flex');
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false, unsubscribe };
    }, [], [navigation]);
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
                    horizontal={false} 
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        />
                    }
                >
                    {listFavorite &&
                        listFavorite.map((item, k) => (
                            <FavoriteItem key={k} data={item} />
                        ))
                    }
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Você não possui livros na lista de favoritos!
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    messageNotFound: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
});