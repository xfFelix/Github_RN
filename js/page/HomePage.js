import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'

type Props = {};
export default class HomePage extends Component<Props> {
  render() {
    const Tab = this._tabNavigator()
    return <Tab/>
  }

  _tabNavigator = () => {
    return createAppContainer(createBottomTabNavigator({
      PopularPage: {
        screen: PopularPage,
        navigationOptions: {
          tabBarLabel: '最热'
        }
      },
      TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
          tabBarLabel: '趋势'
        }
      },
      FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
          tabBarLabel: '收藏'
        }
      },
      MyPage: {
        screen: MyPage,
        navigationOptions: {
          tabBarLabel: '我的'
        }
      }
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
