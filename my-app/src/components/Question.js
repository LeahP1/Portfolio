import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
//styling imports 
import {MaterialIcons} from '@expo/vector-icons';

//code starts here for setting uo what the Question Card looks like and what the added Icons in order to flip the card. Answer code is in another file to help keep my code shorter.
export default function Question(props) {
    const {cardCounter, numOfQuestions, opacity, questions, showOtherSide} = props;

    if (!questions || cardCounter < 0 || cardCounter >= questions.length) {
        return null
    }

    return (
        <View>
            <Text style={styles.counter}>{cardCounter +1}/{numOfQuestions}</Text>
            <Animated.View style={[styles.container, {opacity}]}>
                <Text style={styles.cardText}>{questions[cardCounter].question}</Text>
                <TouchableOpacity onPress={showOtherSide} style={styles.cardTurnBtn}>
                    <MaterialIcons name='question-answer' style={styles.btnIcon}/>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

//styles
const styles = StyleSheet.create({
    counter: {
        color: '#61696b',
        marginLeft: 0,
    },
    container: {
        paddingLeft: 10,
        paddingTop: 10,
        margin: 10,
        marginTop: 30,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#31393c',
        borderWidth: 1,
        backgroundColor: '#d7f9fa',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: 200,
    },
    cardText: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 15,
        maxWidth: Dimensions.get('window').width -85,
        fontSize: 18,
        textAlign: 'left',
        color: '#61696b',
    },
    cardTurnBtn: {
        backgroundColor: '#ff9f1c',
        borderRadius: 9,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: 50,
        width: 50,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: {
        color: '#fff',
        fontSize: 20,
    },
})