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

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      errorMessage: "",
      loading: false
    }
  }

  onClickListener = (viewId) => {
    // Alert.alert("Alert", "Button pressed "+viewId);
    this.setState({errorMessage: "", loading: true});
    if (viewId == 'register') this.props.navigation.navigate('SignUpScreen');
    else if (viewId == 'login') {
        if (this.state.email == '' || this.state.password == '') {
          this.setState({errorMessage: 'All the fields are mandatory.'});
          this.setState({loading: false});
          return;
        }
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.navigate('UserProfileScreen');
          this.setState({loading: false});
        })
        .catch(error => {
          console.log(error.message, "ERROR");
          this.setState({ errorMessage: error.message, loading: false });
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}
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

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#DCDCDC" />
          ) : (
            <Text style={styles.loginText}> Login </Text>
          )}
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.registerButton]} onPress={() => this.onClickListener('register')}>
          <Text style={styles.loginText}> Register </Text>
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
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  registerButton: {
    backgroundColor: '#50d890'
  },
  loginText: {
    color: 'white',
  },
  errorContainer: {
    marginBottom: 20
  },
  errorText: {
    color: 'red'
  }
});