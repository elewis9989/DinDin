import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Constants, LinearGradient } from 'expo'
import PropTypes from 'prop-types';
import SetDinnerDetails from './newEvent_components/SetDinnerDetails';
import NE_Header from './newEvent_components/NE_Header';
import Map from './invitationDetails_components/Map';
import InvitePeople from './newEvent_components/InvitePeople'

const initialState = {
        addressText: 'Enter an address...',
        hour: '12', 
        minutes: '00', 
        am_pm: 'pm',
        location: null, 
}

export default class NewEvent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            addressText: 'Enter an address...',
            hour: '12', 
            minutes: '00', 
            am_pm: 'pm',
            location: null, 
        }
    }
    resetState(){
        this.setState(initialState)
    }
    updateAddress(address){
        this.setState({
            addressText: address, 
        })
    }
    updateHours(h){
        this.setState({
            hour: h, 
        })
    }
    updateMinutes(m){
        this.setState({
            minutes: m, 
        })
    }
    updateAmPm(foo){
        this.setState({
            am_pm: foo, 
        })
    }
    updateLocation(loc){
        this.setState({
            location: loc
        })
    }
    render(){
        let d = this.props.navigation.getParam('day', '1')
        let m = this.props.navigation.getParam('month', '1')
        let u = this.props.navigation.getParam('user', {})
        console.log(u)
        return(
            <View style={styles.container}>
                <NE_Header resetState={this.resetState.bind(this)}/>
                <SetDinnerDetails 
                    updateAmPm={this.updateAmPm.bind(this)} 
                    updateAddress={this.updateAddress.bind(this)} 
                    updateMinutes={this.updateMinutes.bind(this)} 
                    updateHours={this.updateHours.bind(this)} 
                    updateLocation={this.updateLocation.bind(this)}
                    addressText={this.state.addressText} 
                    hour={this.state.hour} 
                    minutes={this.state.minutes}
                    am_pm={this.state.am_pm}
                    day={d}
                    month={m}
                    />
                <View style={styles.mapContainer}>
                    <Map location={this.state.location}/>
                </View>
                <TouchableOpacity 
                style={styles.inviteContainer}
                onPress={()=>{
                    this.props.navigation.navigate("Invite",
                    {
                        address: this.state.addressText,
                        hour: this.state.hour,
                        minutes: this.state.minutes, 
                        am_pm: this.state.am_pm, 
                        day: d, 
                        month: m, 
                        user: u, 
                    }
                )}}
                >
                    <InvitePeople/>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        flexDirection: 'column', 
        flex: 1, 
    },
    mapContainer: { 
        marginTop: 1,
        flex: 1,
        width: "100%",
    },
    inviteContainer: {
        height: '7.2%',
        width: '100%',
    }
})

