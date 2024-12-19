import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store/retrieve token

type LeaveRequest = {
  id: string;
  employeeName: string;
  role: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Declined';
};

type RootStackParamList = {
  EmployerDashboard: undefined;
  requestdetails: { id: string };
  declineleave: undefined;
};

const RequestCard = ({
  item,
  selectedTab,
  refreshRequests,
}: {
  item: LeaveRequest;
  selectedTab: 'Pending' | 'Approved' | 'Declined';
  refreshRequests: () => void;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStatusChange = async (action: 'accept' | 'reject') => {
    const token = await AsyncStorage.getItem('userToken'); // Replace 'userToken' with your key

    try {
      const response = await fetch(`http://localhost:3000/leaves/${item.id}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', data.message); // Notify the user
        refreshRequests(); // Refresh the leave requests
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to update leave status');
      }
    } catch (error) {
      console.error(`Error updating leave status (${action}):`, error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/70' }} style={styles.profileImage} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.employeeName}</Text>
          <Text style={styles.role}>{item.role}</Text>
          <View style={styles.iconRow}>
            <FontAwesome5 name="calendar-alt" size={14} color="#6B7280" style={styles.icon} />
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.reason}>Reason: {item.reason}</Text>
        </View>
      </View>

      {selectedTab === 'Pending' && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('requestdetails', { id: item.id })}
          >
            <Text style={styles.detailsButtonText}>Details</Text>
          </TouchableOpacity>
          <View style={styles.iconGroup}>
            <TouchableOpacity
              style={styles.circularButtonBlue}
              onPress={() => handleStatusChange('accept')}
            >
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circularButtonBlue}
              onPress={() => handleStatusChange('reject')}
            >
              <MaterialIcons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const EmployerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'Pending' | 'Approved' | 'Declined'>('Pending');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const fetchLeaveRequests = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Replace 'userToken' with your key

    try {
      const response = await fetch('http://localhost:3000/leaves/admin', {
        headers: {
            Authorization: `Bearer ${token}`,        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeaveRequests(data.leaves); // Assuming `leaves` is the array in the response
      } else {
        Alert.alert('Error', 'Failed to fetch leave requests');
      }
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const filteredRequests = leaveRequests.filter((request) => request.status === selectedTab);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Leave Requests</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Pending', 'Approved', 'Declined'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
            onPress={() => setSelectedTab(tab as 'Pending' | 'Approved' | 'Declined')}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard item={item} selectedTab={selectedTab} refreshRequests={fetchLeaveRequests} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#e0e0e0' },
  activeTabButton: { backgroundColor: '#007BFF' },
  tabText: { color: '#888' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#007BFF' },
  role: { fontSize: 14, color: '#4B5563', marginVertical: 3 },
  iconRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  icon: { marginRight: 5 },
  date: { fontSize: 12, color: '#6B7280' },
  reason: { fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  iconGroup: { flexDirection: 'row' },
  circularButtonBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  detailsButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 20,
  },
  detailsButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 12 },
});

export default EmployerDashboard;