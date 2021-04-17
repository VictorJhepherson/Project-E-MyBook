import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';

export default ({Avatar, onPress}) => {
    return(
        <TouchableOpacity style={styles.avatarButtton} onPress={onPress}>
            <Avatar width="80" height="60"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    avatarButtton: {
        width: 80,
        height: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});