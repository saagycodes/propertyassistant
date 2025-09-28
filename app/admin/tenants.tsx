
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Modal, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockTenants, mockProperties } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.3)',
    elevation: 8,
    zIndex: 1000,
  },
  tenantCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tenantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tenantImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundAlt,
    marginRight: 16,
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
  tenantProperty: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 2,
  },
  tenantRoom: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  tenantDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  rentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  actionButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
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
    borderRadius: 16,
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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.backgroundAlt,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: colors.text,
  },
  submitButtonText: {
    color: '#ffffff',
  },
});

export default function TenantsScreen() {
  console.log('TenantsScreen rendered');

  const [showModal, setShowModal] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    propertyId: '',
    roomNumber: '',
    rentAmount: '',
  });

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
    return property?.name || 'Unknown Property';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleRemoveTenant = (tenantId: string) => {
    console.log('Removing tenant:', tenantId);
    // In a real app, this would remove the tenant from the backend
  };

  const handleAddTenant = () => {
    console.log('Adding tenant:', newTenant);
    // In a real app, this would add the tenant to the backend
    setShowModal(false);
    setNewTenant({
      name: '',
      email: '',
      phone: '',
      propertyId: '',
      roomNumber: '',
      rentAmount: '',
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tenant Management',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockTenants.map((tenant) => (
          <View key={tenant.id} style={styles.tenantCard}>
            <View style={styles.tenantHeader}>
              <Image
                source={{ uri: tenant.profileImage }}
                style={styles.tenantImage}
                resizeMode="cover"
              />
              <View style={styles.tenantInfo}>
                <Text style={styles.tenantName}>{tenant.name}</Text>
                <Text style={styles.tenantProperty}>{getPropertyName(tenant.propertyId)}</Text>
                <Text style={styles.tenantRoom}>Room {tenant.roomNumber}</Text>
              </View>
            </View>

            <View style={styles.tenantDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>${tenant.rentAmount}</Text>
                <Text style={styles.detailLabel}>Monthly Rent</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>{formatDate(tenant.rentDueDate)}</Text>
                <Text style={styles.detailLabel}>Due Date</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailValue}>{formatDate(tenant.leaseEndDate)}</Text>
                <Text style={styles.detailLabel}>Lease Ends</Text>
              </View>
            </View>

            <View style={styles.rentStatus}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getRentStatusColor(tenant.rentStatus) + '20' }
              ]}>
                <IconSymbol
                  name={getRentStatusIcon(tenant.rentStatus) as any}
                  size={14}
                  color={getRentStatusColor(tenant.rentStatus)}
                />
                <Text style={[
                  styles.statusText,
                  { color: getRentStatusColor(tenant.rentStatus) }
                ]}>
                  {tenant.rentStatus.toUpperCase()}
                </Text>
              </View>

              <Pressable
                style={styles.actionButton}
                onPress={() => handleRemoveTenant(tenant.id)}
              >
                <Text style={styles.actionButtonText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setShowModal(true)}>
        <IconSymbol name="plus" size={24} color="#ffffff" />
      </Pressable>

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
              placeholder="Full Name"
              placeholderTextColor={colors.grey}
              value={newTenant.name}
              onChangeText={(text) => setNewTenant({ ...newTenant, name: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.grey}
              value={newTenant.email}
              onChangeText={(text) => setNewTenant({ ...newTenant, email: text })}
              keyboardType="email-address"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={colors.grey}
              value={newTenant.phone}
              onChangeText={(text) => setNewTenant({ ...newTenant, phone: text })}
              keyboardType="phone-pad"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Room Number"
              placeholderTextColor={colors.grey}
              value={newTenant.roomNumber}
              onChangeText={(text) => setNewTenant({ ...newTenant, roomNumber: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Monthly Rent Amount"
              placeholderTextColor={colors.grey}
              value={newTenant.rentAmount}
              onChangeText={(text) => setNewTenant({ ...newTenant, rentAmount: text })}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddTenant}
              >
                <Text style={[styles.buttonText, styles.submitButtonText]}>Add Tenant</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
