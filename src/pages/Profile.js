import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileTabBar from '../components/ProfileTabBar';
import forInfo from '../pages/sub-pages/forInfo';
import forLeased from '../pages/sub-pages/forLeased';
import forFavorites from '../pages/sub-pages/forFavorites';
import Back from '../assets/back.svg';

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
    const navigation = useNavigation();

    return(
        <View style={styles.background}>
            <ImageBackground 
            style={styles.photoArea} 
            source={{ uri: 'https://super.abril.com.br/wp-content/uploads/2018/04/bibliotecas.png?quality=70&strip=info&resize=680,453' }}
            >
                <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Home') }}>
                    <Back width="36" height="36" fill="#FFFFFF"/>
                </TouchableOpacity>
            </ImageBackground>
            <Tab.Navigator tabBar={props=><ProfileTabBar {...props} />}>
                <Tab.Screen name="forInfo" component={forInfo}/>
                <Tab.Screen name="forLeased" component={forLeased}/>
                <Tab.Screen name="forFavorites" component={forFavorites}/>
            </Tab.Navigator>
        </View>
    );
} 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    photoArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        minWidth: 415,
        paddingTop: 35,
        paddingLeft: 5,
        minHeight: 250
    },
    toBack: {
        width: 36,
        height: 36,
        alignItems: 'center'
    }
});