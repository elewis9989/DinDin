import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { material } from 'react-native-typography'

export default class Header extends React.Component{
  render(){
    return(
      <View style ={styles.container}>
        <Text style={[styles.mainText, material.headline]}>DinDin</Text> 
        <Text style={[styles.subText, material.subheading]}> Connecting food lovers</Text> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    position: 'absolute',
    width: '100%', 
    height: 58,
    bottom: '25.8%'
  },
  mainText: {
    fontSize: 29,
    textAlign: "center"
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.5
  }




})