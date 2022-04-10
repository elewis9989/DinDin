import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { material } from 'react-native-typography'


export default class AddEvent extends PureComponent {
  constructor(props){
    super(props)
  }

  static propTypes = {
    date: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View>
        <Text style={[material.title, styles.dateText]}>{this.props.date}</Text>
        <View
          style={{
            borderBottomColor: '#D8D8D8',
            borderBottomWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10, 
          }}
        />
        <View style={styles.detailsContainer}>
          <TouchableOpacity onPress={() => {this.props.goToNewEvent(this.props.day, this.props.selectedMonth)}}>
            <Image style={styles.addEventButton} source={require('../../../assets/homescreen/schedule/addnew2x.png')}></Image>
          </TouchableOpacity>
          
        </View>
        <View
          style={{
            borderBottomColor: '#D8D8D8',
            borderBottomWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10, 
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsContainer: {
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 14,
    marginLeft: 10
  },

  addEventButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 33
  }
})
