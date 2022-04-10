import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native';
import { material } from 'react-native-typography';
import GuestCard from './GuestCard'

class GuestList extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            Guests: [
              {id: 1, name: 'George Samson', phone: '123-456-7890', status: 'yes', photoURL: 'Photo'},
              {id: 2, name: 'Shane Padilla', phone: '123-456-7890', status: 'yes', photoURL: 'Photo'},
              {id: 3, name: 'Todd Baldwin', phone: '123-456-7890', status: 'no', photoURL: 'Photo'},
              {id: 4, name: 'Jose Vasquez', phone: '123-456-7890', status: 'no', photoURL: 'Photo'},
            ],
          }
    }
    
    keyExtractor(item){
        return item.id.toString()
    }

    renderGuests_yes({item}){
        if(item.status == 'yes'){
            return(
                <View style={styles.container}>
                    <GuestCard status={item.status} name={item.name} phone={item.phone} photoURL={item.photoURL}/>
                </View>
            )
        }
    }

    renderGuests_no({item}){
        if(item.status == 'no'){
            return(
                <View style={styles.container}>
                    <GuestCard status={item.status} name={item.name} phone={item.phone} photoURL={item.photoURL}/>
                </View>
            )
        }
    }

    render(){
        return(
            <View>
                <Text style={[material.title, styles.textStyle]}>Who's coming</Text>
                <View style={styles.guestListContainer}>
                    <FlatList
                    data={this.state.Guests}
                    extraData={this.state}
                    renderItem={this.renderGuests_yes}
                    keyExtractor={this.keyExtractor}
                    />
                </View>
                <Text style={[material.title, styles.textStyle]}>Can't make it</Text>
                <View style={styles.guestListContainer}>
                    <FlatList
                    data={this.state.Guests}
                    extraData={this.state}
                    renderItem={this.renderGuests_no}
                    keyExtractor={this.keyExtractor}
                    />
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
    },
    guestListContainer: {
        height: '32.5%', 
    },
    textStyle: {
        fontSize: 14, 
        opacity: .4, 
        margin: 6, 
    },
  })

export default withNavigation(GuestList)