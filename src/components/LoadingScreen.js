import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class LoadingScreen extends React.Component {
    componentDidMount() {
      setTimeout(() => {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'UserProfileScreen' : 'LoginScreen')
        });
      }, 2000)
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>Initialising App...</Text>
          <ActivityIndicator size="large" />
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});