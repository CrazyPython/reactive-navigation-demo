import React from 'react';
import { db } from './state'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { MainScreen } from "./screens/MainScreen"
import { SlaveScreen } from "./screens/SlaveScreen"

const ModalStack = StackNavigator({
    Home: {
        screen: MainScreen,
    }, SlaveScreen: {
        screen: SlaveScreen
    }
}, {
    headerMode: 'float',
    onTransitionEnd: () => {
        db.setTransitionEnded(true)
    },
},)


export default class App extends React.Component {
  render() {
    return (
        <ModalStack/>
    );
  }
}
