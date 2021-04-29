import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, KeyboardAvoidingView, Animated } from 'react-native';
import Api from '../Api';
import { UserContext } from '../contexts/UserContext';

import Email from '../assets/email.svg';
import Lock from '../assets/lock.svg';

export default function SignIn() {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [messagePassword, setMessagePassword] = useState('none');
    const [messageEmpty, setMessageEmpty] = useState('none');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField); 
            if(json.token) {
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('user', json.data.USR_ID.toString());
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.AVATAR_PATH
                    }
                });

                navigation.reset({
                    routes: [{name: 'Home'}]
                });

            } else {
                setMessagePassword('flex');
            }

        } else {
            setMessageEmpty('flex');
        }
    }

    function clearMsg(){
    	setMessagePassword('none');
    	setMessageEmpty('none');
    }

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
        <View style={styles.background}>
            <View style={styles.headerBody}>
                <Image style={styles.icon} source={require('../assets/logo.png')}/>
                <Text style={styles.title}>MyBook</Text>
            </View>
            <Animated.View style={[ styles.pageBody, { transform: [ { translateY: offset.y } ] }]}>
                <View style={styles.titleArea}>
                    <Text style={styles.subtitle}>Insira suas informações para realizar o login</Text>
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
                        onFocus={t=>clearMsg()}
                    />
                </View>
                <View style={styles.inputArea}>
                    <Lock width="24" height="24" fill="#000000" />
                    <TextInput
                        style={styles.input} 
                        placeholder="Digite sua senha"
                        placeholderTextColor="#000000"
                        value={passwordField}
                        autoCapitalize='none'
                        onChangeText={t=>setpasswordField(t)}
                        onFocus={t=>clearMsg()}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.wrongPassword}>
                    <Text style={{display: messagePassword, color: '#FF0000'}}>
                    Sua senha/email está incorreta. Por favor tente novamente.
                    </Text>
                    <Text style={{display: messageEmpty, color: '#FF0000', }}>
                    Preencha os campos!
                    </Text>
                </View>
                <TouchableOpacity onPress={handleSignClick} style={styles.loginButton}>
                    <Text style={styles.loginText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ navigation.navigate('SignUp') }} style={styles.registerButton}>
                    <Text style={styles.registerText}>Ainda não possui uma conta?</Text>
                    <Text style={styles.registerTextBold}>Cadastre-se</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
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
        height: 250,
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
        height: 400,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleArea: {
        width: 350,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    inputArea: {
        width: 350,
        height: 50,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000000'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginLeft: 5
    },
    wrongPassword: {
        width: 350,
        height: 40,
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