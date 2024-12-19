import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '@/components/Navbar/Navbar'; // Import Navbar correctly
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigationState } from '@react-navigation/native'; // Import this to track navigation state

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [showNavbar, setShowNavbar] = useState(true);

  const state = useNavigationState(state => state); // Get navigation state

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Use navigation state to check the current screen
  useEffect(() => {
    if (state && state.routes) {
      const currentScreen = state.routes[state.index]?.name;

      // Hide Navbar on 'index', 'UserEntry', 'login', and 'signup' screens
      setShowNavbar(
        currentScreen !== 'index' && currentScreen !== 'UserEntry' && currentScreen !== 'login' && currentScreen !== 'signup'
      );
    }
  }, [state]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        {/* Stack Navigator for screens */}
        <View style={[styles.content, showNavbar && styles.contentWithNavbar]}>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Home', headerShown: true }} />
            <Stack.Screen name="UserEntry" options={{ title: 'User Entry', headerShown: true }} />
            <Stack.Screen name="login" options={{ title: 'Login', headerShown: true }} />
            <Stack.Screen name="signup" options={{ title: 'Signup', headerShown: true }} />
            <Stack.Screen name="profile" options={{ title: 'Profile', headerShown: true }} />
            <Stack.Screen name="calendar" options={{ title: 'Calendar', headerShown: true }} />
            <Stack.Screen name="messages" options={{ title: 'Messages', headerShown: true }} />
            <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: true }} />
            <Stack.Screen name="NotificationScreen" options={{ title: 'Notification Screen', headerShown: true }} />
            <Stack.Screen name="ffprofile" options={{ title: 'Full Profile', headerShown: true }} />
            <Stack.Screen name="balance " options={{ title: 'LeaveBalanceScreen', headerShown: true }} />
            <Stack.Screen name="settings " options={{ title: 'settings', headerShown: true }} />
            <Stack.Screen name="notifsettings " options={{ title: 'Notification Settings', headerShown: true }} />
            <Stack.Screen name="passmanager" options={{ title: 'Password Manager', headerShown: true }} />
            <Stack.Screen name="requestemployee" options={{ title: 'Requestemployee', headerShown: true }} />
            <Stack.Screen name="requests" options={{ title: 'Requests', headerShown: true }} />
            <Stack.Screen name="declineleave" options={{ title: 'Decline Leave', headerShown: true }} />
            <Stack.Screen name="submission" options={{ title: 'Submission', headerShown: true }} />
            <Stack.Screen name="SelectDateTime" options={{ title: 'SelectDateTime', headerShown: true }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>

        {/* Conditional rendering of Navbar */}
        {showNavbar && <Navbar/>}
      </View>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentWithNavbar: {
    marginBottom: 70, // Make space for the navbar only when it's visible
  },
});