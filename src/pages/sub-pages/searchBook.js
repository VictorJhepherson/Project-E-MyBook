import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import BookAdmin from '../../components/BookAdmin';
import Api from '../../Api';
import Search from '../../assets/search.svg';
import NotFound from '../../assets/nao-encontrado.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function searchBook() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchFiled, setSearchField] = useState('');
    const [userFiled, setUserField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [searchEmpty, setSearchEmpty] = useState('none');
    const [userEmpty, setUserEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getBookLocates().then((response) => {
            if(response.data[0] != null) {
                setList(response.data);
                setMessageEmpty('none');
            }
            else {
                setList([]);
                setMessageEmpty('flex');
                wait(2000).then(()=>{ setMessageEmpty('none') })
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const byBook = async () => {
        if(searchFiled != '') {
            let json = await Api.getBookLocatesByBookName(searchFiled);
            if(json.data[0] != null) {
                setList(json.data);
                setMessageEmpty('none');
            } else {
                setList([]);
                setMessageEmpty('flex');
            }
        } else {
            setSearchEmpty('flex');
            wait(2000).then(()=>{ setSearchEmpty('none') })
        }
    };

    const byUser = async () => {
        if(userFiled != '') {
            let json = await Api.getBookLocatesByUserName(userFiled);
            if(json.data[0] != null) {
                setList(json.data);
                setMessageEmpty('none');
            } else {
                setList([]);
                setMessageEmpty('flex');
            }
        } else {
            setUserEmpty('flex');
            wait(2000).then(()=>{ setUserEmpty('none') })
        }
    };

    useEffect(() => {
        let isFlag = true;
        Api.getBookLocates().then((response) => {
            if(isFlag){
                if(response.data[0] != null) {
                    setList(response.data);
                    setMessageEmpty('none');
                }
                else {
                    setList([]);
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
                <Text style={{display: searchEmpty, color: '#000000', fontWeight: 'bold', marginBottom: 5}}>
                Digite o nome do livro que deseja...
                </Text>
                <Text style={{display: userEmpty, color: '#000000', fontWeight: 'bold', marginBottom: 5}}>
                Digite o nome do usuário que deseja...
                </Text>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Pesquisar por livro"
                        placeholderTextColor="#000000"
                        value={searchFiled}
                        onChangeText={t=>setSearchField(t)}
                    />
                    <TouchableOpacity style={styles.search} onPress={byBook}>
                        <Search width="24" height="24" fill="#000000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Pesquisar por usuário"
                        placeholderTextColor="#000000"
                        value={userFiled}
                        onChangeText={t=>setUserField(t)}
                    />
                    <TouchableOpacity style={styles.search} onPress={byUser}>
                        <Search width="24" height="24" fill="#000000" />
                    </TouchableOpacity>
                </View>
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
                    {loading && 
                        <ActivityIndicator size="large" color="#000000"/>
                    }
                    <View style={styles.listArea}>
                        {list.map((item, k) => (
                            <BookAdmin key={k} data={item} />
                        ))}
                    </View>
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Busca não encontrada
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    inputArea: {
        width: 400,
        height: 40,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    search: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    listArea: {
        width: 400,
    },
    messageNotFound: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center'
    }
});