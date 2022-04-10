import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import DateEvent from './schedule_components/DateEvent';
import AddEvent from './schedule_components/AddEvent'
import UserEvent from './schedule_components/UserEvent'

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default class Schedule extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      data: null, 
      selectedMonth: this.props.selectedMonth, 
    }
    this.renderRow = this.renderRow.bind(this) 
    this.keyExtractor = this.keyExtractor.bind(this)
  }

  UNSAFE_componentWillReceiveProps(){
      this.getData()
  }

  daysInMonth(m, y){
    return new Date(y, m, 0).getDate()
  }

  componentDidMount(){
    this.getData()
  }
  
  eventsInMonth(events){
    let monthEvents = []
    let month = this.props.selectedMonth.toString()
    var e = events.Events
    for (var i = 0; i < e.length; i++){
      if(e[i].accepted === true && e[i].date.month === month){
        if(monthEvents.length === 0){
          console.log("empty")
          monthEvents.push(e[i])
        }
        else{
          let dup = false 
          console.log("mE length", monthEvents.length)
          for(var x = 0; x < monthEvents.length; x++){
            if(e[i].id === monthEvents[x].id){              
              dup = true
            }
          }
          if(dup === false){
            monthEvents.push(e[i])
          }
        }
      }
    }
    
    console.log(monthEvents)
    this.setState({
      monthEvents: monthEvents, 
      mLoaded: true,
    })
    return monthEvents
  }

  loadSchedule(events){
    var sched = []
    var dim = this.daysInMonth(this.props.selectedMonth, 2019)
    var inMonth = false
    for (var x = 0; x < dim; x++){
      inMonth = false
      for (var i = 0; i < events.length; i++){
        if(events[i].date.day === (x + 1).toString()){
          inMonth = true
          let e = events[i]
          let user = this.props.getUser(e.host)
          let u_name = user.first_name + ' ' + user.last_name
          let e_time = events[i].time.hour + ":" + events[i].time.minutes + events[i].time.am_pm
          sched.push({
            id: x + 1, date: e.date.text, isEvent: true, time: e_time, host_id: e.host, guestList: e.guests,
            profile: {pic: user.photoURL, name: u_name, rest: e.location.address}
          })
        }
      }
      if (inMonth === false){
        let d = new Date(2019, this.props.selectedMonth - 1, x + 1)
        let dow = weekdays[d.getDay()]
        let dateText = dow + " " +  (x + 1).toString() + " " + months[this.props.selectedMonth -1]
        sched.push({
          id: x + 1, isEvent: false, date: dateText
        })
      }
    }
    this.setState({
      schedule: sched, 
    })
    return sched 
  }

  getData() {  
    let mE = this.eventsInMonth(this.props.events)
    let newSched = this.loadSchedule(mE)
    this.setState({
      isLoaded: true,
      data: newSched,   
      selectedMonth: this.props.selectedMonth,
    })
  }
  
  keyExtractor(item){
    return item.id.toString() + ', ' + this.props.selectedMonth.toString()
  }

  renderRow({item}) {
    if(item.isEvent){
      if(item.host_id === 0){
        //Pass: Rest, Date, Time, Guestlist
        return(
          <TouchableOpacity onPress={() => {
            this.props.goToEventDetails(item.profile, item.time, item.date, item.guestList)
          }}>
            <UserEvent 
              selectedMonth={this.props.selectedMonth}
              date={item.date} 
              time={item.time} 
              profile={item.profile} 
            />
          </TouchableOpacity>
        )
    }
      else{
        return(
          <DateEvent 
            selectedMonth={this.props.selectedMonth}
            date={item.date} 
            time={item.time} 
            profile={item.profile} 
          />
        )
      }
    }
    else{ 
      return(
        <AddEvent 
          day={item.id} 
          date={item.date} 
          selectedMonth={this.props.selectedMonth} 
          updateEvents={this.props.updateEvents}
          goToNewEvent={this.props.goToNewEvent.bind(this)}
        />
      )
    }
  }
  render() {
      if(this.state.isLoaded){
        return(
          <FlatList 
          data={this.state.data}
          extraData={this.state}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
        )
      }
      else{
        return(
          <View>
            <Text>Loading</Text>
          </View>
        )
      }
  }
}
