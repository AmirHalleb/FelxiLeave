import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For retrieving user token

type LeaveRequest = {
  id: string;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Declined';
};

const EmployeeDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]); // To store leave requests fetched from the API
  const [loading, setLoading] = useState<boolean>(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track errors
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch leave requests from the server
    const fetchLeaveRequests = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        // Retrieve the user token (assuming it's stored in AsyncStorage)
        const token = await AsyncStorage.getItem('userToken');
        
        if (!token) {
          throw new Error('User is not logged in');
        }

        const response = await fetch('http://localhost:3000/leaves/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
        }

        const data = await response.json();
        
        // Format the data as needed
        const formattedRequests = data.map((leave: any) => ({
          id: leave.id,
          date: new Date(leave.startDate).toLocaleDateString(), // Format date if needed
          reason: leave.type === 1 ? 'Annual Leave' : leave.type === 2 ? 'Sick Leave' : 'Unpaid Leave',
          status: leave.status === 0 ? 'Pending' : leave.status === 1 ? 'Approved' : 'Declined',
        }));
        
        setLeaveRequests(formattedRequests); // Update state with fetched data
      } catch (error) {
        console.error(error);
        setError('Failed to load leave requests'); // Update error state
      } finally {
        setLoading(false); // Stop loading once the request completes
      }
    };

    fetchLeaveRequests(); // Call the function when the component mounts
  }, []); // Empty dependency array to run only once when the component mounts

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return '#28A745'; // Green
      case 'Pending':
        return '#FFC107'; // Yellow
      case 'Declined':
        return '#DC3545'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Leave Requests</Text>

      {/* Request Leave Button */}
      <TouchableOpacity
        style={styles.requestButton}
        onPress={() => navigation.navigate('home')} // Navigate to the home page
      >
        <Text style={styles.requestButtonText}>Request Leave</Text>
      </TouchableOpacity>

      {/* Leave Requests List */}
      <FlatList
        data={leaveRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.date}>Date: {item.date}</Text>
              <Text style={styles.reason}>Reason: {item.reason}</Text>
              <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.status}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#007BFF', textAlign: 'center', marginBottom: 20 },
  requestButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
  },
  requestButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  cardContent: { flex: 1 },
  date: { fontSize: 16, fontWeight: '600', color: '#007BFF', marginBottom: 8 },
  reason: { fontSize: 14, color: '#4B5563', marginBottom: 10 },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: 'auto',
    alignSelf: 'flex-start',
  },
  status: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default EmployeeDashboard;
