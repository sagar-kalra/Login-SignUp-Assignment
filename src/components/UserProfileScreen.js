import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

export default class UserProfileScreen extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            fullName: '......',
            email: '......'
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({email: user.email, fullName: user.displayName});
            }
            else {
                this.props.navigation.navigate('LoginScreen');
            }
        });
    }

    onClickListener = (viewId) => {
        if (viewId == 'logout') {
            firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('LoadingScreen'));
        }
    }
    
    render() {
        return (
            <View style = {styles.container}>
               
                <View style={styles.centerBox}>
                    <Text style={styles.text}> Name: {this.state.fullName}  </Text>
                    <Text style={styles.text}> Email: {this.state.email} </Text>
                    <TouchableHighlight style={[styles.buttonContainer, styles.logoutButton]} onPress={() => this.onClickListener('logout')}>
                    <Text style={styles.loginText}>Logout</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e7f0c3',
    },
    centerBox: {
        height: 250,
        width: 300,
        backgroundColor: '#a4d4ae',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
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
    logoutButton: {
      backgroundColor: "#f67280",
      marginTop: 30,
      marginBottom: 30
    },
    loginText: {
      color: 'white'
    },
    text: {
        fontSize: 20,
        marginTop: 30,
        color: 'white'
        // marginBottom: 30
    }
  });
