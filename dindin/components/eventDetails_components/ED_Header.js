import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ED_Header extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.backContainer} 
                onPress={()=>{this.props.navigation.navigate("Home")}}>
                    <Icon name='arrow-back' color='#0F8CFF' size={30}/>
                </TouchableOpacity>
                <Text style={[material.title, styles.dindinText]}>DinDin</Text>
                <TouchableOpacity style={styles.editContainer}>
                    <Text style={[material.title, styles.editText]}>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: '100%',
        height: 35, 
        marginTop: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backContainer: {
        paddingLeft: '4%',
    },
    dindinText: {
        fontSize: 17,
    },
    editText: {
        fontSize: 14,
        color: '#0F8CFF',
    },
    editContainer: {
        paddingRight: '4%',
    },

})

export default withNavigation(ED_Header)