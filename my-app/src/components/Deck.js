import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
//imports from my files
import DeckView from './DeckView';
import { getDecks, getDeck } from './Functions';

function Deck(props) {
    const [deck, setDeck] = useState({})
    const isFocused= useIsFocused()
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (props.route && props.route.params) {
            const {deckId} = props.route.params
            getDecks().then(res => {
                getDeck(deckId)
                .then(res => {
                setDeck(res)
                setStatus(true)
        })}
        )
      }
    }, [isFocused])

    const numOfCards = deck.questions === undefined ? 0 : deck.questions.length

    const navigateTo = (view) => {
        props.navigation.navigate(view, {deck: deck})
    }

    return (
        !status
        ?<ActivityIndicator/>
        : <View style={styles.deckContainer}>
            <DeckView title={deck.title} numOfCards={numOfCards}/>
            <View>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigateTo('New Card')}>
                <Text style={styles.btnText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={numOfCards === 0 ? styles.disabledQuizBtn : styles.activeQuizBtn}
            disabled={numOfCards === 0 ? true: false}
            onPress={() => navigateTo('Quiz')}>
                <Text style={styles.btnText}>Start Quiz</Text>
            </TouchableOpacity>
            {numOfCards !== 0 &&
            <TouchableOpacity 
                style={styles.viewCardsBtn}
                onPress={() => navigateTo('Card List')}>
                    <Text style={styles.btnText}>View Cards</Text>
                </TouchableOpacity>
            }
            </View>
        </View>
    )
}

//Styling
const styles = StyleSheet.create({
    deckContainer: {
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#d7f9fa',
        borderStyle: 'solid',
        borderColor: '#31393c',
        borderWidth: 1,
    },
    addBtn: {
        backgroundColor: '#ff9f1c',
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 5,
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeQuizBtn: {
      backgroundColor: '#ff9f1c',
      padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 5,
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledQuizBtn: {
        backgroundColor: '#cad9e1',
        padding: 10,
        margin: 20,
        marginBottom: 0,
        borderRadius: 5,
        height: 50,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCardsBtn: {
        backgroundColor: '#ff9f1c',
      padding: 10,
        margin: 20,
        marginBottom: 0,
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

export default Deck;