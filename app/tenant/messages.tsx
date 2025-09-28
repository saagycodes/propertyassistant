
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockMessages, mockTenants } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  senderRole: {
    fontSize: 12,
    color: colors.grey,
    textTransform: 'capitalize',
  },
  timestamp: {
    fontSize: 12,
    color: colors.grey,
  },
  messageContent: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.backgroundAlt,
  },
  actionButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: 4,
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
    boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.4)',
    elevation: 8,
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
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
  sendButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
});

export default function TenantMessagesScreen() {
  console.log('TenantMessagesScreen rendered');

  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Using first tenant as current user
  const currentTenant = mockTenants[0];
  
  // Filter messages for current tenant
  const tenantMessages = mockMessages.filter(
    message => message.senderId === currentTenant.id || message.receiverId === currentTenant.id
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const handleReply = (messageId: string) => {
    console.log('Reply to message:', messageId);
    setShowNewMessageModal(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      // Here you would typically send the message to your backend
      setNewMessage('');
      setShowNewMessageModal(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Messages',
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={commonStyles.header}>
          <BackButton />
          <Text style={commonStyles.headerTitle}>Messages</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {tenantMessages.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <IconSymbol name="message" size={40} color={colors.grey} />
              </View>
              <Text style={styles.emptyTitle}>No Messages</Text>
              <Text style={styles.emptyDescription}>
                Start a conversation with your landlord or admin
              </Text>
            </View>
          ) : (
            tenantMessages.map((message) => (
              <View key={message.id} style={styles.messageCard}>
                <View style={styles.messageHeader}>
                  <View style={styles.senderInfo}>
                    <Text style={styles.senderName}>{message.senderName}</Text>
                    <Text style={styles.senderRole}>{message.senderRole}</Text>
                  </View>
                  <Text style={styles.timestamp}>
                    {formatTime(message.timestamp)}
                  </Text>
                </View>

                <Text style={styles.messageContent}>{message.content}</Text>

                <View style={styles.messageActions}>
                  <Pressable 
                    style={styles.actionButton}
                    onPress={() => handleReply(message.id)}
                  >
                    <IconSymbol name="arrowshape.turn.up.left" size={16} color={colors.primary} />
                    <Text style={styles.actionButtonText}>Reply</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <Pressable 
          style={styles.fab}
          onPress={() => setShowNewMessageModal(true)}
        >
          <IconSymbol name="plus" size={24} color="#ffffff" />
        </Pressable>

        <Modal
          visible={showNewMessageModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowNewMessageModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>New Message</Text>
              
              <TextInput
                style={styles.input}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type your message here..."
                placeholderTextColor={colors.grey}
                multiline
                autoFocus
              />

              <View style={styles.modalButtons}>
                <Pressable 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowNewMessageModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
                
                <Pressable 
                  style={[styles.modalButton, styles.sendButton]}
                  onPress={handleSendMessage}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
