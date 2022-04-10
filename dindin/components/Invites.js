import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { material } from 'react-native-typography';
import { Constants, LinearGradient } from 'expo'
import SendInvitations from './invite_components/SendInvitations' 
import Invite_Header from './invite_components/Invite_Header'
import GuestList from './eventDetails_components/GuestList'
import InviteEventCard from './invite_components/InviteEventCard'

export default class Invites extends React.Component {
    render() {
      return (
        <LinearGradient 
        start={[0.5,0.08]}
        end={[0.5, 1]}
        colors={[ '#FFFFFF', '#D3DAEB', '#F8FAFC', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']} 
        style={styles.container}>
            <Invite_Header/>
            <View style={{alignItems: 'center'}}>
                <InviteEventCard/>
            </View>
            <TouchableOpacity 
                style={styles.inviteContainer}
                onPress={() => {this.props.navigation.navigate("Home")}}
                >
                    <SendInvitations/>
                </TouchableOpacity>
        </LinearGradient>
      );
    }
  }    

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column', 
      position: 'relative',
      //paddingTop: Constants.statusBarHeight, 
    },
    textStyle: {
        fontSize: 14, 
        opacity: .4, 
        margin: 8, 
    },
    inviteContainer: {
        height: '7.2%',
        width: '100%',
    }
  })