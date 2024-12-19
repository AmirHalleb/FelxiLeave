
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const RequestPage = () => {
  const navigation = useNavigation(); // Create the navigation object

  const uploadedFile = {
    name: 'SampleFile.pdf',
    uploadedAt: new Date(),
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('requests')}>
          <Icon name="arrow-left" size={24} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.title}>Request</Text>
      </View>

      {/* Doctor Info */}
      <View style={styles.doctorCard}>
        <Image
          source={{
            uri: 'https://storage.googleapis.com/a1aa/image/aCK32uccuKJPINa29NXQ4CjlMLCy9bWeJ9UZly5ted5a1z5TA.jpg',
          }}
          style={styles.doctorImage}
        />
        <View>
          <Text style={styles.doctorName}>Dr. Olivia Turner, M.D.</Text>
          <Text style={styles.doctorSpecialty}>Dermato-Endocrinology</Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.divider} />
      <View style={styles.appointmentDetails}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Mon, 12 June - WED, 14 June</Text>
        </View>
        <View style={styles.timeRow}>
          <Icon name="check-circle" size={24} color="#2563eb" style={styles.iconSpacing} />
          <TouchableOpacity onPress={() => navigation.navigate('declineleave')}>
            <Icon name="times-circle" size={24} color="#2563eb" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reason */}
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reason</Text>
        <View style={styles.reasonBadge}>
          <Text style={styles.reasonText}>Sick Leave</Text>
        </View>
      </View>

      {/* Problem */}
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Problem</Text>
        <Text style={styles.problemText}>
          I regret to inform you that I am unable to attend work from Monday, 12th June to Wednesday, 14th June due to illness. During this period, I was experiencing significant health issues that required rest and medical attention. I have attached a medical certificate for your reference, which provides further details regarding my condition. I apologize for any inconvenience caused and appreciate your understanding during this time.
        </Text>
      </View>

      {/* Recently Uploaded File Section */}
      {uploadedFile && (
        <View style={styles.uploadedFileSection}>
          <Text style={styles.sectionTitle}>Recently Uploaded File</Text>
          <View style={styles.fileCardLarge}>
            <Icon name="file-pdf-o" size={32} color="#ef4444" style={styles.largeFileIcon} />
            <View style={styles.fileDetails}>
              <Text style={styles.fileNameLarge}>{uploadedFile.name}</Text>
              <Text style={styles.uploadedAtLarge}>
                Uploaded on {uploadedFile.uploadedAt.toDateString()}
              </Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Icon name="download" size={18} color="#ffffff" />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#2563eb',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#bfdbfe',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorName: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doctorSpecialty: {
    color: '#4b5563',
    fontSize: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#c7d2fe',
    marginVertical: 16,
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBadge: {
    backgroundColor: '#2563eb',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  dateText: {
    color: '#ffffff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#4b5563',
    marginBottom: 8,
  },
  reasonBadge: {
    backgroundColor: '#bfdbfe',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  reasonText: {
    color: '#2563eb',
  },
  problemText: {
    color: '#1f2937',
  },
  uploadedFileSection: {
    marginTop: 32,
  },
  fileCardLarge: {
    flexDirection: 'row',
    backgroundColor: '#bfdbfe',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  largeFileIcon: {
    marginRight: 16,
  },
  fileDetails: {
    flex: 1,
  },
  fileNameLarge: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  uploadedAtLarge: {
    color: '#4b5563',
    fontSize: 12,
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  downloadText: {
    color: '#ffffff',
    marginLeft: 8,
  },
});

export default RequestPage;
