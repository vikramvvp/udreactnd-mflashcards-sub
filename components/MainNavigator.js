import { StackNavigator, HeaderBackButton } from 'react-navigation'
import React from 'react'
import {Icon} from 'react-native'
import Tabs from './Tabs'
import DeckInfo from './DeckInfo'
import AddCard from './AddCard'
import Card from './Card'
import { purple, white } from '../utils/colors'

const navigationOptions = ({navigation}) => ({
  title: 'Deck Info',
  headerTintColor: white,
  headerStyle: {
    
    backgroundColor: purple,
  },
  headerLeft: <HeaderBackButton tintColor={white} onPress={ () => navigation.navigate('Tabs')} />
})

export default MainNavigator = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Question',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
      
    }
  },
  Card: {
    screen: Card,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})