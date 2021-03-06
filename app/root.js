import React, { Component } from 'react-native'
import { Provider } from 'react-redux/native'
import store from './store'
import { Dashboard } from './containers/dashboard'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        {() => <Dashboard />}
      </Provider>
    )
  }
}
