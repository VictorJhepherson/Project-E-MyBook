import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import Api from '../../Api';
import LocateItem from '../../components/LocateItem';
import NotFound from '../../assets/nao-encontrado.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const [listLocate, setListLocate] = useState([]);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getLocates().then((response) => {
            if(response.data[0] != null) {
                setListLocate(response.data);
                setMessageEmpty('none');
            }
            else {
                setListLocate([]);
                setMessageEmpty('flex');
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let isFlag = true;
        setListLocate([]);
        Api.getLocates().then((response) => {
            if(isFlag) {
                if(response.data[0] != null) {
                    setListLocate(response.data);
                    setMessageEmpty('none');
                }
                else {
                    setListLocate([]);
                    setMessageEmpty('flex');
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);
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
                    {listLocate &&
                        listLocate.map((item, k) => (
                            <LocateItem key={k} data={item} />
                        ))
                    }
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Voc?? n??o possui livros!
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