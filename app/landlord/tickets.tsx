
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
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
  ticketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tenantInfo: {
    fontSize: 14,
    color: colors.grey,
  },
  propertyInfo: {
    fontSize: 14,
    color: colors.grey,
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
  escalateButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  escalateButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: colors.grey,
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

  const handleEscalate = (ticketId: string) => {
    console.log('Escalate ticket:', ticketId);
    // Here you would typically update the ticket status
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
          {mockTickets.map((ticket) => (
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

              <View style={styles.ticketMeta}>
                <Text style={styles.tenantInfo}>Tenant: {ticket.tenantName}</Text>
                <Text style={styles.propertyInfo}>{ticket.propertyName}</Text>
              </View>

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

                {ticket.status === 'open' && (
                  <Pressable 
                    style={styles.escalateButton}
                    onPress={() => handleEscalate(ticket.id)}
                  >
                    <Text style={styles.escalateButtonText}>Escalate</Text>
                  </Pressable>
                )}

                <Text style={styles.dateText}>
                  {formatDate(ticket.createdAt)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
