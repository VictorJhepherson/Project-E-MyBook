import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Search from '../assets/search.svg';

export default class components extends Component {
    render(){
        return(
            <View style={[styles.container, this.props.style]}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={[styles.button, styles.menu]}>
                        <Search width="30" height="30" fill="#000000"/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center'
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#F00A62',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10
        }
    },
    menu: {
        backgroundColor: '#F00A62'
    }
})