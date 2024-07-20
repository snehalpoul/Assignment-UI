import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform,Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.4:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber,
          password,
        }),
      });

      const data = await response.json();
      
      if (data.success == true) {
        // Handle successful login
        Alert.alert('Login Successful', 'Welcome!');
        console.log(data.user)
        const { token, user } = data;
        navigation.navigate('Home', { user });
        // You might want to save the token and navigate to another screen
        console.log('Token:', data.token);
      } else {
        // Handle errors
        Alert.alert('Login Failed', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login Failed', 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
