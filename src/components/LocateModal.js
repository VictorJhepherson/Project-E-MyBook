import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';
import Check from '../assets/checklist-checked-box.svg';

export default ({show, setShow, value})  =>  {
    const [seven, setSeven] = useState(false);
    const [fourteen, setFourteen] = useState(false);
    const [verify, setVerify] = useState('');
    const [message, setMessage] = useState([]);

    const LocateBook = async () => {
        let json;
        seven ? json = await Api.locateBook(value, 7) : json = await Api.locateBook(value, 14)
        
        if(json.mensagem) 
            setMessage(<Text tyle={{ color: '#FF0000', fontWeight: 'bold' }}>{json.mensagem}</Text>);
        else if(json.error)
            setMessage(<Text style={{ color: '#FF0000', fontWeight: 'bold' }}>Não foi possível realizar a locação do livro</Text>);
        else 
            setShow(false);
    };

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <View style={styles.background}>
                <View style={styles.modalBody}>
                    {message}
                    <TouchableOpacity style={{width: 40, height: 40}} onPress={()=>{ setShow(false) }}>
                        <ExpandIcon width="40" height="40" fill="#000000"/>
                    </TouchableOpacity>
                    <View style={styles.checkArea}>
                        {verify == 1 && <Check width="20" height="20" fill="#000000" />}
                        <TouchableOpacity 
                        style={styles.buttonDays} 
                        disabled={seven} 
                        onPress={()=>{ setFourteen(false); setSeven(true); setVerify(1); }}>
                            <Text style={styles.textDays}>7 Dias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.buttonDays} 
                        disabled={fourteen} 
                        onPress={()=>{ setSeven(false); setFourteen(true); setVerify(2); }}>
                            <Text style={styles.textDays}>14 Dias</Text>
                        </TouchableOpacity>
                        {verify == 2 && <Check width="20" height="20" fill="#000000" />}
                    </View>
                    <View style={styles.locateArea}>
                        <TouchableOpacity style={styles.locateButton} onPress={LocateBook}>
                            <Text style={styles.textLocate}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalBody: {
        backgroundColor: '#FFFFFF',
        minHeight: 300,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    checkArea: {
        width: 350,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    buttonDays: {
        width: 130,
        height: 60,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDays: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    locateArea: {
        width: 350,
        height: 100,
        alignItems: 'center',
        marginTop: 10
    },
    locateButton: {
        width: 300,
        height: 50,
        backgroundColor: '#17F1A1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLocate: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000'
    }
});