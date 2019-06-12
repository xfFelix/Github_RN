import {createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'

export const rootCom = 'Init'

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      // header: null
    }
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {
      // header: null
    }
  },
  AsyncStorageDemoPage: {
    screen: AsyncStorageDemoPage,
    navigationOptions: {

    }
  },
  DataStoreDemoPage: {
    screen: DataStoreDemoPage,
    navigationOptions: {

    }
  }
})

export const RootNavigator =  createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator
}, {
  navigationOptions: {
    header: null
  }
}))

export const middleware = createReactNavigationReduxMiddleware(state => state.nav,'root')

const AppWithNavigationState = createReduxContainer( RootNavigator ,'root')

const mapStateToProps = state => ({
  state: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)