import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';
import Lock from '../assets/lock.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow, value})  =>  {
    const [passwordField, setPasswordField] = useState('');
    const [passwordField2, setPasswordField2] = useState('');
    const [message, setMessage] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [messageEmpty2, setMessageEmpty2] = useState('none');
    const [messageEmpty3, setMessageEmpty3] = useState('none');

    const AlterPassword = async () => {
        if(passwordField != passwordField2) {
            setMessageEmpty('flex');
            wait(3000).then(() => { setMessageEmpty('none') });
        } else if (passwordField.length < 6 || passwordField.length > 10) {
            setMessageEmpty2('flex');
            wait(3000).then(() => { setMessageEmpty2('none') });
        } else {
            let json = await Api.alterPassword(value, passwordField);
            if(!json.error)
                setShow(false);
            else {
                setMessage(json.mensagem);
                setMessageEmpty3('flex');
                wait(3000).then(() => { setMessageEmpty3('none') });
            }
        }
    };

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <View style={styles.background}>
                <View style={styles.modalBody}>
                    <TouchableOpacity style={{width: 40, height: 40}} onPress={()=>{ setShow(false) }}>
                        <ExpandIcon width="40" height="40" fill="#000000"/>
                    </TouchableOpacity>
                    <View style={styles.passwordArea}>
                        <View style={styles.inputArea}>
                            <Lock width="24" height="24" fill="#000000" />
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite sua nova senha"
                                placeholderTextColor="#000000"
                                value={passwordField}
                                autoCapitalize='none'
                                onChangeText={t=>setPasswordField(t)}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.inputArea}>
                            <Lock width="24" height="24" fill="#000000" />
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite novamente sua senha"
                                placeholderTextColor="#000000"
                                value={passwordField2}
                                autoCapitalize='none'
                                onChangeText={t=>setPasswordField2(t)}
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                    <View style={styles.messageArea}>
                        <Text style={{ display: messageEmpty, color: '#FF0000', fontSize: 15 }}>
                            As senhas são diferentes! Tente novamente
                        </Text>
                        <Text style={{ display: messageEmpty2, color: '#FF0000', fontSize: 15 }}>
                            A senha deve ter entre 6 e 10 caracteres!
                        </Text>
                        <Text style={{ display: messageEmpty3, color: '#FF0000', fontSize: 15 }}>
                            {message}
                        </Text>
                    </View>
                    <View style={styles.confirmArea}>
                        <TouchableOpacity style={styles.passwordButton} onPress={AlterPassword}>
                            <Text style={styles.textPassword}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalBody: {
        backgroundColor: '#FFFFFF',
        minHeight: 350,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    passwordArea: {
        width: 350,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputArea: {
        width: 350,
        height: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    messageArea: {
        width: 350,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmArea: {
        width: 350,
        height: 100,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    passwordButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPassword: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});