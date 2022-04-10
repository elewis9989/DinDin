import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { material } from 'react-native-typography';
import { Constants, LinearGradient } from 'expo'
import CancelDinner from './eventDetails_components/CancelDinner' 
import ED_Header from './eventDetails_components/ED_Header'
import GuestList from './eventDetails_components/GuestList'
import EventCard from './eventDetails_components/EventCard'

export default class EventDetails extends React.Component {
    render() {
      return (
        <LinearGradient 
        start={[0.5,0.08]}
        end={[0.5, 1]}
        colors={[ '#FFFFFF', '#D3DAEB', '#F8FAFC', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']} 
        style={styles.container}>
            <ED_Header/>
            <View style={{alignItems: 'center', marginTop: 5,}}>
                <EventCard/>
            </View>
            <GuestList/>
            <CancelDinner/>
        </LinearGradient>
      );
    }
  }    

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column', 
      position: 'relative',
      paddingTop: Constants.statusBarHeight, 
    },
    textStyle: {
        fontSize: 14, 
        opacity: .4, 
        margin: 8, 
    },
  })