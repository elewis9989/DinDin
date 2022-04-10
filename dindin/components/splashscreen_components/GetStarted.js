import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { LinearGradient} from 'expo'
import { material } from 'react-native-typography';

export default class GetStarted extends React.Component {
  render() {
    return (
      <LinearGradient 
        start={[0.5, 1.0]}
        end={[0.5, 0.0]}
        colors={['#0F8CFF', '#1AB9FF']} 
        style= {styles.container}>
          <Text style={styles.startText}>Get Started</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,  
  },
  startText: {
    fontSize: 14,
    color: 'white',
    textAlign: "center",
  }
})