import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

//code starts here for the answer part of the card. I divided up the code into Answer.js and Questions.js so my code wouldnt be as long and it would be easier to look through.
export default function Answer(props) {
    const {cardCounter, numOfQuestions, opacity, questions, showOtherSide, userAnswer} = props;
    return (
        <View>
            <Text style={styles.questionCounter}>{cardCounter +1}/{numOfQuestions}</Text>
            <Animated.View style={[styles.container, {opacity}]}>
                <Text style={styles.cardText}>{questions[cardCounter].answer}</Text>
                <TouchableOpacity onPress={showOtherSide} style={styles.cardTurnBtn}>
                    <FontAwesome name='question' style={styles.btnIcon}/>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.answerBtnContainer, {opacity}]}>
                <TouchableOpacity style={styles.answerBtn} onPress={() => userAnswer(1)}>
                    <Ionicons name='checkmark-sharp' style={styles.btnIcon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answerBtn} onPress={() => userAnswer(0)}>
                    <Ionicons name='close-sharp' style={styles.btnIcon}/>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

// adding style
const styles = StyleSheet.create ({
    questionCounter: {
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
    answerBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 30,
    },
    answerBtn: {
        backgroundColor: '#ff9f1c',
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

})