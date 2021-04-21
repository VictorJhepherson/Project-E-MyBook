import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function searchBook() {
    return(
        <View style={styles.background}>
            <Text>searchBook</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});