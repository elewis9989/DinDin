import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { material } from 'react-native-typography';
import { LinearGradient } from 'expo'

class CancelDinner extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity style={styles.container}>
                <LinearGradient 
                start={[0.5,1]}
                end={[0.5, 0]}
                colors={[ '#FF3939', '#FF1A93']}
                style={styles.gradient}> 
                    <Text style={[material.title, styles.textStyle]}>Cancel Dinner</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0, 
        width: '100%',
        height: 48,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    textStyle: {
        fontSize: 14, 
        color: 'white', 
    },
})

export default withNavigation(CancelDinner)