import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

class GuestCard extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.status == 'yes'){
            return(
                    <View style={styles.container}>
                    <Text style={[material.title]}>{this.props.photoURL}</Text> 
                    <View style={styles.detailsContainer}>
                            <Text style={[material.title, styles.nameText]}>{this.props.name}</Text>
                            <Text style={[material.title, styles.phoneText]}>{this.props.phone}</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <Icon name='check' size={25} color='#38D459'/>
                    </View>
                    </View>
            )
        }
        else {
            return(
                    <View style={styles.container}>
                    <Text style={[material.title]}>{this.props.photoURL}</Text> 
                    <View style={styles.detailsContainer}>
                            <Text style={[material.title, styles.nameText]}>{this.props.name}</Text>
                            <Text style={[material.title, styles.phoneText]}>{this.props.phone}</Text>
                    </View>
                    <View style={styles.checkContainer}>
                        <Icon name='close' size={25} color='#FF3B3B'/>
                    </View>
                    </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: '4%',
        flexDirection: 'row', 
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderColor: '#D8D8D8',
        width: '92%',
        height: 80,
        alignItems: 'center',
    },
    detailsContainer: {
        flexDirection: 'column', 
        marginLeft: 15,
    },
    nameText: {
        fontSize: 16, 
        marginBottom: 0, 
    },
    phoneText: {
        fontSize: 12, 
        opacity: .5, 
        paddingTop: 0, 
    },
    checkContainer: {
        position: 'absolute',
        right: 0, 
    }
})
export default withNavigation(GuestCard)