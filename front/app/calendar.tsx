import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const currentDate = new Date();
  
  // Helper function to get the days of the month
  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 0);
    const days = [];
    for (let i = 1; i <= date.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topHeader}>
          <View style={styles.userInfoContainer}>
            <Image
              source={require('../assets/images/cr7.jpg')}
              style={styles.profilePicture}
            />
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Hi, Welcome Back</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Text style={styles.title}>Select a Date</Text>
          <View style={styles.calendar}>
            {daysInMonth.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayBox,
                  selectedDate === `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`
                    ? styles.selectedDay
                    : null,
                ]}
                onPress={() => setSelectedDate(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`)}
              >
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.selectedDate}>
            {selectedDate ? `Selected Date: ${selectedDate}` : 'No date selected'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
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
  calendarContainer: {
    margin: 20,
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
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: '14%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedDay: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default CalendarComponent;
