
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 4,
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
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default function TicketsScreen() {
  console.log('TicketsScreen rendered');

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

  const handleEscalate = (ticketId: string) => {
    console.log('Escalating ticket:', ticketId);
    // In a real app, this would update the ticket status
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Support Tickets',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockTickets.map((ticket) => (
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

            <View style={styles.ticketMeta}>
              <IconSymbol name="person.circle" size={16} color={colors.grey} />
              <Text style={styles.metaText}>{ticket.tenantName}</Text>
              <Text style={styles.metaText}> • </Text>
              <Text style={styles.metaText}>{ticket.propertyName}</Text>
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

              {ticket.status === 'open' && (
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleEscalate(ticket.id)}
                >
                  <Text style={styles.actionButtonText}>Escalate</Text>
                </Pressable>
              )}
            </View>

            <Text style={[styles.metaText, { marginTop: 8, fontSize: 12 }]}>
              Created: {formatDate(ticket.createdAt)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
