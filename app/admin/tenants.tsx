
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { mockTenants, mockProperties } from '@/data/mockData';
import { colors, commonStyles } from '@/styles/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tenantCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  tenantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tenantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tenantEmail: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  tenantPhone: {
    fontSize: 14,
    color: colors.grey,
  },
  rentStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tenantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.grey,
  },
  tenantFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  propertyInfo: {
    fontSize: 14,
    color: colors.grey,
  },
  removeButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function TenantsScreen() {
  console.log('TenantsScreen rendered');
  
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const getRentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.grey;
    }
  };

  const getRentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return 'checkmark.circle.fill';
      case 'pending': return 'clock.fill';
      case 'overdue': return 'exclamationmark.triangle.fill';
      default: return 'circle';
    }
  };

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property ? property.name : 'Unknown Property';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleRemoveTenant = (tenantId: string) => {
    console.log('Remove tenant:', tenantId);
    // Here you would typically remove the tenant
  };

  const handleAddTenant = () => {
    console.log('Add tenant:', { name, email, phone });
    // Here you would typically add the tenant
    setName('');
    setEmail('');
    setPhone('');
    setShowModal(false);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Tenant Management</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable style={styles.addButton} onPress={() => setShowModal(true)}>
            <IconSymbol name="plus" size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Add New Tenant</Text>
          </Pressable>

          {mockTenants.map((tenant) => (
            <View key={tenant.id} style={styles.tenantCard}>
              <View style={styles.tenantHeader}>
                <Image 
                  source={{ uri: tenant.profileImage }} 
                  style={styles.tenantImage}
                />
                <View style={styles.tenantInfo}>
                  <Text style={styles.tenantName}>{tenant.name}</Text>
                  <Text style={styles.tenantEmail}>{tenant.email}</Text>
                  <Text style={styles.tenantPhone}>{tenant.phone}</Text>
                </View>
                <View style={[
                  styles.rentStatusBadge,
                  { backgroundColor: getRentStatusColor(tenant.rentStatus) + '20' }
                ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconSymbol
                      name={getRentStatusIcon(tenant.rentStatus) as any}
                      size={12}
                      color={getRentStatusColor(tenant.rentStatus)}
                    />
                    <Text style={[
                      styles.rentStatusText,
                      { color: getRentStatusColor(tenant.rentStatus), marginLeft: 4 }
                    ]}>
                      {tenant.rentStatus.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tenantDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>Room {tenant.roomNumber}</Text>
                  <Text style={styles.detailLabel}>Room</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>${tenant.rentAmount}</Text>
                  <Text style={styles.detailLabel}>Rent</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>{formatDate(tenant.rentDueDate)}</Text>
                  <Text style={styles.detailLabel}>Due Date</Text>
                </View>
              </View>

              <View style={styles.tenantFooter}>
                <Text style={styles.propertyInfo}>
                  {getPropertyName(tenant.propertyId)}
                </Text>
                <Pressable 
                  style={styles.removeButton}
                  onPress={() => handleRemoveTenant(tenant.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={showModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Tenant</Text>
              
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor={colors.grey}
              />
              
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor={colors.grey}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                placeholderTextColor={colors.grey}
                keyboardType="phone-pad"
              />
              
              <View style={styles.modalButtons}>
                <Pressable 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                
                <Pressable 
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleAddTenant}
                >
                  <Text style={styles.submitButtonText}>Add Tenant</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
