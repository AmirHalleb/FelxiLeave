import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import { router, useRouter } from 'expo-router';
const notifSetting: React.FC = () => {
  const [generalNotification, setGeneralNotification] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notification Setting</Text>
        
      </View>

      {/* Notification Options */}
      <View style={styles.option}>
        <Text style={styles.optionText}>General Notification</Text>
        <Switch
          value={generalNotification}
          onValueChange={setGeneralNotification}
          trackColor={{ false: '#d3d3d3', true: '#007BFF' }}
          thumbColor={generalNotification ? '#ffffff' : '#ffffff'}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Sound</Text>
        <Switch
          value={sound}
          onValueChange={setSound}
          trackColor={{ false: '#d3d3d3', true: '#007BFF' }}
          thumbColor={sound ? '#ffffff' : '#ffffff'}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Vibrate</Text>
        <Switch
          value={vibrate}
          onValueChange={setVibrate}
          trackColor={{ false: '#d3d3d3', true: '#007BFF' }}
          thumbColor={vibrate ? '#ffffff' : '#ffffff'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginLeft: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default notifSetting;
