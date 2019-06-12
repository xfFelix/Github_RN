import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action'
import DataStore from '../expand/dao/DataStore'

type Props = {};
const KEY = 'save_value'
class DataStoreDemoPage extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      showText: ''
    }
    this.dataStore = new DataStore()
  }
  render() {
    const { onThemeChange } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架设计</Text>
        <TextInput style={styles.input}
                   onChangeText={text=> {this.value = text}}
        />
        <Text onPress={this.loadData}>获取</Text>
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
  loadData = () => {
    let url = `https://api.github.com/search/repositories?q=${this.value}`
    this.dataStore.fetchData(url).then(data => {
      let showData = `初次加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`
      this.setState({
        showText: showData
      })
    }).catch(error => {
      error && console.error(error.toString())
    })
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

export default connect(null, mapAction)(DataStoreDemoPage)


