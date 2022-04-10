import React, { Component } from 'react';
import Schedule from './homescreen_components/Schedule';
import { StyleSheet, View } from 'react-native'
import { Constants, LinearGradient } from 'expo'
import Header from './homescreen_components/Header' 
import Pending from './homescreen_components/Pending' 
import PropTypes from 'prop-types';

const currentDate = new Date() 

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: null, 
      users: null, 
      eLoaded: false, 
      uLoaded: false, 
      selectedMonth: currentDate.getMonth() + 1,
    }
  }

  componentDidMount(){
    if(this.state.eLoaded === false && this.state.uLoaded === false){
      this.pullEvents()
      this.pullUsers()
    }
  }

  async pullEvents(){
    let foo = await fetch('http://www.people.virginia.edu/~jrs3ww/events3.json')
    .then((response)=>response.json())
    .then(response =>{
        this.setState({
            events: response, 
            eLoaded: true, 
        })
    })
    
  }

  async pullUsers(){
    let foo = await fetch('http://www.people.virginia.edu/~jrs3ww/users1.json')
    .then((response)=>response.json())
    .then(response =>{
        this.setState({
            users: response, 
            uLoaded: true, 
        })
    })
  }

  getUser(id){
    return this.state.users.Users[id]
  }

  getGuests(g){
    let guests = []
    for (var j = 0; j < g.length; j++){
      guests.push(this.state.users.Users[g[j]])
    }
    return guests
  }

  updateEvents(events){
    this.setState({
        events: events, 
    })
  }

  updateSelectedMonth(month){
    this.setState({
      selectedMonth: month, 
    })
  }

  goToNewEvent(d, m){
    let u = this.getUser(0)
    this.props.navigation.navigate('New Event', {day: d, month: m, user: u});
  }

  goToEventDetails(p, t, d, g){
    let gsts = this.getGuests(g)
    this.props.navigation.navigate("Event", {user: p, time: t, date: d, guests: gsts})
  }

  render() {
    if(this.state.eLoaded === true && this.state.uLoaded === true){
      return (
        <LinearGradient 
        start={[0.5,0]}
        end={[0.5, 1]}
        location={[0.0, 0.5, 0.66, 0.8, .81, .93, 1.0]}
        colors={[ '#FFFFFF', '#FFFFFF', '#E4EBFC', '#F8FAFC', '#FFFFFF','#FFFFFF', '#FFFFFF']} 
        style={styles.container}>
            <Header 
            selectedMonth={this.state.selectedMonth}
            updateSelectedMonth={this.updateSelectedMonth.bind(this)}
            />
            <View>
              <Pending
                updateEvents={this.updateEvents.bind(this)}
                events={this.state.events}
                users={this.state.users}
                getUser={this.getUser.bind(this)}
              />
            </View>
          <Schedule
            updateEvents={this.updateEvents.bind(this)}
            events={this.state.events}
            users={this.state.users}
            getUser={this.getUser.bind(this)}
            selectedMonth={this.state.selectedMonth}
            goToNewEvent={this.goToNewEvent.bind(this)}
            goToEventDetails={this.goToEventDetails.bind(this)}
          />
        </LinearGradient>
      );
    }
    else{
      return(
        <View></View>
      )
    }
  }
}    
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column', 
    position: 'relative',
    paddingTop: Constants.statusBarHeight, 
  },
})