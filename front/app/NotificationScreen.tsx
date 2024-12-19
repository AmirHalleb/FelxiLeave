import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';

// Define types for notifications
interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  section: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Request N°404',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '2 M',
    section: 'Today',
  },
  {
    id: '2',
    title: 'Request N°304',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '2 H',
    section: 'Today',
  },
  {
    id: '3',
    title: 'Request N°222',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '3 H',
    section: 'Today',
  },
  {
    id: '4',
    title: 'Request N°343',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '1 D',
    section: 'Yesterday',
  },
  {
    id: '5',
    title: 'Request N°343',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '5 D',
    section: '15 April',
  },
];

const NotificationScreen = () => {
  // Explicitly type item as Notification
  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  // Explicitly type section as string
  const renderSection = (section: string) => (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionHeader}>{section}</Text>
      <FlatList
        data={notifications.filter((n) => n.section === section)}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Notification</Text>
      <TouchableOpacity style={styles.markAllButton}>
        <Text style={styles.markAllText}>Mark all</Text>
      </TouchableOpacity>
      {['Today', 'Yesterday', '15 April'].map(renderSection)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for header
    marginBottom: 16,
    textAlign: 'center',
  },
  markAllButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  markAllText: {
    color: '#007AFF', // Blue color for "Mark all" text
    fontSize: 14,
  },
  sectionBox: {
    backgroundColor: '#00000', // Soft grey background for the box
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for section header
    marginBottom: 8,
    backgroundColor: '#F1F1F1', // Background color for section header
    padding: 12,
    borderRadius: 15,
    alignSelf: 'flex-start', // Ensures it takes only the space needed for the text
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1', // Notification background
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFF', // Blue color for title
  },
  description: {
    fontSize: 14,
    color: '#FFFFF', // Blue color for description text
  },
  time: {
    fontSize: 12,
    color: '#FFFFF', // Blue color for time text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 8,
  },
  footerIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#007AFF',
    borderRadius: 16,
  },
});

export default NotificationScreen;