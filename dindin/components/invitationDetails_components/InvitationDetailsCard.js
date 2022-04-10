import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { Icon } from 'react-native-elements'; 
import { material } from 'react-native-typography';
import PropTypes from 'prop-types';

const myApiKey = 'AIzaSyAHV00vfuFzNKiRg0A3G5U9-cvYmwuCRY0'

class InvitationDetailsCard extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
          addr: this.props.navigation.getParam('rest', 'REST')
        }
    }

    componentDidMount(){
      let addressText = this.props.navigation.getParam('rest', 'REST')
      console.log(addressText)
      this.addressToCoords(addressText)
    }

    componentWillReceiveProps(){
      let addressText = this.props.navigation.getParam('rest', 'REST')
      if(this.state.addr !== addressText){
        console.log(addressText)
        this.addressToCoords(addressText)
        this.setState({
          addr: addressText, 
        })
      }
    }

    async addressToCoords(address){
        
        let foo = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            var coords = responseJson.results[0].geometry.location
            this.props.updateLocation(coords)
        })
    }

    getGeoLocation(){
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude, 
                error: null, 
            })
            this.coordToAddress()
        },
        (error)=> this.setState({error: error.message}),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        )
    }

    render(){
      const name = this.props.navigation.getParam('name', 'NAME')
      const photoUrl = this.props.navigation.getParam('photoUrl', 'PHOTO')
      const rest = this.props.navigation.getParam('rest', 'REST')
      const date = this.props.navigation.getParam('date', 'DATE')
      const time = this.props.navigation.getParam('time', 'TIME')

        return(
            <View style={styles.container}>
                <Image style={styles.profilePic} source={{uri: photoUrl}}/>
                <Text style={[material.title, styles.restText]}>{rest}</Text>
                <Text style={[material.title, styles.detailsText]}>{date} - {time}</Text>
                <Text style={[material.title, styles.hostText]}>Hosted by {name}</Text>
                <View style={styles.acceptDeclineContainer}>
                  <TouchableOpacity style={styles.declineButtonContainer}>
                    <Icon name='ios-close' type='ionicon' color='#FF3B3B' size={30}/>
                    <Text style={[material.title, styles.declineText]}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButtonContainer}>
                    <Icon name='ios-checkmark' type='ionicon' color='#38D459' size={30}/>
                    <Text style={[material.title, styles.acceptText]}>Accept</Text>
                  </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 345, 
        height: 250, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white', 
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1, 
        borderRadius: 4,
        shadowColor: '#002B80',
        shadowOffset: {width: 0, height: 6}, 
        shadowOpacity: 0.04,
        shadowRadius: 1, 
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    restText: {
        fontSize: 18, 
        textAlign: 'center', 
    },
    detailsText: {
        fontSize: 14, 
        opacity: .5, 
    },
    hostText: {
        fontSize: 14, 
        opacity: .4, 
        marginBottom: 60,
    },
    acceptDeclineContainer: {
      position: 'absolute', 
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 45,  
    },
    acceptButtonContainer:{
      flexDirection: 'row',
      borderTopWidth: 1, 
      borderLeftWidth: .5, 
      borderColor: '#D8D8D8',
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    declineButtonContainer:{
      flexDirection: 'row',
      borderTopWidth: 1, 
      borderRightWidth: .5, 
      borderColor: '#D8D8D8',
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameText: {
      fontSize: 14,
    },
    dateText: {
      fontSize: 14,
      opacity: 0.5,
    },
    declineText: {
      fontSize: 14,
      color: '#FF3B3B',
      paddingLeft: 5, 
    },
    acceptText: {
      fontSize: 14,
      color: '#38D459',
      paddingLeft: 5,
    },
})

export default withNavigation(InvitationDetailsCard)