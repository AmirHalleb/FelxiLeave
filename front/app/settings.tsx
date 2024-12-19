import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Correct import for useRouter

function Settings() {
  const router = useRouter(); // Correctly initialize the router hook

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Notification Setting */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/notifsettings')} // Navigate to notification settings
      >
        <View style={styles.optionLeft}>
          <Text style={styles.emoji}>🔔</Text>
          <Text style={styles.optionText}>Notification Setting</Text>
        </View>
        <Text style={styles.arrow}>❯</Text>
      </TouchableOpacity>

      {/* Password Manager */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/passmanager')} // Navigate to password manager
      >
        <View style={styles.optionLeft}>
          <Text style={styles.emoji}>🔑</Text>
          <Text style={styles.optionText}>Password Manager</Text>
        </View>
        <Text style={styles.arrow}>❯</Text>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/deleteacc')} // Navigate to delete account
      >
        <View style={styles.optionLeft}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.optionText}>Delete Account</Text>
        </View>
        <Text style={styles.arrow}>❯</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066FF',
    marginBottom: 30,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#A0A0A0',
  },
});

export default Settings;
