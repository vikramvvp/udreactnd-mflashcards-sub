import { Dimensions } from 'react-native';
import { Constants } from 'expo'
import { TabNavigator } from 'react-navigation'
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import { purple } from '../utils/colors'

const screenWidth = Dimensions.get('window').width; 

export default Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck'
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
        paddingTop: Constants.statusBarHeight / 4,
        backgroundColor: purple
      }

    }
  })