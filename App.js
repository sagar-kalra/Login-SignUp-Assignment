import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from './src/components/LoadingScreen';
import LoginScreen from './src/components/LoginScreen';
import SignUpScreen from './src/components/SignUpScreen';
import UserProfileScreen from './src/components/UserProfileScreen';

const NavStack = createSwitchNavigator(
  {
    LoadingScreen,
    LoginScreen,
    SignUpScreen,
    UserProfileScreen
  },
  {
    initialRouteName: 'LoadingScreen'
  }
);

const App = createAppContainer(NavStack);

export default App;
