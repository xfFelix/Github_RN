import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action'
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678'
type Props = {};
class MyPage extends Component<Props> {
  getRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{padding: 5, marginRight: 8}}>
            <Feather name={'search'} size={24} style={{color: 'white'}}></Feather>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  getLeftButton = (callBack) => {
    return (
      <TouchableOpacity onPress={callBack} style={{padding: 8, paddingLeft: 12}}>
        <Ionicons name={'ios-arrow-back'} size={26} style={{color: 'white'}}></Ionicons>
      </TouchableOpacity>
    )
  }
  render() {
    let statusBar = {backgroundColor: THEME_COLOR}
    return (
      <View style={styles.container}>
        <NavigationBar title={'我的'} statusBar={statusBar} rightButton={this.getRightButton()} leftButton={this.getLeftButton()} style={{backgroundColor: THEME_COLOR}}></NavigationBar>
        <Text style={styles.welcome}>MyPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const mapAction = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapAction)(MyPage)
