import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ route,navigation }) => {
  const { user } = route.params;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = () => {
    // Clear token and navigate back to login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`${getGreeting()} Mr. ${user.firstName} ${user.lastName}`}</Text>
      <Button title="Logout" onPress={handleLogout} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
  },
});

export default HomeScreen;
