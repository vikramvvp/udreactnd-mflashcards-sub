import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import MainNavigator from './components/MainNavigator'
import { setLocalNotification } from './utils/helpers'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
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