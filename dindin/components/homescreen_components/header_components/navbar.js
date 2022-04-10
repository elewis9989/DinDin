import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native'

class NavBar extends PureComponent {
  constructor(props){
      super(props)

      this.state = {
        Months: [
          {id: 1, value: 'January', pressed: false},
          {id: 2, value: 'February', pressed: false},
          {id: 3, value: 'March', pressed: false},
          {id: 4, value: 'April', pressed: false},
          {id: 5, value: 'May', pressed: false},
          {id: 6, value: 'June', pressed: false},
          {id: 7, value: 'July', pressed: false},
          {id: 8, value: 'August', pressed: false},
          {id: 9, value: 'September', pressed: false},
          {id: 10, value: 'October', pressed: false},
          {id: 11, value: 'November', pressed: false},
          {id: 12, value: 'December', pressed: false},
        ],
      }
     this.renderMonths = this.renderMonths.bind(this) 
  }
  
  keyExtractor(item){
    return item.id.toString()
  }

  getItem(item) {
    this.setState({
      idPressed: item.id
    })
    console.log(this.state.idPressed)
    if(item.id === this.state.idPressed){
      console.log('hmmmmm')
    }
    Alert.alert(item.value)
  }

  renderMonths({item}){
    return(
      <View style={styles.bottomContainer}>
        <Text style={[styles.monthText, {opacity: this.state.idPressed === item.id ? 1.0 : 0.3}]} onPress={()=> this.getItem(item)}>{item.value}</Text>
      </View>
    )
  }

  render() {
    console.log(this.props.navigation)
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={()=>{this.props.navigation.toggleDrawer()}} style={{margin: '4%'}}>
            <Image style={styles.menuIcon} source={require('../../../assets/homescreen/sidemenu_btn.png')}/>
          </TouchableOpacity>
          <Text style={styles.headerText}> DinDin </Text>
          <Image style={styles.searchIcon} source={require('../../../assets/homescreen/search_btn.png')}/>
        </View>
          <View style={styles.listContainer}>
          <FlatList
            data={this.state.Months}
            extraData={this.state}
            renderItem={this.renderMonths}
            keyExtractor={this.keyExtractor}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '15.9%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1}, 
    shadowOpacity: 0.8,
    shadowRadius: 0.0, 
  },

  topContainer: {
    position: 'absolute',
    top: '4.6%',
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuIcon:{
    width: 15,
    height: 16,
  }, 
  searchIcon:{
    width: 17.96,
    height: 18.01,
    margin: '4%',
  },

  headerText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
  },

  bottomContainer: {
    flexDirection: 'row', 
    padding: 10, 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    textAlign: 'auto'
  },

  monthText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 18,    
    color: 'black',
    opacity: 0.3,
  },

  listContainer: {
    flex: 0, 
    height: 40, 
    position: 'absolute', 
    bottom: 0
  },
})

export default withNavigation(NavBar)