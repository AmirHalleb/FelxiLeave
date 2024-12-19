import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, useRouter } from 'expo-router'; // Make sure you are importing this

const ProfileScreen: React.FC = () => {
  const router = useRouter(); // Correctly initialize the router hook

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
        <Text style={styles.profileName}>John Doe</Text>
      </View>
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.menuText}>{item.label}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const menuItems = [
  {
    label: 'Profile',
    icon: <Text>👤</Text>,
    onPress: () => router.push('/ffprofile'), // Navigate to ffprofile screen
  },
  {
    label: 'Privacy Policy',
    icon: <Text>🔒</Text>,
    onPress: () => console.log('Navigate to Privacy Policy'),
  },
  {
    label: 'Settings',
    icon: <Text>⚙️</Text>,
    onPress: () => router.push('/settings'),
  },
  {
    label: 'Help',
    icon: <Text>❓</Text>,
    onPress: () => console.log('Navigate to Help'),
  },
  {
    label: 'Logout',
    icon: <Text>📄</Text>,
    onPress: () => console.log('Logging out'),
  },
];

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
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginTop: -10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  arrow: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default ProfileScreen;
