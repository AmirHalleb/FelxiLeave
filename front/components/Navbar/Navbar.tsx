import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('/dashboard');
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to check admin status using the /validate-admin middleware
  const checkAdminStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Retrieve token from AsyncStorage
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in again.');
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/auth/validate-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data) {
        setIsAdmin(true); // Admin status confirmed
      } else {
        setIsAdmin(false); // Not an admin
        console.error('Failed to validate admin:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    router.push(route);
  };

  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/dashboard')}
      >
        <FontAwesome
          name="home"
          style={[
            styles.icon,
            activeRoute === '/dashboard' ? styles.activeIcon : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === '/dashboard' ? styles.activeLabel : styles.inactiveLabel
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Conditional Requests */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() =>
          handleNavigation(isAdmin ? '/requests' : '/requestemployee')
        }
      >
        <FontAwesome
          name="list"
          style={[
            styles.icon,
            activeRoute === (isAdmin ? '/requests' : '/requestemployee')
              ? styles.activeIcon
              : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === (isAdmin ? '/requests' : '/requestemployee')
              ? styles.activeLabel
              : styles.inactiveLabel
          }
        >
          {isAdmin ? 'Requests' : 'My Requests'}
        </Text>
      </TouchableOpacity>

      {/* Stats */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/stats')}
      >
        <FontAwesome
          name="calendar"
          style={[
            styles.icon,
            activeRoute === '/stats' ? styles.activeIcon : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === '/stats' ? styles.activeLabel : styles.inactiveLabel
          }
        >
          Calendar
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/profile')}
      >
        <FontAwesome
          name="user"
          style={[
            styles.icon,
            activeRoute === '/profile' ? styles.activeIcon : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === '/profile'
              ? styles.activeLabel
              : styles.inactiveLabel
          }
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 70,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    width: '95%',
    alignSelf: 'center',
    marginBottom: -10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  activeIcon: {
    color: '#007BFF',
  },
  inactiveIcon: {
    color: '#7C7C7C',
  },
  activeLabel: {
    fontSize: 12,
    color: '#007BFF',
    marginTop: 2,
  },
  inactiveLabel: {
    fontSize: 12,
    color: '#7C7C7C',
    marginTop: 2,
  },
});

export default Navbar;