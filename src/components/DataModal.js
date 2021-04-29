import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, TextInput, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Api from '../Api';
import ExpandIcon from '../assets/expand.svg';

import Person from '../assets/person.svg';
import Email from '../assets/email.svg';
import Tel from '../assets/telefone-celular.svg';
import Doc from '../assets/pasta-de-documentos.svg';
import Today from '../assets/today.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default ({show, setShow, value})  =>  {

    const [nameField, setNameField] = useState(null);
    const [emailField, setEmailField] = useState(null);
    const [telField, setTelField] = useState(null);
    const [cpfField, setCPFField] = useState(null);
    const [ageField, setAgeField] = useState(null);
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [resultEmpty, setResultEmpty] = useState('none');
    const [lResult, setlResult] = useState({
        error: '',
        success: true
    });

    const clearResult = () => {
        lResult.error = '';
        lResult.success = true;
    };

    const emailValidate = () => {
        var usuario = emailField.substring(0, emailField.indexOf("@"));
        var dominio = emailField.substring(emailField.indexOf("@") + 1, emailField.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (usuario.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) 
        {
            return true;
        } else {
            return false;
        }
    };

    const fieldValidate = () => {
        clearResult();
        if(!emailValidate() && emailField.length != 0) {
            lResult.error = 'O EMAIL é inválido!',
            lResult.success = false;
            return lResult;
        } else if(telField.length < 14 && telField.length != 0) {
            lResult.error = 'O TELEFONE foi preenchido incorretamente!',
            lResult.success = false;
            return lResult;
        } else if(!dateValidate() && ageField.length != 0) {
            lResult.error = 'A DATA não é válida!',
            lResult.success = false;
            return lResult;
        } else if(cpfField.length < 14) {
            lResult.error = 'O CPF foi preenchido incorretamente!',
            lResult.success = false;
            return lResult;
        } else if(cpfField.length < 14 && cpfField.length != 0) {
                lResult.error = 'O CPF foi preenchido incorretamente!',
                lResult.success = false;
                return lResult;
        } else if(cpfField.length == 14) {
            var unmasked = cpfField;
            unmasked = unmasked.replace(".", "");
            unmasked = unmasked.replace(".", "");
            unmasked = unmasked.replace("-", "");

            var sum;
            var rest;
            sum = 0;
            if (unmasked == "00000000000" ||
                unmasked == "11111111111" ||
                unmasked == "22222222222" ||
                unmasked == "33333333333" ||
                unmasked == "44444444444" ||
                unmasked == "55555555555" ||
                unmasked == "66666666666" ||
                unmasked == "77777777777" ||
                unmasked == "88888888888" ||
                unmasked == "99999999999" ) 
            {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            }

            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(unmasked.substring(i - 1, i)) * (11 - i);
            }
            rest = (sum * 10) % 11;

            if ((rest == 10) || (rest == 11))  
                rest = 0;

            if (rest != parseInt(unmasked.substring(9, 10)) ) {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            }

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(unmasked.substring(i - 1, i)) * (12 - i);
            }
            rest = (sum * 10) % 11;

            if ((rest == 10) || (rest == 11))  
                rest = 0;

            if (rest != parseInt(unmasked.substring(10, 11) ) ) {
                lResult.error = 'O CPF é inválido!',
                lResult.success = false;
                return lResult;
            } 

        }

        return lResult;
    };

    const dateValidate = () => {
        var regex = /^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))$/;
        if(regex.test(ageField))
            return true;
        else 
            return false;
    };

    const AlterData = async () => {
        if(emailField == null && nameField == null && telField == null && ageField == null && cpfField == null) {
            setMessageEmpty('flex');
            wait(2000).then(() => { setMessageEmpty('none') });
        } else {
            let result = fieldValidate();
            if(result.success) {
                let json = await Api.alterData(value, nameField, emailField, telField, ageField, cpfField);
                if(!json.error) {
                    setShow(false);
                } else {
                    alert('Erro inesperado, contate o administrador');
                }
            } else {
                setResultEmpty('flex');
                wait(2000).then(() => { setResultEmpty('none') });
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
                    <Text style={styles.title}>Atualizar dados de cadastro</Text>
                    <View style={styles.inputArea}>
                        <Person width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu nome"
                            placeholderTextColor="#000000"
                            value={nameField}
                            onChangeText={t=>setNameField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Email width="24" height="24" fill="#000000" />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#000000"
                            value={emailField}
                            autoCapitalize='none'
                            onChangeText={t=>setEmailField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Tel width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99)'
                            }}
                            placeholder="Digite seu telefone"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            value={telField}
                            onChangeText={t=>setTelField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Today width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            placeholder="Data de nascimento"
                            placeholderTextColor="#000000"
                            value={ageField}
                            style={styles.TextMasked}
                            onChangeText={t=>setAgeField(t)}
                        />
                    </View>
                    <View style={styles.inputArea}>
                        <Doc width="24" height="24" fill="#000000" />
                        <TextInputMask
                            type={'cpf'}
                            value={cpfField}
                            placeholder="Digite seu CPF"
                            placeholderTextColor="#000000"
                            style={styles.TextMasked}
                            onChangeText={t=>setCPFField(t)}
                        />
                    </View>
                    <View style={styles.messageArea}>
                        <Text style={{ display: messageEmpty, color: '#FF0000', fontSize: 15 }}>
                            Todos os campos estão em branco!
                        </Text>
                        <Text style={{ display: resultEmpty, color: '#FF0000', fontSize: 15 }}>
                            {lResult.error}
                        </Text>
                    </View>
                    <View style={styles.confirmArea}>
                        <TouchableOpacity style={styles.passwordButton} onPress={AlterData}>
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
        minHeight: 550,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
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
    TextMasked: {
        flex: 1,
        fontSize: 16,
        color: "#000000",
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