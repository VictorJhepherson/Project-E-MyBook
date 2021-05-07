import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Api from '../Api';

import Back from '../assets/back.svg';
import FavoriteClean from '../assets/favorito-vazio.svg';
import Favorite from '../assets/favorito.svg';
import LocateModal from '../components/LocateModal';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function LocateBook() {
    const navigation = useNavigation();
    const route = useRoute();

    const [locateModal, setLocateModal] = useState(false);
    const [verify, setVerify] = useState(true);
    const [loading, setLoading] = useState(false);
    const [addFavorite, setAddFavorite] = useState('none');
    const [removeFavorite, setRemoveFavorite] = useState('none');
    const [disabledBack, setDisabledBack] = useState(false);
    const [disabledLocate, setDisabledLocate] = useState(false);

    const [bookInfo, setBookInfo] = useState({
        BOOK_ID: route.params.BOOK_ID,
        BOOK_NAME: route.params.BOOK_NAME,
        BOOK_DESC: route.params.BOOK_DESC,
        BOOK_STATUS: route.params.BOOK_STATUS,
        BOOK_AUTHOR: route.params.BOOK_AUTHOR,
        BOOK_GEN: route.params.BOOK_GEN,
        IMG_PATH: route.params.IMG_PATH
    });

    const setMessage = () => {
        setLoading(false);
        setAddFavorite('none');
        setRemoveFavorite('none');
        setDisabledBack(false);
        setDisabledLocate(false);
    };

    const setFavorite = async () => {
        setLoading(true);
        if(verify) {
            let json = await Api.addFavorite(bookInfo.BOOK_ID);
            if(!json.error) {
                setVerify(false);
                setAddFavorite('flex');
                setRemoveFavorite('none');
                setDisabledBack(true);
                setDisabledLocate(true);
            }
        } else {
            let json = await Api.removeFavorite(bookInfo.BOOK_ID);
            if(!json.error) {
                setVerify(true);
                setRemoveFavorite('flex');
                setAddFavorite('none');
                setDisabledBack(true);
                setDisabledLocate(true);
            }
        }
        wait(3000).then(setMessage);
    };

    useEffect(() => {
        let isFlag = true;
        Api.verifyFavorite(bookInfo.BOOK_ID).then((response) => {
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
        <View style={styles.background}>
            <ImageBackground 
            style={styles.photoArea} 
            source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }}
            >
               <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }} disabled={disabledBack}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.pageBody}>
                <View style={styles.infoBook}>
                    <Text style={styles.titleBook}>{bookInfo.BOOK_NAME}</Text>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Genêro:</Text>
                        <Text style={styles.title}>{bookInfo.BOOK_GEN}</Text>
                    </View>
                    <View style={styles.infoBody}>
                        <Text style={styles.typeTitle}>Autor:</Text>
                        <Text style={styles.title}>{bookInfo.BOOK_AUTHOR}</Text>
                    </View>
                    <View style={styles.infoBodyForDesc}>
                        <Text style={styles.typeTitle}>Descrição:</Text>
                        <Text style={styles.titleDesc}>{bookInfo.BOOK_DESC}</Text>
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
                <View style={styles.locateBook}>
                    {verify ?
                        <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledLocate}>
                            <FavoriteClean width="36" height="36" fill="#000000"/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.favoriteButton} onPress={setFavorite} disabled={disabledLocate}>
                            <Favorite width="36" height="36" fill="#000000"/>
                        </TouchableOpacity>
                    }
                    {bookInfo.BOOK_STATUS == 'd' ?
                        <TouchableOpacity style={styles.locateButton} onPress={() => { setLocateModal(true) }}>
                            <Text style={styles.textLocate}>Locar</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.locateButton} disabled={true}>
                            <Text style={styles.textLocate}>Indisponível</Text>
                        </TouchableOpacity>
                    }              
                </View>
            </View>
            <LocateModal 
                show={locateModal}
                setShow={setLocateModal}
                value={bookInfo.BOOK_ID}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    photoArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 415,
        paddingTop: 35,
        paddingLeft: 5,
        minHeight: 250
    },
    toBack: {
        width: 36,
        height: 36,
        alignItems: 'center'
    },
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    infoBook: {
        width: 400,
        height: 400,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    infoBody: {
        width: 350,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    infoBodyForDesc: {
        width: 350,
        height: 200,
        marginTop: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    warningFavorite: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleDesc: {
        marginTop: 10,
        fontSize: 17
    },
    titleBook: {
        fontWeight: 'bold',
        fontSize: 24
    },
    typeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 17
    },
    locateBook: {
        width: 380,
        height: 80,
        marginBottom: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    favoriteButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    locateButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLocate: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});