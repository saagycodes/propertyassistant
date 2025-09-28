
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockTickets } from '@/data/mockData';

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
  ticketCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  ticketDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  dateText: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 8,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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

export default function TenantTicketsScreen() {
  console.log('TenantTicketsScreen rendered');

  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
  });

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
      case 'open': return colors.error;
      case 'in-progress': return colors.warning;
      case 'resolved': return colors.success;
      case 'escalated': return '#8b5cf6';
      default: return colors.grey;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return 'exclamationmark.circle';
      case 'in-progress': return 'clock';
      case 'resolved': return 'checkmark.circle';
      case 'escalated': return 'arrow.up.circle';
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
    console.log('Submitting ticket:', newTicket);
    // In a real app, this would submit the ticket to the backend
    setShowModal(false);
    setNewTicket({ title: '', description: '', priority: 'medium' });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Tickets',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {myTickets.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketTitle}>{ticket.title}</Text>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(ticket.priority) }
              ]}>
                <Text style={styles.priorityText}>{ticket.priority.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.ticketDescription}>{ticket.description}</Text>

            <View style={styles.ticketFooter}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(ticket.status) + '20' }
              ]}>
                <IconSymbol
                  name={getStatusIcon(ticket.status) as any}
                  size={14}
                  color={getStatusColor(ticket.status)}
                />
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(ticket.status) }
                ]}>
                  {ticket.status.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.dateText}>
              Created: {formatDate(ticket.createdAt)}
            </Text>
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
            <Text style={styles.modalTitle}>Create New Ticket</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ticket Title"
              placeholderTextColor={colors.grey}
              value={newTicket.title}
              onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the issue..."
              placeholderTextColor={colors.grey}
              value={newTicket.description}
              onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
              multiline
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
                onPress={handleSubmitTicket}
              >
                <Text style={[styles.buttonText, styles.submitButtonText]}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
