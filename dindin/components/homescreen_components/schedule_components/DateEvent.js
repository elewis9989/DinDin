import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
import { material } from 'react-native-typography'

export default class DateEvent extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
  };

  render() {
    console.log(this.props.profile.pic)
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
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.profilePic} source={{uri: this.props.profile.pic}}/>
            <View style={styles.namePicContainer}>
              <Text style={[material.title, styles.nameText]}>{this.props.profile.name}</Text>
              <Text style={[material.title, styles.timeText]}>{this.props.time}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => console.log('Call')} >
              <Image style={styles.callPic} source={require('../../../assets/homescreen/schedule/call2x.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Message')} >
              <Image style={styles.callPic} source={require('../../../assets/homescreen/schedule/email2x.png')}></Image>
            </TouchableOpacity>
          </View>
          
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

  dateText: {
    fontSize: 14,
    marginLeft: 10
  },

  detailsContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 63,
  },

  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },

  nameText: {
    color: '#000000',
    fontSize: 14,
    marginBottom: -5,
  },
  
  timeText: {
    opacity: 0.5,
    fontSize: 14,
    color: '#000000',
    marginTop: -5,
  },

  namePicContainer: {
    marginTop: 10,
    marginLeft: 7
  },

  callPic: {
    height: 32,
    width: 32,
    margin:10,
  }
})

