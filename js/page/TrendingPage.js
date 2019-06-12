import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil'
import Toast from 'react-native-easy-toast'
import {connect} from 'react-redux'
import actions from '../action'
import TrendingItem from "../common/TrendingItem";
import NavigationBar from "../common/NavigationBar";

const URL = 'https://github.com/trending/'
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
type Props = {};
export default class TrendingPage extends Component<Props> {

  constructor(props) {
    super(props)
    this.tabNames = ['All', 'JavaScript', 'Vue', 'React']
  }

  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <TrendingTabPage {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs
  }

  render() {
    let statusBar = {backgroundColor: THEME_COLOR}
    let navigationBar = <NavigationBar title={'趋势'} statusBar={statusBar} style={{backgroundColor: THEME_COLOR}}></NavigationBar>
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
      tabBarOptions: {
        tabStyle: styles.tabStyle,
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
          backgroundColor: '#678',
          height: 30
        },
        indicatorStyle: styles.indicatorStyle,
        labelStyle: styles.labelStyle
      }
    }))
    return (
      <View style={{flex: 1}}>
        {navigationBar}
        <TabNavigator/>
      </View>
    );
  }
}

const pageSize = 10
class TrendingTab extends Component<Props> {

  constructor(props) {
    super(props)
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }

  componentDidMount(): void {
    this.loadData()
  }

  render() {
    let store = this._store()
    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModes}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + (item.id || item.fullName)}
          refreshControl={
            <RefreshControl title={'isLoading'} titleColor={THEME_COLOR} colors={[THEME_COLOR]}
                            refreshing={store.isLoading} onRefresh={() => this.loadData()} tintColor={THEME_COLOR}/>
          }
          ListFooterComponent={this.genIndicator}
          onEndReached={() => {
            this.loadData(true)
          }}
          onEndReachedThreshold={.5}
        ></FlatList>
        <Toast ref={'toast'} position={'center'} ></Toast>
      </View>
    )
  }

  renderItem = (data) => {
    const item = data.item
    return (
      <TrendingItem item={item} onSelect={() => {
      }}></TrendingItem>
    )
  }

  genIndicator = () => {
    return this._store().hideLoadingMore ? null :
      (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator style={styles.indicator}></ActivityIndicator>
          <Text>正在加载更多</Text>
        </View>
      )
  }

  loadData = (loadMore) => {
    const {onRefreshTrending, onLoadMoreTrending} = this.props
    const store = this._store()
    const url = this.genFetchUrl(this.storeName)
    if (loadMore) {
      onLoadMoreTrending(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了')
      })
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
    }
  }

  _store = () => {
    const {trending} = this.props
    let store = trending[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true
      }
    }
    return store
  }

  genFetchUrl = (key) => {
    return URL + key + '?since=daily'
  }
}

const mapState = state => ({
  trending: state.trending
})
const mapAction = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback))
})
const TrendingTabPage = connect(mapState, mapAction)(TrendingTab)

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
  tabStyle: {
    // minWidth: 50,
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0
  },
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
