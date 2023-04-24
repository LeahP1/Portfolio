//This Component renders a quiz that test the users knowledge. The user goes through a set of flash cards, and once flipped it will ask if the user got the answer right or wrong and the user will choose that button, which will compile there answers at the end.
import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ActivityIndicator} from 'react-native';

//import files from my code 
import Question from './Question';
import Answer from './Answer';

class Quiz extends Component {
    state = {
        showQuestion: true,
        cardCounter: 0,
        pointCounter: 0,
        endOfQuiz: false,
        opacity: new Animated.Value(1),
        status: true,
    };

    //So the Flashcard can flip to see answer, I use animated timing to help switch between the front and backside of the flashcard.
    // Where I learned how to use react Animated https://reactnative.dev/docs/animated
    showOtherSide = () => {
        const {opacity} = this.state
        Animated.timing(opacity, {duration: 500, toValue: 0}).start();
        setTimeout(() =>
        Animated.timing(opacity, {duration: 1000, toValue: 1}).start(),500);
        setTimeout(() => 
        this.setState((prev) => ({
            showQuestion: !prev.showQuestion
        })), 500);
    };

    //restarts to the begining of the deck of cards
    restartQuiz = () => {
        const {deck} = this.props.route.params;
        this.setState({
            showQuestion: true,
            endOfQuiz: false,
            cardCounter: 0,
            pointCounter: 0,
        });
        this.props.navigation.navigate('Quiz', {deck});
    };
    // answering the questions for the flashcards, and using Animated timing to go to the next question
    userAnswer = (num) => {
        const {opacity} = this.state;
        const {deck} = this.props.route.params;
        const {questions} = deck;
        const numOfQuestions = questions.length;
        Animated.timing(opacity, {duration: 500, toValue: 0}).start();
        setTimeout( () => 
        Animated.timing(opacity, {duration: 1000, toValue: 1}).start(),500);
        setTimeout(
            () => 
            this.setState((prev) => ({
                pointCounter: prev.pointCounter + num,
                cardCounter: prev.cardCounter + 1,
                showQuestion: true,
            })),500);
        if (this.state.cardCounter + 1 === numOfQuestions) {
            this.setState({
                endOfQuiz: true,
                status: false,
            });
            setTimeout(() => {
                this.setState({
                    status: true,
                });
            }, 500);
        }
    };
    render() {
        const {showQuestion, cardCounter, endOfQuiz, pointCounter, opacity, status} = this.state;
        const {deck} = this.props.route.params;
        const {title, questions} = deck;
        const numOfQuestions = questions.length;
        const precentage = Math.round((pointCounter / numOfQuestions) * 100);

        if (status === false) {
            return <ActivityIndicator/>
        };

        return (
            <View>
              <Text style={styles.header}>{title} Quiz</Text>
              {!endOfQuiz
                ? <View>
                    {showQuestion
                      ? <Question
                          showOtherSide={this.showOtherSide}
                          cardCounter={cardCounter}
                          numOfQuestions={numOfQuestions}
                          opacity={opacity}
                          questions={questions}
                        />
                      : <Answer
                          showOtherSide={this.showOtherSide}
                          userAnswer={this.userAnswer}
                          cardCounter={cardCounter}
                          numOfQuestions={numOfQuestions}
                          opacity={opacity}
                          questions={questions}
                        />
                    }
                  </View>
                : <View style={styles.statistics}>
                    <Text style={styles.header}>Score</Text>
                    <Text style={{color: '#666666'}}>{pointCounter} out of {numOfQuestions}</Text>
                    <Text style={styles.precentage}>{precentage}%</Text>
                    {precentage >= 60
                      ? <View style={styles.endOfQuiz}>
                          <Text style={{color: '#666666', fontSize: 20}}>You passed!</Text>
                          </View>
                      : <View style={styles.endOfQuiz}>
                          <Text style={{color: '#666666', fontSize: 20}}>You failed</Text>
                          <Text style={{color: '#666666'}}>Keep learning and try again!</Text>
                        </View>
                    }
                    <TouchableOpacity
                      style={styles.navigationBtn}
                      onPress={() => this.props.navigation.navigate('Deck')}
                    >
                      <Text style={styles.btnText}>Back to deck</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.navigationBtn}
                      onPress={this.restartQuiz}
                    >
                      <Text style={styles.btnText}>Restart quiz</Text>
                    </TouchableOpacity>
                  </View>
              }
            </View>
          )
        }
      }
///styling
const styles = StyleSheet.create ({
    header: {
        paddingTop: 30,
        paddingBottom: 15,
        fontSize: 25,
        textAlign: 'center',
        color: '#3139c',
    },
    statistics: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    precentage: {
        paddingTop: 10,
        fontSize: 25,
        color: '#666666',
    },
    endOfQuiz: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    navigationBtn: {
        backgroundColor: '#ff9f1c',
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 115,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        margin: 10,
    },
    btnText: {
        color: '#fff',
    },
});

export default Quiz;