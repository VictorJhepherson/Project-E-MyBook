import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Animated} from 'react-native';

export default function moreBook() {
    
    const [nameField, setNameField] = useState('');
    const [genField, setGenField] = useState('');
    const [descField, setDescField] = useState('');
    const [authorFiled, setAuthorField] = useState('');
    const [linkFiled, setLinkField] = useState('');
    const [messageEmpty, setMessageEmpty] = useState('none');
    const [validateEmpty, setValidateEmpty] = useState('none');
    const [lResult, setlResult] = useState({
        error: '',
        success: true
    });

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 150 }));

    const clearMessage = () => {
        setValidateEmpty('none'); 
        setMessageEmpty('none');
    };

    const handleSignClick = async () => {
        if( nameField != '' && genField != '' && authorFiled != '')
        {
            let json = await Api.addBook(nameField, descField, genField, authorFiled, linkFiled);
            if(json.token)
            {

            }
            else
            {
                alert("Erro: " + json.mensagem);
            }
        }
        else
        {
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

    return(
        <View style={styles.background}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Animated.View style={[ styles.pageBody,  { transform: [ { translateY: offset.y } ] }]}>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nome do livro*"
                        placeholderTextColor="#000000"
                        value={nameField}
                        onChangeText={t=>setNameField(t)}
                        onFocus={t=>clearMessage()}
                    />
                </View>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Gênero*"
                        placeholderTextColor="#000000"
                        value={genField}
                        onChangeText={t=>setGenField(t)}
                        onFocus={t=>clearMessage()}
                    />
                </View>
                 <View style={styles.textArea}>
                    <TextInput 
                        multiline={true} 
                        numberOfLines={5} 
                        style={styles.input} 
                        placeholder="Descrição"
                        placeholderTextColor="#000000"
                        value={descField}
                        onChangeText={t=>setDescField(t)}
                    />
                </View>
                <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Autor*"
                        placeholderTextColor="#000000"
                        value={authorFiled}
                        onChangeText={t=>setAuthorField(t)}
                        onFocus={t=>clearMessage()}
                    />
                    </View>
                    <View style={styles.inputArea}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Link PDF"
                        placeholderTextColor="#000000"
                        value={linkFiled}
                        onChangeText={t=>setLinkField(t)}
                    />
                    </View>
                     <View style={styles.messageValid}>
                        <Text style={{display: messageEmpty, color: '#FF0000', }}>
                        Preencha todos os campos!
                        </Text>
                        <Text style={{display: validateEmpty, color: '#FF0000', }}>
                        {lResult.error}
                        </Text>
                    </View>
                     <TouchableOpacity onPress={handleSignClick} style={styles.registerButton}>
                        <Text style={styles.registerText}>Cadastrar</Text>
                    </TouchableOpacity>
            </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
    textArea: {
        width: 350,
        height: 75,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 15,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000'
    },
    registerButton: {
        height: 50,
        width: 350,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold'
    },
    pageBody: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    messageValid: {
        width: 350,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});