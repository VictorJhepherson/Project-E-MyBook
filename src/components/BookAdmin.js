import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default ({data}) => {
    return (
        <View style={styles.bookItem}>
            <Image style={styles.bookPhoto} source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }} />
            <View style={styles.bookInfo}>
                <Text style={styles.title}>Título: {data.BOOK_NAME}</Text>
                <Text style={styles.title}>Entrega: {data.LOC_DATE_ENTREGA}</Text>
                <Text style={styles.title}>Usuário: {data.USR_NAME}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bookItem: {
        backgroundColor: '#F5F5F5',
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
        color: '#000000'
    }
});