import React from 'react';
//styling imports
import { StyleSheet, View, StatusBar} from 'react-native';
//Icons imports: more info learned from https://icons.expo.fyi/ 
import { MaterialCommunityIcons } from '@expo/vector-icons'
// Help navigate between Topics and Creating new deck
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import screen/component files from my code
import TopicScreen from './src/screens/TopicScreen';
import AddDeckScreen from './src/screens/AddDeckScreen';
import Deck from './src/components/Deck';
import NewCard from './src/components/NewCard';
import Quiz from './src/components/Quiz';
import CardList from './src/components/CardList'

//Code Starts here for App.js
const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return( 
    <Tab.Navigator 
    initialRouteName='Topics'
    tabBarOptions={{
      style: {backgroundColor: '#ff9f1c'},
      activeTintColor: '#F7FAFA',
      labelStyle: {fontSize: 18},
    }}
    sceneContainerStyle={{
      backgroundColor: '#F7FAFA'
    }}>
      <Tab.Screen 
      name='Topics'
      component={TopicScreen}
      options={{
        tabBarLabel: 'Topics',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name='card-multiple' color={color} size={26}/>
        )
      }}/>
      <Tab.Screen
      name='Add Deck'
      component={AddDeckScreen}
      options= {{
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name='plus' color={color} size={26}/>
        )
      }}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#EBFCFB' barStyle='light-content'/>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName='Home'
          headerMode='screen'
          screenOptions={{
            headerTintColor: '#F7FAFA',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#31393c'},
            cardStyle: {backgroundColor: '#F7FAFA'}
          }}>
            <Stack.Screen
            name='Home'
            component={Tabs}
            options={{
              headerTitle: 'Stud-Ease',
              headerShown: true
            }}/>
            <Stack.Screen
            name='Deck'
            component={Deck}
            options={{
              title: '',
            }}/>
            <Stack.Screen
            name='New Card'
            component={NewCard}
            options={{
              title: 'Add Card',
            }}/>
            <Stack.Screen
            name='Quiz'
            component={Quiz}/>
            <Stack.Screen
            name='Card List'
            component={CardList}
            options={({route}) => ({title: `${route.params.deck.title} Card List`})}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
