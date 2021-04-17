import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default ({ state, navigation }) => {
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' }} horizontal={true}>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forYou')}>
                    <Text style={[styles.textPage, {opacity: state.index===0 ? 1 : 0.5}]}>Pra você</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forRomance')}>
                    <Text style={[styles.textPage, {opacity: state.index===1 ? 1 : 0.5}]}>Romance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forRealism')}>
                    <Text style={[styles.textPage, {opacity: state.index===2 ? 1 : 0.5}]}>Realismo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forTecnology')}>
                    <Text style={[styles.textPage, {opacity: state.index===3 ? 1 : 0.5}]}>Tecnologia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forChildish')}>
                    <Text style={[styles.textPage, {opacity: state.index===4 ? 1 : 0.5}]}>Infantil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPage} onPress={()=>goTo('forHorror')}>
                    <Text style={[styles.textPage, {opacity: state.index===5 ? 1 : 0.5}]}>Terror</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 60,
        justifyContent: 'space-around', 
        alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    buttonPage: {
        borderBottomWidth: 3,
        borderColor: '#000000',
        borderRadius: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    textPage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
})