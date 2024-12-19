import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { Link } from 'expo-router'; // Import Link from expo-router

const App = () => {
  // Initialisation de la valeur animée pour le logo
  const scaleValue = useRef(new Animated.Value(1)).current;

  // État pour l'effet machine à écrire
  const [typedText, setTypedText] = useState('');
  const fullText = "Your Time Off, Perfectly Organized";

  useEffect(() => {
    // Animation de mise à l'échelle pour le logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Valeur d'échelle maximale
          duration: 1000,
          easing: Easing.ease, // Ajout d'une courbe d'animation
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Valeur d'échelle initiale
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleValue]);

  useEffect(() => {
    // Animation de machine à écrire
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) {
        clearInterval(interval); // Stop l'animation à la fin du texte
      }
    }, 100); // Vitesse de frappe (en millisecondes)
    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, { transform: [{ scale: scaleValue }] }]}
      >
        {/* Wrap the Flexileave text with the Link component */}
        <Link href="/UserEntry">
          <Text style={styles.logo}>Flexileave</Text>
        </Link>

        {/* Texte avec animation de machine à écrire */}
        <Text style={styles.slogan}>{typedText}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    padding: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
