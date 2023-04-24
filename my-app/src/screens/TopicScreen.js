import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

//imports from my files
import DeckView from '../components/DeckView';
import { getDecks } from '../components/Functions';

function TopicScreen(props) {
    const [topics, setTopics] = useState({})
    const isFocused = useIsFocused()
    const [status, setStatus] = useState(false)

    useEffect(() => {
        getDecks().then(res => {
            if (res === null) {
                setTopics({})
            } else {
                setTopics(res)
            } setStatus(true)
        })
    }, [isFocused])
    if (status === false) {
        return <ActivityIndicator/>
    }
    return (
        <View style={styles.deckContainer}>
            {Object.keys(topics).length === 0 || topics === undefined
            ? <View style={styles.noShowcon}>
                <Text style={styles.noShow}>No Deck to Show</Text>
              </View>
            : <FlatList data={Object.keys(topics)} 
                keyExtractor={item => topics[item].title}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.deck}
                    onPress={() => props.navigation.navigate('Deck', {deckId: topics[item].title})}>
                        <DeckView title={topics[item].title} numOfCards={topics[item].questions ? topics[item].questions.length : 0}/>
                    </TouchableOpacity>
                )}/>}
        </View>
    )
}

//styling the document
const styles = StyleSheet.create({
    noShow: {
        textAlign:'center',
        fontSize: 25,
        color: '#61696b',
    },
    noShowcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deck: {
        margin:20,
        marginBottom: 10,
        marginTop: 10,
        padding:10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#31393c',
        borderWidth: 1,
        backgroundColor: '#d7f9fa',
    },

})

export default TopicScreen;



