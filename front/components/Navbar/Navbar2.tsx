import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Navbar: React.FC = () => {
  const router = useRouter(); // Use router from expo-router
  const [activeRoute, setActiveRoute] = useState('/home'); // Track the active route

  const handleNavigation = (route) => {
    setActiveRoute(route);
    router.push(route);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/home')}
      >
        <FontAwesome
          name="home"
          style={[
            styles.icon,
            activeRoute === '/home' ? styles.activeIcon : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === '/home' ? styles.activeLabel : styles.inactiveLabel
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/requests')}
      >
        <FontAwesome
          name="wallet"
          style={[
            styles.icon,
            activeRoute === '/requests' ? styles.activeIcon : styles.inactiveIcon,
          ]}
        />
        <Text
          style={
            activeRoute === '/requests' ? styles.activeLabel : styles.inactiveLabel
          }
        >
          Wallet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation('/stats')}
      >
        <FontAwesome
          name="pie-chart"
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
          Stats
        </Text>
      </TouchableOpacity>

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
            activeRoute === '/profile' ? styles.activeLabel : styles.inactiveLabel
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
    marginBottom:-10,
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