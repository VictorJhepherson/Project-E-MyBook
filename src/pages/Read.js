import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Back from '../assets/back.svg';
import MyBook from '../assets/Logo.svg';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Read() {
    const navigation = useNavigation();
    const route = useRoute();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [bookInfo, setBookInfo] = useState({
        BOOK_PATH: route.params.BOOK_PATH
    });

    useEffect(() => {
        onRefresh();
    }, []);
    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.toBack} onPress={()=>{ navigation.navigate('Profile') }}>
                    <Back width="36" height="36" style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.title}>MyBook</Text>
                <MyBook width="36" height="36" style={styles.icon}/>
            </View>
            {refreshing && 
                <ActivityIndicator size="large" color="#000000"/>
            }
            <WebView source={{ uri: bookInfo.BOOK_PATH }} style={styles.webView}/>
        </View>
    );
}

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
    },
    webView: {
        width: 400
    }
})
