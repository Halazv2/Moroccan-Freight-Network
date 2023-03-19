import React , { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar, Dimensions, Alert, ActivityIndicator } from 'react-native';
import Button from './Button';
import { theme } from '../core/theme';

export default function LocationPicker(props){

    console.log(props.choices)
    const [data , setData] = useState(props.choices);
    const [selected , setSelected] = useState('current');

    const PickChoice = (value) => {
        if(value === 'Current Location'){
            setSelected('current');
            props.value('current');
        }else{
            setSelected('other');
            props.value('other');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.picker}>
                {
                    data.map((item, index) => {
                        return(
                            <Button
                                key={index}
                                mode={
                                    (item.value === 'Current Location')?
                                    (selected === 'current') ? 
                                        "contained" : "outlined" : 
                                    (selected === 'other') ? 
                                        "contained" : "outlined" 
                                    }
                                onPress={() => PickChoice(item.value)}
                                style={[styles.buttonPicker]}
                            >
                                {item.value}
                            </Button>
                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonPicker: {
        width: '100%',
    },
    mapsContainer: {
        position: 'absolute',
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        top: -200,
        left: -50,
        width: 258,
        height: 258,
    },
    maps: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
