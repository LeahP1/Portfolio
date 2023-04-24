import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { saveDeckTitle, getDecks, getDeck } from '../components/Functions';


//code starts here for AddDeckScreen.js
function AddDeckScreen(props) {
    const [value, setValue] = useState('')

    onChange= (value) => {
        setValue(value)
    }

    submitDeckTitle = () => {
        getDecks().then(res => {
            if (res === null) {
                saveDeckTitle(value)
                .then(() => {
                    getDeck(value).then(r => {
                        props.navigation.navigate('Deck', {deckID: r.title})
                    })
                    setValue('')
                })
            } else {
                if (Object.keys(res).some(e => e === value)) {
                    Alert.alert(
                        'Error',
                        'Already existing name for topic',
                        [{text: 'OK', onPress: () => console.log('Ok Pressed')},],
                        {cancelable: false},
                    )
                } else {
                    if (value !== '') {
                        saveDeckTitle(value).then(() => {
                            getDeck(value).then(r => {
                                props.navigation.navigate('Deck', {deckId: r.title})
                            })
                            setValue('')
                        })
                    } else {
                        Alert.alert(
                            '',
                            "Need to give the deck a title",
                            [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                            {cancelable: false},
                        )
                    }
                }
            }
        })
    }

    return (
        <View>
            <Text style={styles.header}>Create New Deck</Text>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder='Give Title'/>
                <TouchableOpacity
                onPress={submitDeckTitle}
                style={styles.submitBtn}>
                    <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

//Added styles
const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginBottom: 0,
        padding: 10,
    },
    header: {
        paddingTop: 20,
        fontSize: 20,
        textAlign: 'center',
        color: '#31393c',
    },
    input: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#d7f9fa',
        borderRadius: 2,
        borderStyle: 'solid',
        borderColor:'#31393c',
        borderWidth: 1,
    },
    submitBtn: {
        backgroundColor: '#ff9f1c',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#F7FAFA',
    },
})

export default AddDeckScreen;
