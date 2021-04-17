import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import HomeTabBar from '../components/HomeTabBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserContext } from '../contexts/UserContext';

import forYou from '../pages/sub-pages/forYou';
import forRomance from '../pages/sub-pages/forRomance';
import forRealism from '../pages/sub-pages/forRealism';
import forTecnology from '../pages/sub-pages/forTecnology';
import forChildish from '../pages/sub-pages/forChildish';
import forHorror from '../pages/sub-pages/forHorror';

import MyBook from '../assets/Logo.svg';
import Account from '../assets/account.svg';

const Tab = createMaterialTopTabNavigator();

export default function Home({state}) {
    const { state: user } = useContext(UserContext);
    const navigation = useNavigation();

    const handleMessageButtonClick = async () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <MyBook width="36" height="36" style={styles.icon}/>
                <Text style={styles.title}>MyBook</Text>
                <TouchableOpacity style={styles.profile} onPress={handleMessageButtonClick}>
                    {user.avatar != '' && user.avatar != undefined ?
                        <Image style={styles.userPhoto} source={{uri: user.avatar}}/>
                        : <Account width="36" height="36" fill="#000000"/>
                    }
                </TouchableOpacity>
            </View>
            <Tab.Navigator tabBar={props=><HomeTabBar {...props} />}>
                <Tab.Screen name="forYou" component={forYou}/>
                <Tab.Screen name="forRomance" component={forRomance}/>
                <Tab.Screen name="forRealism" component={forRealism}/>
                <Tab.Screen name="forTecnology" component={forTecnology}/>
                <Tab.Screen name="forChildish" component={forChildish}/>
                <Tab.Screen name="forHorror" component={forHorror}/>
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 130,
        width: 415,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingTop: 60,
        backgroundColor: '#17F1A1'
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold'
    },
    icon: {
        width: 36,
        height: 36,
    },
    userPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
});