import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import Api from '../../Api';
import BookItem from '../../components/BookItem';
import FabButton from '../../components/FabButton';
import Search from '../../assets/search.svg';
import NotFound from '../../assets/nao-encontrado.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forHorror() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchFiled, setSearchField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [searchEmpty, setSearchEmpty] = useState('none');
    const [textEmpty, setTextEmpty] = useState('none');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        Api.getBookByGen('Terror').then((response) => {
            if(response.data[0] != null) {
                setList(response.data);
                setTextEmpty('none');
                setMessageEmpty('none');
            }
            else {
                setMessageEmpty('flex');
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function clearMsg(){
    	setSearchEmpty('none');
        setMessageEmpty('none');
    }

    const handleSearch = async () => {
        setLoading(true);
        setList([]);
        if(searchFiled != ''){
            let res = await Api.getBookByName(searchFiled, 'Terror');
            if(res.data[0] != null) {
                setList(res.data);
                setTextEmpty('none');
                setMessageEmpty('none');
            }
            else {
                setMessageEmpty('flex');
            }
        } else {
            setSearchEmpty('flex');
        }
        setLoading(false);
    };

    useEffect(() => {
        let isFlag = true;
        Api.getBookByGen('Terror').then((response) => {
            if(isFlag) {
                if(response.data[0] != null) {
                    setList(response.data);
                    setTextEmpty('none');
                    setMessageEmpty('none');
                }
                else {
                    setMessageEmpty('flex');
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <Text style={{display: searchEmpty, color: '#000000', fontWeight: 'bold', marginBottom: 5}}>
                Digite o nome do livro que deseja...
                </Text>
                <View style={[styles.inputArea, { display: textEmpty }]}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Pesquise algum livro"
                        placeholderTextColor="#FFFFFF"
                        value={searchFiled}
                        onChangeText={t=>setSearchField(t)}
                        onFocus={t=>clearMsg()}
                    />
                    <TouchableOpacity style={styles.search} onPress={handleSearch}>
                        <Search width="24" height="24" fill="#FFFFFF" />
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
                            <BookItem key={k} data={item} />
                        ))}
                    </View>
                    <View style={[styles.messageNotFound, {display: messageEmpty}]}>
                        <NotFound width="60" height="60" fill="#FFFFFF" />
                        <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16, marginTop: 10}}>
                        Busca não encontrada
                        </Text>
                    </View>
                </ScrollView>
                <FabButton style={{ bottom: 130, right: 60 }} onPress={()=>{ textEmpty == 'none' ? setTextEmpty('flex') : setTextEmpty('none')}}/>
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
    inputArea: {
        width: 400,
        height: 40,
        backgroundColor: '#000000',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
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