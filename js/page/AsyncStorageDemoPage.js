import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action'

type Props = {};
const KEY = 'save_value'
class AsyncStorageDemoPage extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  render() {
    const { onThemeChange } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Async Storage Demo</Text>
        <TextInput style={styles.input}
                   onChangeText={text=> {this.value = text}}
        />
        <View style={styles.input_container}>
          <Text onPress={this.doSave}>存储</Text>
          <Text onPress={this.doRemove}>删除</Text>
          <Text onPress={this.getData}>获取</Text>
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
  doSave = async ():void => {
    AsyncStorage.setItem(KEY, this.value, error => error && console.log(error.toString()))
    /*AsyncStorage.setItem(KEY, this.value).catch(error => error && console.log(error.toString()))
    try {
      await AsyncStorage.setItem(KEY, this.value)
    } catch (error) {
      error && console.log(error.toString())
    }*/
  }
  doRemove = async (): void => {
    AsyncStorage.removeItem(KEY, error => error && console.log(error.toString()))
    /*AsyncStorage.removeItem(KEY).catch(error => error && console.log(error.toString()))
    try {
      await AsyncStorage.removeItem(KEY)
    } catch (error) {
      error && console.log(error.toString())
    }*/
  }
  getData = async () : void => {
    AsyncStorage.getItem(KEY, (error,value) => {
      this.setState({
        showText: value
      })
      console.log(value)
      error && console.log(error.toString())
    })
    /*AsyncStorage.getItem(KEY).then(value => {
      this.setState({
        showText: value
      })
    }).catch(error => {
      error && console.log(error.toString())
    })
    try {
      const value = await AsyncStorage.getItem(KEY)
      this.setState({
        showText: value
      })
    } catch (error) {
      error && console.log(error.toString())
    }*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10
  },
  input: {
    height: 30,
    borderColor: '#000',
    borderWidth: 1,
    marginRight: 10,
    paddingTop: 0,
    paddingBottom: 0
  }
});

const mapAction = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapAction)(AsyncStorageDemoPage)


