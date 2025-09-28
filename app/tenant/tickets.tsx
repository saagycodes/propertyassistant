
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { mockTickets } from '@/data/mockData';
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
  ticketCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ticketDescription: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 22,
    marginBottom: 16,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: colors.grey,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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

export default function TenantTicketsScreen() {
  console.log('TenantTicketsScreen rendered');
  
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Filter tickets for current tenant (using first tenant as example)
  const myTickets = mockTickets.filter(ticket => ticket.tenantId === '1');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return colors.error;
      case 'high': return '#ff6b35';
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.grey;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return colors.success;
      case 'in-progress': return colors.warning;
      case 'escalated': return colors.error;
      case 'open': return colors.primary;
      default: return colors.grey;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return 'checkmark.circle.fill';
      case 'in-progress': return 'clock.fill';
      case 'escalated': return 'exclamationmark.triangle.fill';
      case 'open': return 'circle.fill';
      default: return 'circle';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitTicket = () => {
    console.log('Submit ticket:', { title, description });
    // Here you would typically submit to your backend
    setTitle('');
    setDescription('');
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
          <Text style={styles.headerTitle}>Support Tickets</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable style={styles.addButton} onPress={() => setShowModal(true)}>
            <IconSymbol name="plus" size={20} color="#ffffff" />
            <Text style={styles.addButtonText}>Create New Ticket</Text>
          </Pressable>

          {myTickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketTitle}>{ticket.title}</Text>
                <View style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(ticket.priority) + '20' }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    { color: getPriorityColor(ticket.priority) }
                  ]}>
                    {ticket.priority.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={styles.ticketDescription}>{ticket.description}</Text>

              <View style={styles.ticketFooter}>
                <View style={styles.statusContainer}>
                  <IconSymbol
                    name={getStatusIcon(ticket.status) as any}
                    size={16}
                    color={getStatusColor(ticket.status)}
                  />
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(ticket.status) }
                  ]}>
                    {ticket.status.replace('-', ' ').toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.dateText}>
                  {formatDate(ticket.createdAt)}
                </Text>
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
              <Text style={styles.modalTitle}>Create Support Ticket</Text>
              
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Ticket title"
                placeholderTextColor={colors.grey}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the issue..."
                placeholderTextColor={colors.grey}
                multiline
                numberOfLines={4}
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
                  onPress={handleSubmitTicket}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
