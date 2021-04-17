import React from 'react';
import { TouchableOpacity, View, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../Api';

export default ({data}) => {
    const navigation = useNavigation();

    const handleRead = async () => {
        if(data.BOOK_PATH != null) {
            navigation.navigate('Read', {
                BOOK_PATH: data.BOOK_PATH
            });
        } else {
            Alert.alert(
                'Aviso',
                'Não foi possível abrir o livro, tente novamente mais tarde ou contate o administrador: contato-mybook@mybook.com.br',
                [
                    { text: "OK" }
                ]
            );
        }
    };

    const DeliveryBook = async () => {
        let json = await Api.giveBackBook(data.BOOK_ID);
        if(json.error) {
            Alert.alert(
                'Aviso',
                'Não foi possível abrir o livro, tente novamente mais tarde ou contate o administrador: contato-mybook@mybook.com.br',
                [
                    { text: "OK" }
                ]
            );
        }
    }

    const handleEntrega = async () => {
        Alert.alert(
            'Aviso',
            'Tem certeza que deseja realizar a entrega?',
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Confirmar", onPress: DeliveryBook }
            ]
        );
    };

    return (
        <View style={styles.background}>
            <View style={styles.infoArea}>
                <Text style={styles.infoBook}>Título: {data.BOOK_NAME}</Text>
                <Text style={styles.infoBook}>Status: {data.LOC_STATUS == 'l' ? 'Locado' : 'Disponível'}</Text>
                <Text style={styles.infoBook}>Data locação: {data.LOC_DATE_RETIRADA}</Text>
                <Text style={styles.infoBook}>Data expiração: {data.LOC_DATE_ENTREGA}</Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#17F1A1' }]} onPress={handleRead}>
                    <Text style={styles.buttonText}>Ler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#F00A62' }]} onPress={handleEntrega}>
                    <Text style={styles.buttonText}>Entregar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        minWidth: 380,
        minHeight: 140,
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    infoArea: {
        width: 300,
        height: 70,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    infoBook: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    },  
    buttonArea: {
        width: 300,
        height: 40,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#000000'
    },
    button: {
        width: 100,
        height: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    }
});