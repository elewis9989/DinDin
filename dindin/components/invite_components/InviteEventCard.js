import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { material } from 'react-native-typography';

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class InviteEventCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        var address = this.props.navigation.getParam('address', 'ADDRESS')
        var hour = this.props.navigation.getParam('hour', 'wffsf')
        var minutes = this.props.navigation.getParam('minutes', 'fdfad')
        var am_pm = this.props.navigation.getParam('am_pm', 'fdafdas')
        var day = this.props.navigation.getParam('day', '00')
        var month = this.props.navigation.getParam('month', '00')
        let d = new Date(2019, month - 1, day)
        let dow = weekdays[d.getDay()]
        return(
            <View style={styles.container}>
                <Icon name="local-dining" size={30} color={'#F76B1C'}/>
                <Text style={[material.title, styles.restText]}>{address}</Text>
                <Text style={[material.title, styles.detailsText]}>{dow} {day} {months[month-1]} - {hour}:{minutes}{am_pm}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 345, 
        height: 110, 
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
    },
})

export default withNavigation(InviteEventCard)