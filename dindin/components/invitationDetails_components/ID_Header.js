import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ID_Header extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={{position: 'absolute', width: '100%', alignItems: 'center'}}>
                    <Text style={[material.title, styles.dindinText]}>DinDin</Text>
                </View>
                <TouchableOpacity style={styles.backContainer} 
                onPress={()=>{this.props.navigation.navigate("Home")}}>
                    <Icon name='arrow-back' color='#0F8CFF' size={30}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: '100%',
        height: 50, 
        marginTop: '8%',
        
    },
    backContainer: {
        paddingLeft: '4%',
    },
    dindinText: {
        fontSize: 20,
    },
    editText: {
        fontSize: 14,
        color: '#0F8CFF',
    },

})

export default withNavigation(ID_Header)