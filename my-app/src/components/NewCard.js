import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
// import my files
import { addCardToDeck } from './Functions';


//code lets user add aquestion and answer, and if they do not add input it will alert them to fill out the info.
class NewCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onChangeQuestion = (value) => {
        this.setState({
            question: value
        })
    }
    onChangeAnswer = (value) => {
        this.setState({
            answer: value
        })
    }

    submitCard = async () => {
        const {navigation, route} = this.props
        const {deck} = route.params
        const {question, answer} = this.state

        if (question === '' || answer === '') {
            Alert.alert(
                '',
                `Don't forget to add' ${question === '' ? 'a question' : 'an answer'}`,
                [{text: 'OK', onPress: () => console.log('OK Pressed')},],
                {cancelable: false},
            )
        } else {
            await addCardToDeck(deck.title, question, answer)
                navigation.navigate('Deck', {deckId: deck.title})
        }
    }

    render() {
        const {question, answer} = this.state
        const {navigation, route} = this.props
        const {deck} = route.params
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{deck.title} deck</Text>
                <TextInput
                style={styles.input}
                value={question}
                id='question'
                onChangeText={this.onChangeQuestion}
                placeholder='Question'/>
                <TextInput
                style={styles.input}
                value={answer}
                id='answer'
                onChangeText={this.onChangeAnswer}
                placeholder='Answer'/>
                <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.submitCard}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

//adding styles 

const styles = StyleSheet.create ({
    container: {
        margin: 20,
        marginBottom: 0,
        padding: 10,
    },
    header: {
        paddingBottom: 30,
        fontSize: 25,
        textAlign: 'center',
        color: '#31393c',
    },
    input: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 15,
        backgroundColor: '#d7f9fa',
        borderRadius: 2,
        borderStyle: 'solid',
        borderColor: '#31393c',
        borderWidth: 1,
    },
    submitBtn: {
        backgroundColor: '#ff9f1c',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
    },
})

export default NewCard;