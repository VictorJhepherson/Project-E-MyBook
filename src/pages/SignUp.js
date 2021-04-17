import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Animated, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import Api from '../Api';
import AvatarView from '../components/AvatarView';
import { UserContext } from '../contexts/UserContext';

import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';
import Person from '../assets/person.svg';
import Today from '../assets/today.svg';
import Tel from '../assets/telefone-celular.svg';
import Doc from '../assets/pasta-de-documentos.svg';
import Avatar from '../assets/avatar.svg';
import Avatar2 from '../assets/avatar2.svg';
import AvatarWoman from '../assets/avatar-women.svg';
import AvatarWoman2 from '../assets/avatar-women2.svg';
import Check from '../assets/checklist-checked-box.svg';

export default function SignUp() {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [telField, setTelField] = useState('');
    const [cpfField, setCPFField] = useState('');
    const [ageField, setAgeField] = useState('');
    const [avatar, setAvatar] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const handleSignClick = async () => {
        if(nameField != '' && ageField != '' && emailField != '' && passwordField != '' && cpfField != '' && avatar != '') {
            let json = await Api.signUp(nameField, ageField, telField, cpfField,  emailField, passwordField, avatar);
            if(json.token) {
                let signIn = await Api.signIn(emailField, passwordField); 
                if(signIn.token)  {
                    await AsyncStorage.setItem('token', signIn.token);
                    await AsyncStorage.setItem('user', signIn.data.USR_ID.toString());
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: signIn.data.AVATAR_PATH
                        }
                    });

                    navigation.reset({
                        routes: [{name: 'Home'}]
                    });

                }
            } else {
                alert("Erro: " + json.mensagem);
            }
        } else {
            setMessageEmpty('flex');
        }
    };

    useEffect(() => {
        Animated.spring(offset.y, {
            toValue: 0,
            speed: 10,
            bounciness: 20,
            useNativeDriver: true
        }).start();
    }, []);
    return (
        <KeyboardAvoidingView contentContainerStyle={styles.fixKeyboard} behavior="position" enabled>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center' }} horizontal={true}>
            <View style={styles.background}>
                <View style={styles.headerBody}>
                    <Image style={styles.icon} source={require('../assets/logo.png')}/>
                    <Text style={styles.title}>MyBook</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Animated.View style={[ styles.pageBody,  { transform: [ { translateY: offset.y } ] }]}>
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
                            <Lock width="24" height="24" fill="#000000" />
                            <TextInput
                                style={styles.input} 
                                placeholder="Digite sua senha"
                                placeholderTextColor="#000000"
                                secureTextEntry={true}
                                value={passwordField}
                                autoCapitalize='none'
                                onChangeText={t=>setpasswordField(t)}
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
                        <View style={styles.avatarView}>
                            <AvatarView Avatar={Avatar} onPress={useCallback(()=>setAvatar(1))}/>
                            {avatar == 1 && <Check width="20" height="20" fill="#000000" />}
                            <AvatarView Avatar={Avatar2} onPress={useCallback(()=>setAvatar(2))}/>
                            {avatar == 2 && <Check width="20" height="20" fill="#000000" />}
                            <AvatarView Avatar={AvatarWoman} onPress={useCallback(()=>setAvatar(3))}/>
                            {avatar == 3 && <Check width="20" height="20" fill="#000000" />}
                            <AvatarView Avatar={AvatarWoman2} onPress={useCallback(()=>setAvatar(4))}/>
                            {avatar == 4 && <Check width="20" height="20" fill="#000000" />}
                        </View>
                        <View style={styles.messageValid}>
                            <Text style={{display: messageEmpty, color: '#FF0000', }}>
                            Preencha todos os campos!
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleSignClick} style={styles.loginButton}>
                            <Text style={styles.loginText}>Cadastre-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{ navigation.navigate('SignIn') }} style={styles.registerButton}>
                            <Text style={styles.registerText}>Já possui uma conta?</Text>
                            <Text style={styles.registerTextBold}>Faça login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fixKeyboard: {
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        paddingTop: 80,
        alignContent: 'center'
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBody: {
        height: 200,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold'
    },
    icon: {
        width: '35%',
        height: 140,
    },
    pageBody: {
        width: 400,
        height: 500,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inputArea: {
        width: 350,
        height: 45,
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
    avatarView: {
        width: 400,
        height: 60,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    messageValid: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        height: 50,
        width: 350,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    registerButton: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerText: {
        fontSize: 16,
        color: '#000000'
    },
    registerTextBold: {
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 5
    }
});