import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import Api from '../Api';
import FavoriteClean from '../assets/favorito-vazio.svg';
import Favorite from '../assets/favorito.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({data}) => {
    const [verify, setVerify] = useState(true);
    const [addFavorite, setAddFavorite] = useState('none');
    const [removeFavorite, setRemoveFavorite] = useState('none');
    const [disabledFavorite, setDisabledFavorite] = useState(false);

    const setMessage = () => {
        setAddFavorite('none');
        setRemoveFavorite('none');
        setDisabledFavorite(false);
    };

    const setFavorite = async () => {
        if(verify) {
            let json = await Api.addFavorite(data.BOOK_ID);
            if(!json.error) {
                setVerify(false);
                setAddFavorite('flex');
                setRemoveFavorite('none');
                setDisabledFavorite(true);
            }
        } else {
            let json = await Api.removeFavorite(data.BOOK_ID);
            if(!json.error) {
                setVerify(true);
                setRemoveFavorite('flex');
                setAddFavorite('none');
                setDisabledFavorite(true);
            }
        }
        wait(3000).then(setMessage);
    };

    useEffect(() => {
        let isFlag = true;
        Api.verifyFavorite(data.BOOK_ID).then((response) => {
            if(isFlag){
                if(response.data != 0 ) {
                    setVerify(false);
                } else {
                    setVerify(true);
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);
    return (
        <View style={styles.favoriteItem}>
            <Image style={styles.bookPhoto} source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }} />
            <View style={styles.viewArea}>
                <View style={styles.bookInfo}>
                    <View style={styles.bookText}>
                        <Text style={styles.title}>{data.BOOK_NAME}</Text>
                    </View>
                    <View style={styles.bookFavorite}>
                        {verify ?
                            <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledFavorite}>
                                <FavoriteClean width="36" height="36" fill="#FFFFFF"/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledFavorite}>
                                <Favorite width="36" height="36" fill="#FFFFFF"/>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.warningFavorite}>
                    <Text style={{display: addFavorite, color: '#FF0000'}}>
                    Livro adicionado aos favoritos!
                    </Text>
                    <Text style={{display: removeFavorite, color: '#FF0000', }}>
                    Livro removido dos favoritos!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    favoriteItem: {
        backgroundColor: '#F5F5F5',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000',
        alignItems: 'center'
    },
    bookPhoto: {
        width: 77,
        height: 77,
        borderRadius: 20
    },
    viewArea: {
        justifyContent: 'space-around',
        marginLeft: 20,
        width: 250,
        backgroundColor: '#F5F5F5'
    },
    bookInfo: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        minHeight: 70,
    },
    bookText: {
        backgroundColor: '#F5F5F5',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 70,
        width: 150
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000'
    },
    bookFavorite: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40
    },
    favoriteButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    warningFavorite: {
        width: 250,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});