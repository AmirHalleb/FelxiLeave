import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EmployerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'Pending' | 'Approved' | 'Declined'>('Pending');
  const [leaveRequests, setLeaveRequests] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        throw new Error('User token not found. Please log in again.');
      }

      const response = await fetch('http://localhost:3000/leaves/admin', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();

      const formattedRequests = data.map((leave: any) => ({
        id: leave.leaveId,
        employeeName: leave.User?.userName || 'Unknown',
        role: leave.User?.role || 'N/A',
        date: leave.startDate?.split('T')[0] || 'N/A',
        reason: leave.type === 1 ? 'Annual Leave' : leave.type === 2 ? 'Sick Leave' : 'Unpaid Leave',
        status: leave.status === 0 ? 'Pending' : leave.status === 1 ? 'Approved' : 'Declined',
      }));

      setLeaveRequests(formattedRequests);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching leave requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const filteredRequests = leaveRequests.filter((request) => request.status === selectedTab);

  const handleStatusChange = async (action: 'accept' | 'reject', requestId: string) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch(`http://localhost:3000/leaves/${requestId}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', data.message); 
        fetchLeaveRequests(); // Refresh the leave requests
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to update leave status');
      }
    } catch (error) {
      console.error(`Error updating leave status (${action}):`, error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
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
      <Text style={styles.header}>Leave Requests</Text>

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

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <RequestCard 
            item={item} 
            selectedTab={selectedTab} 
            handleStatusChange={handleStatusChange} // Pass the handler as a prop
          />
        )}
      />
    </View>
  );
};

const RequestCard = ({ item, selectedTab, handleStatusChange }: { item: any; selectedTab: string; handleStatusChange: Function }) => {
  const navigation = useNavigation();

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
              onPress={() => handleStatusChange('accept', item.id)}
            >
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circularButtonBlue}
              onPress={() => handleStatusChange('reject', item.id)}
            >
              <MaterialIcons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#007BFF', textAlign: 'center' },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#e0e0e0' },
  activeTabButton: { backgroundColor: '#007BFF' },
  tabText: { color: '#888' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 15, marginVertical: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  rowContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#007BFF' },
  role: { fontSize: 14, color: '#4B5563', marginVertical: 3 },
  iconRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  icon: { marginRight: 5 },
  date: { fontSize: 12, color: '#6B7280' },
  reason: { fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  iconGroup: { flexDirection: 'row' },
  circularButtonBlue: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#007BFF', justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  detailsButton: { backgroundColor: '#e0e0e0', paddingVertical: 10, paddingHorizontal: 70, borderRadius: 20 },
  detailsButtonText: { color: '#007BFF', fontWeight: 'bold', fontSize: 12 },
  loader: { flex: 1, justifyContent: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default EmployerDashboard;
