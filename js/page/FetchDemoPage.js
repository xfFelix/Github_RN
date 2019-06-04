import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux'
import actions from '../action'

type Props = {};
class FetchDemoPage extends Component<Props> {
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
        <Text style={styles.welcome}>Fetch Demo</Text>
        <View style={styles.input_container}>
          <TextInput style={styles.input}
                     onChangeText={text=> {this.searchKey = text}}
          />
          <Button
            title={'获取'}
            onPress={() => {
              this.loadDate()
            }}/>
        </View>
          <Text>{this.state.showText}</Text>
      </View>
    );
  }
  loadDate = () => {
    // https://api.github.com/search/repositories?q=java
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url).then(response=>response.text()).then(responseText => {
      this.setState({
        showText: responseText
      })
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
    alignItems: 'center'
  },
  input: {
    height: 30,
    flex: 1,
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

export default connect(null, mapAction)(FetchDemoPage)


