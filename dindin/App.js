import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import EventDetails from './components/EventDetails'
import InvitationDetails from './components/InvitationDetails'
import { material } from 'react-native-typography';
import NewEvent from './components/NewEvent';
import Invites from './components/Invites';

const rootStack = createDrawerNavigator(
  {
    Splash: {
      screen: SplashScreen,
    }, 
    Home: {
      screen: HomeScreen,
    },
    Event: {
      screen: EventDetails,
    },
    Details: {
      screen: InvitationDetails,
    }, 
    "New Event": {
      screen: NewEvent, 
    },
    Invite: {
      screen: Invites, 
    }
  }, 

  { initialRouteName: 'Splash' },
);

const AppContainer = createAppContainer(rootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer persistenceKey={"NavigationState"}/>;
  }
}
