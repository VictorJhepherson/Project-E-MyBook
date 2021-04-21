import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AdminTabBar from '../components/AdminTabBar';
import Back from '../assets/back.svg';
import MyBook from '../assets/Logo.svg';

import moreBook from '../pages/sub-pages/moreBook';
import searchBook from '../pages/sub-pages/searchBook';

const Tab = createMaterialTopTabNavigator();

export default function Admin() {
    const navigation = useNavigation();

    return(
        <View style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Profile') }}>
                    <Back width="36" height="36" style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.title}>MyBook</Text>
                <MyBook width="36" height="36" style={styles.icon}/>
            </View>
            <Tab.Navigator tabBar={props=><AdminTabBar {...props} />}>
                <Tab.Screen name="moreBook" component={moreBook}/>
                <Tab.Screen name="searchBook" component={searchBook}/>
            </Tab.Navigator>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
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
    toBack: {
        width: 36,
        height: 36
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold'
    },
    icon: {
        width: 36,
        height: 36,
    }
});