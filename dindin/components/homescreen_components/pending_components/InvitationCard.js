import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Alert, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements'; 
import PropTypes from 'prop-types';


class InvitationCard extends PureComponent {
  constructor(props){
    super(props)
    props = {
      name: '',
      photoUrl: '',
      date: '', 
      time: '',
      info: {},
    }
    this.state = {
      declineButtonPress: false,
      acceptButtonPress: false, 
    }
  }

  handleAcceptButtonPress=()=>{
    // eslint-disable-next-line no-undef
    var self = this
    this.timerID = setTimeout(function(){
      self.setState({declineButtonPress: false, acceptButtonPress: false})
      self.onAccept()
    }, 1000)
  }

  handleDeclineButtonPress=()=>{
    // eslint-disable-next-line no-undef
    var self = this
    Alert.alert
    ( "About to decline invite.",
      "Confirm decline", 
      [
        {text: "Confirm", onPress: () => {
          this.timerID = setTimeout(function(){
          self.setState({declineButtonPress: false, acceptButtonPress: false})
          self.onDecline()
          }, 1000)
        }}, 
        {text: "Cancel", onPress: ()=>{
          this.timerID = setTimeout(function(){
          self.setState({declineButtonPress: false, acceptButtonPress: false})
          }, 1000)
        }}
      ]
    )
  }
  onAccept(){
    let updatedEvents = this.props.events
    updatedEvents.Events[this.props.id].pending = false 
    updatedEvents.Events[this.props.id].accepted = true
    this.props.setPending(updatedEvents)
    this.props.updateEvents(updatedEvents)
  }

  onDecline(){
    let updatedEvents = this.props.events
    updatedEvents.Events[this.props.id].pending = false
    updatedEvents.Events[this.props.id].accepted = false
    this.props.setPending(updatedEvents)
    this.props.updateEvents(updatedEvents)
  }

  componentWillUnmount(){
    clearTimeout(this.timerID)
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rest: PropTypes.string.isRequired, 
  };

  render() {
    let containerStyle = null 
    if (this.state.declineButtonPress === false && this.state.acceptButtonPress === false){
      containerStyle = styles.container
    }
    else if(this.state.declineButtonPress === true){
      containerStyle = styles.onDeclinePressContainer
    }
    else if(this.state.acceptButtonPress === true){
      containerStyle = styles.onAcceptPressContainer
    }
      return (
        <View style={containerStyle}>
          <TouchableOpacity style={styles.infoContainer}
          onPress={() => {this.props.navigation.navigate('Details', 
            { name: this.props.name,
              photoUrl: this.props.photoUrl,
              date: this.props.date, 
              time: this.props.time, 
              rest: this.props.rest,
            })
          }}
          >
            <Image style={styles.profilePic} source={{uri: this.props.photoUrl}}/>
            <View style={styles.detailsContainer}>
              <Text style={[material.title, styles.nameText]}>{this.props.name}</Text>
              <Text style={[material.title, styles.dateText]}>{this.props.date} - {this.props.time}</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.acceptDeclineContainer}>
            <TouchableOpacity style={styles.declineButtonContainer}
            onPress={() => {
              this.setState({declineButtonPress: true, acceptButtonPress: false})
              containerStyle = styles.onPressContainer
              this.handleDeclineButtonPress()
              }}>
              <Icon name='ios-close' type='ionicon' color='#FF3B3B' size={30}/>
              <Text style={[material.title, styles.declineText]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButtonContainer}
            onPress={() => {
              this.setState({declineButtonPress: false, acceptButtonPress: true})
              containerStyle = styles.onPressContainer
              this.handleAcceptButtonPress()
              }}>
              <Icon name='ios-checkmark' type='ionicon' color='#38D459' size={30}/>
              <Text style={[material.title, styles.acceptText]}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'column',
    width: 315,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#002b80',
    shadowOffset: {width: 0, height: 6}, 
    shadowOpacity: 0.4,
    shadowRadius: 1, 
    borderRadius: 4,
  },
  onAcceptPressContainer: {
    position: 'relative',
    flexDirection: 'column',
    width: 315,
    height: '100%',
    backgroundColor: '#16A137',
    shadowColor: '#002b80',
    shadowOffset: {width: 0, height: 6}, 
    shadowOpacity: 0.4,
    shadowRadius: 1, 
    borderRadius: 4,
  },
  onDeclinePressContainer: {
    position: 'relative',
    flexDirection: 'column',
    width: 315,
    height: '100%',
    backgroundColor: '#CC1919',
    shadowColor: '#002b80',
    shadowOffset: {width: 0, height: 6}, 
    shadowOpacity: 0.4,
    shadowRadius: 1, 
    borderRadius: 4,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    position: 'relative',
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 25,
    paddingBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10, 
  },
  acceptDeclineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1, 
  },
  acceptButtonContainer:{
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderLeftWidth: .5, 
    borderColor: '#D8D8D8',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButtonContainer:{
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderRightWidth: .5, 
    borderColor: '#D8D8D8',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 14,
    opacity: 0.5,
  },
  declineText: {
    fontSize: 14,
    color: '#FF3B3B',
    paddingLeft: 5, 
  },
  acceptText: {
    fontSize: 14,
    color: '#38D459',
    paddingLeft: 5,
  },
})

export default withNavigation(InvitationCard)