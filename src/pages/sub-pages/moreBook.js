import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function moreBook() {
    return(
        <View style={styles.background}>
            <Text>moreBook</Text>
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