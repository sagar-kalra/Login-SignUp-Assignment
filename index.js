/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LoginScreen from './src/components/LoginScreen';
import SignUpScreen from './src/components/SignUpScreen';
import LoadingScreen from './src/components/LoadingScreen';


AppRegistry.registerComponent(appName, () => App);
