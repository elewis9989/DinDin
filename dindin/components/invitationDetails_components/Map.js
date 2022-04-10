import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import { Constants, Location, Permissions} from 'expo'

class Map extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            mapRegion: null, 
            hasLocationPermissions: false, 
            locationResult: null, 

        }
        props = {
            mapStyle: [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "on"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#212121"
                    }
                  ]
                },
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "administrative.country",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#bdbdbd"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#181818"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#1b1b1b"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#2c2c2c"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#8a8a8a"
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#373737"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#3c3c3c"
                    }
                  ]
                },
                {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#4e4e4e"
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#616161"
                    }
                  ]
                },
                {
                  "featureType": "transit",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#000000"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#3d3d3d"
                    }
                  ]
                }
              ],
        }
    }

    componentDidMount() {
        this.getLocationAsync()
    }

    _handleMapRegionChange = mapRegion => {
        this.setState({mapRegion})
    }

    async getLocationAsync (){
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if(status != 'granted'){
            this.setState({
                locationResult: 'Permission to access location was denied',
            })
        }
        else{
            this.setState({ hasLocationPermissions: true})
        }
        let location = await Location.getCurrentPositionAsync({})
        this.setState({ locationResult: JSON.stringify(location)})
        if(this.props.location === null || this.props.location === undefined){
          this.setState({
              mapRegion:{
                  latitude: location.coords.latitude, 
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0080, 
                  longitudeDelta: 0.0080,
              }
          })
        }
        else{
          this.setState({
            mapRegion:{
                latitude: this.props.location.lat, 
                longitude: this.props.location.lng,
                latitudeDelta: 0.0080, 
                longitudeDelta: 0.0080,
            }
        })
        }

    }

    render(){
        if(this.props.location === null || this.props.location === undefined){
          return(
              <View>
                  {
                      this.state.locationResult === null ? 
                          <Text>Finding your current location...</Text>: 
                      this.state.hasLocationPermissions === false ? 
                          <Text>Location permissions are not granted.</Text>: 
                              this.state.mapRegion === null ?
                                  <Text>Map region does not exist</Text>: 
                                  <MapView
                                  style={{alignSelf: 'stretch', height: '100%', width: '100%'}} 
                                  region={this.state.mapRegion}
                                  provider={PROVIDER_GOOGLE}
                                  customMapStyle={this.props.mapStyle}
                                  >
                                      <Marker 
                                      coordinate={{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}}
                                      title={'Dinner Location'}
                                      />
                                  
                                  </MapView>
                  }
              </View>
          )
        }
        else{
          return(
              <View>
                  {
                      this.state.locationResult === null ? 
                          <Text>Finding your current location...</Text>: 
                      this.state.hasLocationPermissions === false ? 
                          <Text>Location permissions are not granted.</Text>: 
                              this.state.mapRegion === null ?
                                  <Text>Map region does not exist</Text>: 
                                  <MapView
                                  style={{alignSelf: 'stretch', height: '100%', width: '100%'}} 
                                  region={{
                                            latitude: this.props.location.lat, 
                                            longitude: this.props.location.lng,
                                            latitudeDelta: 0.0080, 
                                            longitudeDelta: 0.0080,
                                        }}
                                  provider={PROVIDER_GOOGLE}
                                  customMapStyle={this.props.mapStyle}
                                  >
                                      <Marker 
                                      coordinate={{latitude: this.props.location.lat, longitude: this.props.location.lng}}
                                      title={'Dinner Location'}
                                      />
                                  
                                  </MapView>
                  }
              </View>
          )
        }
    }
}

export default withNavigation(Map)