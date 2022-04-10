import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Logo from './splashscreen_components/Logo.js'
import Header from './splashscreen_components/Header.js'
import GetStarted from './splashscreen_components/GetStarted.js' 
import firebase from '../backend/firebase' 
import {Constants, Facebook } from 'expo'
 
import PropTypes from 'prop-types';


export default class SplashScreen extends React.Component {
  constructor(props){
    super(props)
  }


  static propTypes = {
    navigation: PropTypes.object
  };
  async uploadFile(){
    var ref = firebase.storage().ref()
    var textRef = ref.child('test.txt')
    var message = 'This is my message.';
    textRef.putString(message).then(function(snapshot) {
      console.log('Uploaded a raw string!');
    });
  }
  async signInWithFacebook() {
    const appId = Constants.manifest.extra.facebook.app_id;
    const permissions = ['public_profile'];  // Permissions required, consult Facebook docs
    
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync(
      appId,
      {permissions}
    );
  
    switch (type) {
      case 'success': {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential
        this.props.navigation.navigate("Home")
        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data
        
        return Promise.resolve({type: 'success'});
      }
      case 'cancel': {
        Alert.alert("Whoops", "You must log into Facebook to use DinDin!")
        return Promise.reject({type: 'cancel'});
      }
    }
  }




  render() {
    let foo = this.uploadFile()
    return (
      <View style={{width: '100%', height: '100%', position: 'relative'}}>
            <Logo />
            <Header />
            <TouchableOpacity style={styles.getStartedContainer}
              onPress={()=>{this.props.navigation.navigate("Home")}}>
              <GetStarted />
            </TouchableOpacity>
      </View>
    );
  }
}   

const styles = StyleSheet.create({
  getStartedContainer: {
    width: '100%',
    height: "7.2%", 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,  
  },
})