import React from 'react';
import {
  Image, 
  View, 
  StyleSheet, 
  ImageBackground, 
  Animated,
  Dimensions,
} from 'react-native'

export default class Logo extends React.Component {
  constructor(){
    super()
    const {width, height} = Dimensions.get('window');
    let orientation = 'Portrait'
    if(width > height){
      orientation = 'Landscape'
    }
    else {
      orientation = 'Portrait'
    }
    this.state = {
      fadeAnim: new Animated.Value(0),
      fadeAnim2: new Animated.Value(0),
      fadeAnim3: new Animated.Value(0),
      OrientationStatus: orientation
    }
  }

  DetectOrientation = () => {
    const {width, height} = Dimensions.get('window');
    if(width > height){
      this.setState({
        OrientationStatus:'Landscape',
      });
    }

    else {
      this.setState({
        OrientationStatus:'Portrait'
      });
    }
  }

  componentDidMount(){
    Dimensions.addEventListener("change", this.DetectOrientation);
    
    Animated.sequence([
      Animated.timing(                  
        this.state.fadeAnim,            
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 1000,              // Make it take a while
          delay: 200,
        }
      ),

      Animated.timing(                  
        this.state.fadeAnim2,            
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 1000,              // Make it take a while
        }
      ),

      Animated.timing(                  
        this.state.fadeAnim3,            
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 1000,              // Make it take a while
        }
      ),
     
    ]).start()
  }

  componentWillUnmount(){
    Dimensions.removeEventListener("change", this.DetectOrientation);
  }

  render() {
    let { fadeAnim } = this.state;
    let { fadeAnim2 } = this.state;
    let { fadeAnim3 } = this.state;
    let styles = null

    if(this.state.OrientationStatus === 'Landscape'){
      styles = landscapeStyles
    }
    else{
      styles = portraitStyles
    }
    return (
      <View style={styles.container}>
        <ImageBackground 
          style={styles.main} 
          source={require('../../assets/splashscreen/main.png')}
        >
          <Animated.View style={{opacity: fadeAnim}}>
            <Image style={styles.person1}source={require('../../assets/splashscreen/person1.png')}></Image>
          </Animated.View>
          
          <Animated.View style={{opacity: fadeAnim2}}>
            <Image style={styles.person2}source={require('../../assets/splashscreen/person2.png')}></Image>
          </Animated.View>

          <Animated.View style={{opacity: fadeAnim3}}>
            <Image style={styles.person3}source={require('../../assets/splashscreen/person3.png')}></Image>
          </Animated.View>

        </ImageBackground>
      </View>
    );
  }
}

const portraitStyles = StyleSheet.create({
  container: { 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '16.8%',
    width: '100%', 
    height: '38.8%',
  },
  main: {
    width: 259, 
    height: 259,
  },

  person1:{
    width: 67,
    height: 72,
    left: 152,
  },

  person2:{
    width: 73,
    height: 80,
    left: -10,
    top: 40
  },

  person3:{
    width: 73,
    height: 80,
    left: 149,
    top: 60
  }


})

const landscapeStyles = StyleSheet.create({
  container: { 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '16.8%',
    width: '100%', 
    height: '38.8%',
  },
  main: {
    width: 259, 
    height: 259,
  },

  person1:{
    width: 67,
    height: 72,
    left: 152,
  },

  person2:{
    width: 73,
    height: 80,
    left: -40,
    top: 0
  },

  person3:{
    width: 73,
    height: 80,
    left: 209,
    top: -10
  }


})