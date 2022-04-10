import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { material } from 'react-native-typography';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select'; 

const hours =[
    {
        label: '01', 
        value: '1', 
    },
    {
        label: '02', 
        value: '2', 
    },
    {
        label: '03', 
        value: '3', 
    },
    {
        label: '04', 
        value: '4', 
    },
    {
        label: '05', 
        value: '5', 
    },
    {
        label: '06', 
        value: '6', 
    },
    {
        label: '07', 
        value: '7', 
    },
    {
        label: '08', 
        value: '8', 
    },
    {
        label: '09', 
        value: '9', 
    },
    {
        label: '10', 
        value: '10', 
    },
    {
        label: '11', 
        value: '11', 
    },
    {
        label: '12', 
        value: '12', 
    },
];

const minutes =[
    {
        label: '00', 
        value: '00', 
    },
    {
        label: '01', 
        value: '01', 
    },
    {
        label: '02', 
        value: '02', 
    },
    {
        label: '03', 
        value: '03', 
    },
    {
        label: '04', 
        value: '04', 
    },
    {
        label: '05', 
        value: '05', 
    },
    {
        label: '06', 
        value: '06', 
    },
    {
        label: '07', 
        value: '07', 
    },
    {
        label: '08', 
        value: '08', 
    },
    {
        label: '09', 
        value: '09', 
    },
    {
        label: '10', 
        value: '10', 
    },
    {
        label: '11', 
        value: '11', 
    },
    {
        label: '12', 
        value: '12', 
    },
    {
        label: '13', 
        value: '13', 
    },
    {
        label: '14', 
        value: '14', 
    },
    {
        label: '15', 
        value: '15', 
    },
    {
        label: '16', 
        value: '16', 
    },
    {
        label: '17', 
        value: '17', 
    },
    {
        label: '18', 
        value: '18', 
    },
    {
        label: '19', 
        value: '19', 
    },
    {
        label: '20', 
        value: '20', 
    },
    {
        label: '21', 
        value: '21', 
    },
    {
        label: '22', 
        value: '22', 
    },
    {
        label: '23', 
        value: '23', 
    },
    {
        label: '24', 
        value: '24', 
    },
    {
        label: '25', 
        value: '25', 
    },
    {
        label: '26', 
        value: '26', 
    },
    {
        label: '27', 
        value: '27', 
    },
    {
        label: '28', 
        value: '28', 
    },
    {
        label: '29', 
        value: '29', 
    },
    {
        label: '30', 
        value: '30', 
    },
    {
        label: '31', 
        value: '31', 
    },
    {
        label: '32', 
        value: '32', 
    },
    {
        label: '33', 
        value: '33', 
    },
    {
        label: '34', 
        value: '34', 
    },
    {
        label: '35', 
        value: '35', 
    },
    {
        label: '36', 
        value: '36', 
    },
    {
        label: '37', 
        value: '37', 
    },
    {
        label: '38', 
        value: '38', 
    },
    {
        label: '39', 
        value: '39', 
    },
    {
        label: '40', 
        value: '40', 
    },
    {
        label: '41', 
        value: '41', 
    },
    {
        label: '42', 
        value: '42', 
    },
    {
        label: '43', 
        value: '43', 
    },
    {
        label: '44', 
        value: '44', 
    },
    {
        label: '45', 
        value: '45', 
    },
    {
        label: '46', 
        value: '46', 
    },
    {
        label: '47', 
        value: '47', 
    },
    {
        label: '48', 
        value: '48', 
    },
    {
        label: '49', 
        value: '49', 
    },
    {
        label: '50', 
        value: '50', 
    },
    {
        label: '51', 
        value: '51', 
    },
    {
        label: '52', 
        value: '52', 
    },
    {
        label: '53', 
        value: '53', 
    },
    {
        label: '54', 
        value: '54', 
    },
    {
        label: '55', 
        value: '55', 
    },
    {
        label: '56', 
        value: '56', 
    },
    {
        label: '57', 
        value: '57', 
    },
    {
        label: '58', 
        value: '58', 
    },
    {
        label: '59', 
        value: '59', 
    },
];

const myApiKey = 'AIzaSyAHV00vfuFzNKiRg0A3G5U9-cvYmwuCRY0'

class SetDinnerDetails extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            am_pm: this.props.am_pm, 
            latitude: null, 
            longitude: null, 
            error: null, 
            address: null, 
            apiKey: '',
            coords: null, 
        }
    }

    async getKey(){
        let foo = await fetch('http://www.people.virginia.edu/~jrs3ww/info.json')
        .then((response)=>response.json())
        .then(response =>{
            this.setState({
                apiKey: response, 
            })
        })
    }

    async coordToAddress(){
        let foo = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            var addressTxt = responseJson.results[0].formatted_address
            this.setState({
                address: JSON.stringify(responseJson),
                addressText: addressTxt,
            })
})
    }

    async addressToCoords(address){
        let foo = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.status !== "ZERO_RESULTS"){
                var coords = responseJson.results[0].geometry.location
                this.setState({
                    coords: coords, 
                })
                this.props.updateLocation(coords)
            }
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

    componentDidMount() {
        this.getGeoLocation()
    }

    render(){
        let amText = null
        let pmText = null
        if(this.props.am_pm === 'pm'){
            amText = styles.am_pmText
            pmText = styles.am_pmTextOnPress
        }
        else{
            pmText = styles.am_pmText
            amText = styles.am_pmTextOnPress
        }
        return(
            <View style={styles.container}>
                <Text style={[material.title, styles.dinnerText]}>What time is dinner?</Text>
                <Text style={[material.title, styles.dateText]}>{this.props.month}/{this.props.day}/2019</Text>
                <View style={{flexDirection: 'row', marginBottom: 0,}}>
                    <RNPickerSelect
                    items={hours}
                    style={pickerSelectStyles_hours}
                    onValueChange={value => {
                        this.props.updateHours(value)
                    }}
                    value={this.props.hour}
                    />
                    <Text style={styles.timeText}>:</Text>
                    <RNPickerSelect
                    items={minutes}
                    style={pickerSelectStyles_minutes}
                    onValueChange={value => {
                        this.props.updateMinutes(value)
                    }}
                    value={this.props.minutes}
                    />
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <TouchableOpacity onPress= {() => {
                        this.props.updateAmPm('am')
                    }}>
                        <Text style={amText}>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress= {() => {
                        this.props.updateAmPm('pm')
                    }}>
                        <Text style={pmText}>PM</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <View style={styles.locationHeader}>
                <Text style={[styles.locationHeaderText]}>Choose a location</Text>
                </View>
                <View style={styles.locationContainer}>
                    <TouchableOpacity 
                    style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginRight: 15, marginLeft: 15, }}
                    onPress= {() =>{
                        if(this.state.addressText === undefined){
                            this.props.updateAddress("Finding address, try again.")
                        }
                        else{
                            this.props.updateAddress(this.state.addressText)
                            this.addressToCoords(this.state.addressText).then(response=>this.props.updateLocation(response))
                            
                        }

                    }}
                    >
                        <Icon name="location-on" size={25} color={'#2FAEFF'}/>
                    </TouchableOpacity>
                    <TextInput
                    style={[material.title, styles.locationText]}
                    onChangeText={inputValue => {
                        this.setState({location: inputValue,})
                        this.props.updateAddress(inputValue)
                    }}
                    onSubmitEditing={(event)=>{this.addressToCoords(this.props.addressText)}}
                    value={this.props.addressText}
                    >
                    </TextInput>
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
        alignItems: 'center',
        backgroundColor: 'white', 
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1, 
        borderTopWidth: 0, 
        borderRadius: 4,
        shadowColor: '#002B80',
        shadowOffset: {width: 0, height: 6}, 
        shadowOpacity: 0.04,
        shadowRadius: 1, 
    },
    dinnerText: {
        fontSize: 19, 
        opacity: .5,  
    },
    dateText: {
        fontSize: 15, 
        opacity: .5,  
    },
    timeText: {
        fontSize: 75, 
        marginLeft: 0, 
        marginRight: 10, 
    },
    am_pmTextOnPress: {
        fontSize: 20,
        color: 'black',
      },
    am_pmText: {
        fontSize: 20,
        opacity: 0.5, 
      },
    locationHeader: {
        alignItems: 'center',
        paddingTop: 30, 
        width: '100%',
        borderTopWidth: 1, 
        borderColor: '#DDDDDD',
    },
    locationHeaderText: {
        fontSize: 19, 
        opacity: .5,  
    },
    locationText: {
        paddingTop: 20, 
        fontSize: 20,
        width: '82.5%', 
    },
    locationContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        width: '100%', 
    },
})

const pickerSelectStyles_hours = StyleSheet.create({
    inputIOS: {
      fontSize: 75,
      color: '#000000',
      width: 90, 
      alignItems: 'center', 
    },
    inputAndroid: {
        fontSize: 75,
        borderRadius: 4,
        color: '#000000',
        width: 90, 
        alignItems: 'center', 
    },
  });

const pickerSelectStyles_minutes = StyleSheet.create({
    inputIOS: {
      fontSize: 75,
      color: '#000000',
      width: 90, 
      alignItems: 'center', 
    },
    inputAndroid: {
        fontSize: 75,
        color: '#000000',
        //paddingRight: 30, // to ensure the text is never behind the icon
        width: 90, 
        alignItems: 'center', 
    },
  });
  



export default withNavigation(SetDinnerDetails)