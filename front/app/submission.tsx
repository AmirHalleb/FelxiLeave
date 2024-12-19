import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SuccessSubmission: React.FC = () => {
  const router = useRouter();

  // Get current date and time
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })} ${currentDate.toLocaleTimeString()}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/dashboard')} // Navigate to '/dashboard' on press
      >
        <Icon name="arrow-back-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Icon name="checkmark-circle" size={100} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Félicitations</Text>
        <Text style={styles.subtitle}>La soumission a été effectuée avec succès.</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Votre demande sera examinée prochainement.</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    padding: 10,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  footer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  footerText: {
    fontSize: 16,
    color: '#4C8BF5',
    textAlign: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
});

export default SuccessSubmission;
