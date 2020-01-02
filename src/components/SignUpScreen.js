import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email   : '',
      password: '',
      errorMessage: '',
      loading: false
    }
  }

  onClickListener = (viewId) => {
    // Alert.alert("Alert", "Button pressed "+viewId);
    this.setState({loading: true, errorMessage: ''});
    if (viewId == 'sign_up') {
        // console.log(this.state.email, this.state.password, this.state.fullName);
        if (this.state.email == '' || this.state.password == '' || this.state.fullName == '') {
          this.setState({errorMessage: 'All the fields are mandatory.'});
          this.setState({loading: false});
          return;
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredentials) => {
            if (userCredentials.user) {
                userCredentials.user.updateProfile({
                    displayName: this.state.fullName,
                })
                .then((user) => {
                    this.props.navigation.navigate('LoadingScreen');
                    this.setState({loading: false});
                })
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.message, loading: false });
            console.log(error);
        })
    }
    else if (viewId == 'login') this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        {this.state.errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}> {this.state.errorMessage}</Text>
          </View>
        ) : <View></View>}

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener('sign_up')}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#DCDCDC" />
          ) : (
            <Text style={styles.signUpText}>Register</Text>
          )} 
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.signUpText}> Login </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  loginButton: {
    backgroundColor: '#50d890'
  },
  signUpText: {
    color: 'white',
  },
  errorContainer: {
    marginBottom: 20
  },
  errorText: {
    color: 'red'
  },
  loaderContainer: {
    marginBottom: 20
  }
});