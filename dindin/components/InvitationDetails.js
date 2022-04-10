import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Constants, LinearGradient } from 'expo'
import PropTypes from 'prop-types';
import InvitationDetailsCard from './invitationDetails_components/InvitationDetailsCard';
import ID_Header from './invitationDetails_components/ID_Header';
import Map from './invitationDetails_components/Map';

export default class InvitationDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            location: null, 
        }
    }

    updateLocation(loc){
        this.setState({
            location: loc, 
        })
    }

    render(){
        console.log(this.state.location)
        return(
            <View style={styles.container}>
                <ID_Header/>
                <View style={{alignItems: 'center', marginBottom: 5, }}>
                    <InvitationDetailsCard updateLocation={this.updateLocation.bind(this)}/>
                </View> 
                <View style={styles.mapContainer}>
                    <Map location={this.state.location}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1, 
    },
    mapContainer: { 
        flex: 1,
    }
  })