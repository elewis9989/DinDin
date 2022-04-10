import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { material } from 'react-native-typography';

class EventCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        const user = this.props.navigation.getParam('user', {})
        const time = this.props.navigation.getParam('time', 'TIME')
        const date = this.props.navigation.getParam('date', 'DATE')
        console.log(user)
        return(
            <View style={styles.container}>
                <Icon name="local-dining" size={30} color={'#F76B1C'}/>
                <Text style={[material.title, styles.restText]}>{user.rest}</Text>
                <Text style={[material.title, styles.detailsText]}>{date}</Text>
                <Text style={[material.title, styles.hostText]}>Hosted by {user.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 345, 
        height: 130, 
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

export default withNavigation(EventCard)