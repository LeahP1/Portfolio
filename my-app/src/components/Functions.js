import AsyncStorage from '@react-native-async-storage/async-storage';

//creating a key to help pull from storage.
export const FLASHCARD_STORAGE_KEY = 'MobileFlashCards:decklist';

//using key to save and pull the decks to the topic screen
export async function getDecks() {
  const res = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
  return JSON.parse(res);
}

//using key to save and pull infor for specific topic decks
export async function getDeck(id) {
  const decks = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
  const data = JSON.parse(decks);
  return data[id];
}

// saving information to the deck sich as title, and queston
export async function saveDeckTitle(deckTitle) {
  const deck = {
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  };
  await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck));
}

//saving card information such as question and answers
export async function addCardToDeck(deckTitle, question, answer) {
  const decks = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
  const data = JSON.parse(decks);
  const deck = {
    [deckTitle]: {
      title: deckTitle,
      questions: [
        ...data[deckTitle].questions,
        {
          question: question,
          answer: answer,
        }
      ]
    }
  };
  await AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(deck));
}


