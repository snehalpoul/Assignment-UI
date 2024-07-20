import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import axios from 'axios';

const RegistrationScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const apiUrl = Platform.OS === 'android' ? 'http://192.168.1.4:3000/register' : 'http://192.168.1.4:3000/register';

    if (firstName && lastName && mobileNumber && password) {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          mobileNumber,
          password,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          Alert.alert('Registration successful!', 'Please log in.');
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration failed', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Network Error', 'Please check your network connection and try again.');
      });
    } else {
      Alert.alert('Error', 'All fields are required.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput 
        style={styles.input} 
        placeholder="First Name" 
        value={firstName} 
        onChangeText={setFirstName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Mobile Number" 
        value={mobileNumber} 
        onChangeText={setMobileNumber} 
        keyboardType="numeric" 
        maxLength={10}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Login by Google" onPress={() => {}} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Login by Facebook" onPress={() => {}} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Login by Apple Id" onPress={() => {}} />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 16,
  },
  socialLoginContainer: {
    marginTop: 20,    
  },
  buttonSpacing: {
    marginBottom: 10, // Adjust the value for desired spacing
  },
});

export default RegistrationScreen;


