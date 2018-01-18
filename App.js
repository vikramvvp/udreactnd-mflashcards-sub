import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white, red, gray } from './utils/colors'
import DeckList from './components/DeckList'
import DeckInfo from './components/DeckInfo'
import NewDeck from './components/NewDeck'
import { Constants } from 'expo'
import thunk from 'redux-thunk'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function FCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const screenWidth = Dimensions.get('window').width;

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',

      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={26} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={26} color={tintColor} />
    },
  }
},
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      labelStyle: {
        fontWeight:"bold"
      },
      tabStyle: {
        width: screenWidth / 2
      },
      style: {
        paddingTop: Constants.statusBarHeight / 4
      }

    }
  })

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: {

      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1,}}>

          <MainNavigator />

        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});