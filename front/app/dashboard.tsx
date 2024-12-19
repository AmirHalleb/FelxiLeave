
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { router, useRouter } from 'expo-router';
type DateRange = {
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
};

type ShowPicker = {
  leaveType: boolean;
  startDate: boolean;
  startTime: boolean;
  endDate: boolean;
  endTime: boolean;
};

const LeaveForm: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    startTime: new Date(),
    endDate: new Date(),
    endTime: new Date(),
  });
  const [showPicker, setShowPicker] = useState<ShowPicker>({
    leaveType: false,
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  });
  const [justification, setJustification] = useState<string>('');

  const handleDateChange = (
    type: keyof DateRange,
    event: any,
    value?: Date
  ) => {
    setShowPicker((prev) => ({ ...prev, [type]: false }));
    if (event?.type === 'set' && value) {
      setDateRange((prev) => ({ ...prev, [type]: value }));
    }
  };

  const handleSubmit = () => {
    const { startDate, startTime, endDate, endTime } = dateRange;

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.getHours(), startTime.getMinutes());

    const endDateTime = new Date(endDate);
    endDateTime.setHours(endTime.getHours(), endTime.getMinutes());

    if (endDateTime <= startDateTime) {
      Alert.alert('Error', 'End date and time must be after start date and time.');
      return;
    }

    if (!leaveType) {
      Alert.alert('Error', 'Please select a leave type.');
      return;
    }

    Alert.alert('Success', 'Leave application submitted successfully!');
  };

  const handleFileUpload = () => {
    Alert.alert('File Upload', 'File upload functionality is not implemented yet.');
  };
  const router = useRouter(); 
  const totalDays = 30;
  const usedDays = 24;
  const remainingDays = totalDays - usedDays;
  const percentageUsed = (usedDays / totalDays) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <View style={styles.userInfoContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.profilePicture}
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi, Welcome Back</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
        </View>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity onPress={() => router.push('/NotificationScreen')}>
            <Icon name="notifications-outline" size={24} color="#333" style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Icon name="settings-outline" size={24} color="#333" style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Leave Usage</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentageUsed}%` }]} />
        </View>
        <Text style={styles.percentageText}>{Math.round(percentageUsed)}%</Text>
        <Text style={styles.remainingText}>{remainingDays} Days Remaining</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Fill this form to apply for leave</Text>

        <View style={styles.leaveTypeContainer}>
          <Text style={styles.fieldLabel}>Select Leave Type</Text>
          <TouchableOpacity
            onPress={() => setShowPicker((prev) => ({ ...prev, leaveType: true }))}
            style={styles.dropdown}
          >
            <Icon name="clipboard-outline" size={20} color="#555" style={styles.icon} />
            <Text style={{ color: leaveType ? '#000' : '#888', marginLeft: 10 }}>
              {leaveType || 'Select Leave Type'}
            </Text>
          </TouchableOpacity>

          <Modal transparent={true} visible={showPicker.leaveType} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={leaveType}
                  onValueChange={(itemValue) => {
                    setLeaveType(itemValue);
                    setShowPicker((prev) => ({ ...prev, leaveType: false }));
                  }}
                >
                  <Picker.Item label="Sick Leave" value="sick" />
                  <Picker.Item label="Vacation Leave" value="vacation" />
                  <Picker.Item label="Casual Leave" value="casual" />
                </Picker>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.dateTimeContainer}>
          {/* Start Date */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.fieldLabel}>Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowPicker((prev) => ({ ...prev, startDate: true }))}
              style={styles.datePicker}
            >
              <Icon name="calendar-outline" size={20} color="#555" />
              <Text>{dateRange.startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker.startDate && (
              <DateTimePicker
                value={new Date(dateRange.startDate)}
                mode="date"
                onChange={(event, date) => handleDateChange('startDate', event, date)}
              />
            )}
          </View>

          {/* Start Time */}
          <View style={styles.timePickerContainer}>
            <Text style={styles.fieldLabel}>Start Time</Text>
            <TouchableOpacity
              onPress={() => setShowPicker((prev) => ({ ...prev, startTime: true }))}
              style={styles.datePicker}
            >
              <Icon name="time-outline" size={20} color="#555" />
              <Text>{dateRange.startTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showPicker.startTime && (
              <DateTimePicker
                value={new Date(dateRange.startTime)}
                mode="time"
                onChange={(event, time) => handleDateChange('startTime', event, time)}
              />
            )}
          </View>
        </View>
        
        <View style={styles.dateTimeContainer}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.fieldLabel}>End Date</Text>
            <TouchableOpacity onPress={() => setShowPicker((prev) => ({ ...prev, endDate: true }))} style={styles.datePicker}>
              <Icon name="calendar-outline" size={20} color="#555" style={styles.icon} />
              <Text>{dateRange.endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker.endDate && (
              <DateTimePicker
                value={new Date(dateRange.endDate)}
                mode="date"
                onChange={(event, date) => handleDateChange('endDate', event, date)}
              />
            )}
          </View>

          {/* End Time */}

          <View style={styles.timePickerContainer}>
            <Text style={styles.fieldLabel}>End Time</Text>
            <TouchableOpacity onPress={() => setShowPicker((prev) => ({ ...prev, endTime: true }))} style={styles.datePicker}>
              <Icon name="time-outline" size={20} color="#555" style={styles.icon} />
              <Text>{dateRange.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {showPicker.endTime && (
              <DateTimePicker
                value={new Date(dateRange.endTime)}
                mode="time"
                onChange={(event, time) => handleDateChange('endTime', event, time)}
              />
            )}
          </View>
          
        </View>

        <View style={styles.justificationContainer}>
          <Text style={styles.fieldLabel}>Leave Justification</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter the reason for your leave"
            multiline={true}
            numberOfLines={4}
            value={justification}
            onChangeText={setJustification}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={() => router.push({
          pathname: '/submission',
          params: {
        date: dateRange.startDate.toDateString(),
        time: dateRange.startTime.toLocaleTimeString(),
      },
        })}>
      <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>


       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 11,
  },
 
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greetingContainer: {
    flexDirection: 'column',
  },
  greetingText: {
    fontSize: 16,
    color: '#007BFF',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIconsContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 15,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007BFF',
  },
  percentageText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  remainingText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  leaveTypeContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  datePickerContainer: {
    width: '48%',
  },
  timePickerContainer: {
    width: '48%',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
 padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 300,
    padding: 10,
  },
  justificationContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // For multiline input
  },
  fileUploadContainer: {
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#007BFF',
    fontSize: 14,
    
  },
  
});

export default LeaveForm;
