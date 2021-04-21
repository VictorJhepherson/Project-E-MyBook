import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';
import PasswordModal from '../../components/PasswordModal';
import Account from '../../assets/account.svg';
import LogOut from '../../assets/logout.svg';
import Admin from '../../assets/configuracao.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function forInfo() {
    const { state: user } = useContext(UserContext);
    const navigation = useNavigation();

    const [idUser, setIdUser] = useState(0);
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [passwordModal, setpasswordModal] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const signOut = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.reset({
                routes: [{name: 'SignIn'}]
            });
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    useEffect(() => {
        let isFlag = true;
        Api.getUserId().then((response) => {
            if(isFlag) {
                if(response.lenght < 1) {
                    alert('Usuário não encontrado');
                }
                else {
                    response.data.map((item, k) => {
                        setCPF(item.USRDOC_CPFNUMBER);
                        setPhone(item.USR_PHONENUMBER);
                        setBirthday(item.USR_DATEBIRTHDAY);
                        setEmail(item.USR_LOGINNAME);
                        setName(item.USR_NAME);
                        setIdUser(item.USR_ID);
                        setUserType(item.USRTYPE_ID);
                    });
                }
            }
        }).catch((error) => {
            alert('Erro inesperado, contate o adminstrador');
        });
        return () => { isFlag = false };
    }, []);
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
            <View style={styles.pageBody}>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFFFFF' }} 
                    horizontal={false} 
                    refreshControl={
                        <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        />
                    }
                >
                    <View style={styles.container}>
                        <View style={styles.infoPhoto}>
                            {user.avatar != '' && user.avatar != undefined ?
                                <Image style={styles.userPhoto} source={{uri: user.avatar}}/>
                                : <Account width="60" height="60" fill="#000000"/>
                            }
                            <Text style={styles.userName}>{name}</Text>
                            {userType == 1 &&
                                <TouchableOpacity style={styles.adminButton} onPress={()=> navigation.navigate('Admin') }>
                                    <Admin width="30" height="30" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>CPF:</Text>
                            <Text style={styles.title}>{cpf}</Text>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Telefone:</Text>
                            <Text style={styles.title}>{phone}</Text>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Nascimento:</Text>
                            <Text style={styles.title}>{birthday}</Text>
                        </View>
                        <View style={styles.infoBody}>
                            <Text style={styles.typeTitle}>Email:</Text>
                            <Text style={styles.title}>{email}</Text>
                        </View>
                        <TouchableOpacity style={styles.passwordButton} onPress={()=>{ setpasswordModal(true) }}>
                            <Text style={styles.passwordText}>Alterar senha</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerArea}>
                        <View style={styles.signOutArea}>
                            <Text style={styles.signOutText}>Deseja sair?</Text>
                            <TouchableOpacity style={{width: 36, height: 36}} onPress={signOut}>
                                <LogOut width="36" height="36"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <PasswordModal 
                show={passwordModal}
                setShow={setpasswordModal}
                value={idUser}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageBody: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF'
    },
    container: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10
    },
    infoPhoto: {
        width: 380,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 10
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5
    },
    adminButton: {
        width: 200,
        marginLeft: 20,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    infoBody: {
        width: 350,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    typeTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 17
    },
    passwordButton: {
        width: 150,
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#17F1A1'
    },
    passwordText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    containerArea: {
        width: 400,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#FFFFFF'
    },
    signOutArea: {
        width: 150,
        height: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    signOutText: {
        color: '#FF0000',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 5
    }
});