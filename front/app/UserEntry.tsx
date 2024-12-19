import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router

const App = () => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Flexileave</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        {/* Log In Button */}
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Link>

        {/* Sign Up Button */}
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0066FF', // Blue color for logo
  },
  buttonsContainer: {
    width: '80%',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0066FF', // Blue color for "Log In"
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#79B2FA', // Light blue color for "Sign Up"
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default App;
