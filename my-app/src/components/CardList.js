import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
//import from files

//code starts here: the purpose of this code is for the user to be able to see both the question and answer so they can study.
export default function CardList(props) {
    const {deck} = props.route.params

    const renderItem = ({item}) => {
        const {question, answer} = item
        return (
            <View style={styles.container}>
                <Text style={styles.question}>{question}</Text>
                <Text style={styles.answer}>{answer}</Text>
            </View>
        )
    }
    return (
        <View style={styles.cardListContainer}>
            <FlatList
            data={deck.questions}
            keyExtractor={item => `${item.question}-${new Date}`}
            renderItem={renderItem}/>
        </View>
    )
}

//Styling
const styles= StyleSheet.create({
    cardListContainer: {
        margin:10,
        marginTop: 0,
    },
    container: {
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#d7f9fa',
        borderStyle: 'solid',
        borderColor: '#31393c',
        borderWidth: 1,
    },
    question: {
        fontSize: 25,
        textAlign: 'center',
        color: '#31393c',
    },
    answer: {
        fontSize: 20,
        paddingTop: 5,
        textAlign: 'center',
        color: '#61696b',
    },
})