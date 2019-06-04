import React, {Component} from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import {connect} from 'react-redux'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import FavoritePage from '../page/FavoritePage'
import MyPage from '../page/MyPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import NavigationUtil from "./NavigationUtil";
import {BottomTabBar} from 'react-navigation-tabs'

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => {
        return <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
      }
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => {
        return <Ionicons name={'md-trending-up'} size={26} style={{color: tintColor}} />
      }
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => {
        return <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
      }
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => {
        return <Entypo name={'user'} size={26} style={{color: tintColor}} />
      }
    }
  }
};
class DynamicTabNavigator extends Component<Props> {

  constructor(props) {
    super(props)
    console.disableYellowBox = true
  }

  render() {
    const Tab = this._tabNavigator()
    return <Tab/>
  }

  _tabNavigator = () => {
    if(this.Tabs) return this.Tabs
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}
    return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent {...props} theme={this.props.theme}/>
      }
    }))
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }
  render() {
    const {theme} = this.props
    return <BottomTabBar {...this.props} activeTintColor={theme} />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)