import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

const App = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();

  // Function to handle signup logic
  const handleSignUp = async () => {
    if (!name || !password || !email || !mobile || !dob) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
          email,
          mobile,
          dob,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/login'); // Redirect to login page
      } else {
        Alert.alert('Error', data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Account</Text>

      {/* Full Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#A0A0A0"
        value={name}
        onChangeText={setName}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        placeholderTextColor="#A0A0A0"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      {/* Date of Birth Input */}
      <TextInput
        style={styles.input}
        placeholder="DD / MM / YYYY"
        placeholderTextColor="#A0A0A0"
        value={dob}
        onChangeText={setDob}
      />

      {/* Terms and Conditions */}
      <Text style={styles.terms}>
        By continuing, you agree to{' '}
        <Text style={styles.link}>Terms of Use</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Redirect to Login */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Link href="/login" style={styles.linkText}>
          Log In
        </Link>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  terms: {
    textAlign: 'center',
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 10,
  },
  link: {
    color: '#0066FF',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#0066FF',
    fontWeight: 'bold',
  },
});

export default App;
