//made this into its own component instead of adding it into two seperate sets of code. Easier to just to import it for styling reasons.
import { Component } from "react";
import {View, Text, StyleSheet} from 'react-native';

//Code for what the decks will look like. Says name(title) of deck, and how many cards are in it, with some styling.
class DeckView extends Component {
    render() {
        const {title, numOfCards} = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.cardNum}>{numOfCards} {numOfCards <= 1 ? 'card' : 'cards'}</Text>
            </View>
        )
    }
}

//styles for the cards/deck
const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#d7f9fa',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        color: '#31393c',
    },
    cardNum: {
        textAlign: 'center',
        color: '#7d8ca3'
    }
})

export default DeckView;