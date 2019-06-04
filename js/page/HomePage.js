import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, BackHandler} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'

type Props = {};
class HomePage extends Component<Props> {
  componentDidMount(): void {
    console.log(this.props.nav)
    BackHandler.addEventListener("hardwareBackPress",this.onBackPress)
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener("hardwareBackPress",this.onBackPress)
  }

  onBackPress = () => {
    const {dispatch, nav} = this.props
    if (nav.routes[1].index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator/>
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

const mapState = state => ({
  nav: state.nav
})
export default connect(mapState)(HomePage)
