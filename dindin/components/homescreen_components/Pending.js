import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Dimensions } from 'react-native'; 
import { TouchableOpacity, Text, View, Image, StyleSheet, FlatList, Alert } from 'react-native'
import { material } from 'react-native-typography';
import InvitationCard from './pending_components/InvitationCard';
import Carousel from 'react-native-snap-carousel';


class Pending extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      numPending: 0,
      pendingCards: [
        //{ id: 1, photoUrl: 'Photo', name: 'Alma Evans', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
        //{ id: 2, photoUrl: 'Photo', name: 'Jane Doe', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
        //{ id: 3, photoUrl: 'Photo', name: 'John Brown', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
        //{ id: 4, photoUrl: 'Photo', name: 'Mike Jones', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
        //{ id: 5, photoUrl: 'Photo', name: 'Carl Hardee', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
        //{ id: 6, photoUrl: 'Photo', name: 'Karen Susan', date: 'Sunday 17, June', time: '8:00pm', rest: 'Silver Kitchen, New Street'},
      ],
    }
    this.renderCards = this.renderCards.bind(this) 
  }

  componentDidMount(){
    this.setPending(this.props.events)
    //this.timerID = setInterval(() => {this.getNumPending()}, 1000)
  }
  setPending(events){
    var updatedPend = []
    for (var i = 0; i < events.Events.length; i++){
      if(events.Events[i].pending === true){
        let e = events.Events[i]
        let user = this.props.getUser(e.host)
        let u_name = user.first_name + ' ' + user.last_name
        let e_time = events.Events[i].time.hour + ":" + events.Events[i].time.minutes + events.Events[i].time.am_pm
        updatedPend.push({
          id: e.id, photoUrl: user.photoURL, name: u_name, date: e.date.text, time: e_time, rest: e.location.address
        })
        
      }
    }
    this.setState({
      pendingCards: updatedPend, 
      numPending: updatedPend.length, 
    })
  }
  getNumPending(){
    this.setState({
      numPending: this.state.pendingCards.length,
    })
  }

  keyExtractor(item){
    return item.id.toString()
  }

  renderCards({item}){
    return(
      <View style={styles.cardContainer}>
        <InvitationCard 
          name={item.name} 
          date={item.date}
          time={item.time}
          photoUrl={item.photoUrl}
          rest={item.rest}
          id={item.id}
          updateEvents={this.props.updateEvents}
          events={this.props.events}
          setPending={this.setPending.bind(this)}
          eventsInMonth={this.props.eventsInMonth}
          />
      </View>
    )
  }

  render() {
    if (this.state.numPending > 0){
      return (
        <View style={styles.container}>
            <Text style={[material.title,styles.pendingText]}> PENDING ({this.state.numPending}) </Text>
          <View style={{alignItems: 'center'}}>
            <Carousel
              ref={(c) => {this._carousel = c}}
              data={this.state.pendingCards}
              extraData={this.state}
              renderItem={this.renderCards}
              layout={'stack'}
              layoutCardOffset={10}
              itemWidth={deviceWidth}
              itemHeight={133}
              sliderWidth={deviceWidth}
              loop={true}
            />
          </View>
        </View>
      )
    }else {
      return (
        <View style={styles.containerEmpty}>
          <Text style={[material.title,styles.pendingText]}> PENDING ({this.state.numPending}) </Text>
        </View>
      )
    }

  }
}
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerEmpty: {
    flexDirection: 'column',
    opacity: .75, 
  },
  cardContainer: {
    height: 133, 
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    marginTop: 5,
  },
  pendingText:{
    fontSize: 13,
    margin: 8,
  },
})

export default withNavigation(Pending)