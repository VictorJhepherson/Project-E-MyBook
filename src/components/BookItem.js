import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default ({data}) => {
    const navigation = useNavigation();

    const handleLocateBook = async () => {
        navigation.navigate('LocateBook', {
            BOOK_ID: data.BOOK_ID,
            BOOK_NAME: data.BOOK_NAME,
            BOOK_DESC: data.BOOK_DESC,
            BOOK_STATUS: data.BOOK_STATUS,
            BOOK_AUTHOR: data.BOOK_AUTHOR,
            BOOK_GEN: data.GEN_NOME
        });
    };

    return (
        <TouchableOpacity style={styles.bookItem} onPress={handleLocateBook}>
            <Image style={styles.bookPhoto} source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }} />
            <View style={styles.bookInfo}>
                <Text style={styles.title}>Título: {data.BOOK_NAME}</Text>
                <Text style={styles.title}>Status: {data.BOOK_STATUS == 'd' ? 'Disponível' : 'Indisponível'}</Text>
                <Text style={styles.title}>Genêro: {data.GEN_NOME}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bookItem: {
        backgroundColor: '#000000',
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000000'
    },
    bookPhoto: {
        width: 77,
        height: 77,
        borderRadius: 20
    },
    bookInfo: {
        justifyContent: 'space-between',
        marginLeft: 20,
        maxWidth: 250
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#FFFFFF'
    }
});