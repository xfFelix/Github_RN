import React, {Component} from 'react';
import {TouchableOpacity,View,Text,Image, StyleSheet} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'

class TrendingItem extends Component {
  render() {
    const { item } =this.props
    if (!item) return null
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullName}</Text>
          <HTMLView value={item.description} stylesheet={{p: styles.description, a: styles.description}}/>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Built By:</Text>
              {
                item.contributors.map((result, i, arr) => {
                  return (
                    <Image source={{uri: result}} style={{width: 25, height: 25, margin: 2}} key={i}/>
                  )
                })
              }
            </View>
            {/*<View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
              <Text>Star:</Text>
              <Text>{item.starCount}</Text>
            </View>*/}
            <FavoriteButton></FavoriteButton>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

class FavoriteButton extends Component{
  render() {
    return (
      <TouchableOpacity style={{padding: 6}} onPress={() =>{}} underlayColor={'transparent'} >
        <FontAwesome name={'star-o'} size={26} style={{color: 'red'}}></FontAwesome>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: 'center'
  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: .5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: .5, height: .5},
    shadowOpacity: .4,
    shadowRadius: 1,
    elevation: 2
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
})

export default TrendingItem;
