import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const CancelRequest = () => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [customDescription, setCustomDescription] = useState('');
  const navigation = useNavigation();

  const reasons = [
    {
      title: 'Staffing Requirements',
      description: "The employee's absence could leave the team short-handed, especially during a busy period or when key projects are underway.",
    },
    {
      title: 'High Workload',
      description: "If the employee’s role is critical, and there are too many outstanding tasks or projects to complete, the manager might need the employee to stay to meet deadlines.",
    },
    {
      title: 'Leave Balance',
      description: "The employee might not have enough leave days accrued to cover the requested time off.",
    },
    {
      title: 'Operational Needs',
      description: "The timing of the leave might not align with business needs, such as during important meetings, client deadlines, or peak business seasons.",
    },
    {
      title: 'Previous Leave',
      description: "If the employee has already taken time off recently or is planning to take more leave soon, the manager might feel the request could impact overall productivity.",
    },
    {
      title: 'Policy or Compliance Issues',
      description: "The leave request could violate company policy, such as taking leave without proper notice or exceeding the allowable leave period.",
    },
    {
      title: 'Emergency Situations',
      description: "If other employees have urgent leave needs, the manager might need to prioritize them over the request.",
    },
    {
      title: 'Other',
      description: '',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('requests')}>
          <Ionicons name="arrow-back" size={24} color="#1D4ED8" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Decline Request</Text>
      </View>

      {/* Instructions Section */}
      <Text style={styles.instructionsText}>
        Please select a reason for declining the request and provide additional details if necessary.
      </Text>

      {/* Selection Module */}
      <View style={styles.reasonsContainer}>
        {reasons.map((reason, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.reasonItem,
              selectedReason === index && styles.selectedReason,
            ]}
            onPress={() => setSelectedReason(index)}
          >
            <Text style={styles.reasonText}>{reason.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Description Section */}
      {selectedReason !== null && (
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionLabel}>Description:</Text>
          {reasons[selectedReason].title === 'Other' ? (
            <TextInput
              style={styles.textInput}
              placeholder="Enter your custom description here..."
              placeholderTextColor="#93C5FD"
              value={customDescription}
              onChangeText={setCustomDescription}
            />
          ) : (
            <Text style={styles.descriptionText}>
              {reasons[selectedReason].description}
            </Text>
          )}
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cancel Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#1D4ED8',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10 ,
    marginBottom: 10,

  },
  instructionsText: {
    color: '#4B5563',
    marginBottom: 30,
    fontSize: 16,
    textAlign: 'center',
  },
  reasonsContainer: {
    marginBottom: 20,
  },
  reasonItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  selectedReason: {
    backgroundColor: '#BFDBFE',
    borderWidth: 2,
    borderColor: '#1D4ED8',
  },
  reasonText: {
    color: '#374151',
    fontSize: 16,
  },
  descriptionBox: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
  },
  descriptionLabel: {
    color: '#1D4ED8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#374151',
    fontSize: 14,
  },
  textInput: {
    height: 100,
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
    padding: 12,
    color: '#1D4ED8',
  },
  button: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancelRequest;