import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const Profile: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../assets/images/cr7.jpg')} // Use relative path from the app folder
        />
        <TouchableOpacity style={styles.editIcon}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>
      <br/>
      <ScrollView style={styles.menuContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#A0A0A0"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#A0A0A0"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          placeholderTextColor="#A0A0A0"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -10,

  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 110,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    padding: 5,
  },
  editText: {
    color: '#ffffff',
    fontSize: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuContainer: {
    marginTop: -30,

  },
  input: {
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
