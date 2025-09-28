
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockMessages, mockTenants } from '@/data/mockData';

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
  messageCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  messageTime: {
    fontSize: 12,
    color: colors.grey,
  },
  messageContent: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 8,
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

export default function LandlordMessagesScreen() {
  console.log('LandlordMessagesScreen rendered');

  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: '',
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReply = (messageId: string) => {
    console.log('Replying to message:', messageId);
    // In a real app, this would open a reply interface
  };

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    // In a real app, this would send the message
    setShowModal(false);
    setNewMessage({ recipient: '', subject: '', content: '' });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Messages',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockMessages.map((message) => (
          <View key={message.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <View style={styles.senderInfo}>
                {!message.read && <View style={styles.unreadIndicator} />}
                <IconSymbol name="person.circle" size={20} color={colors.primary} />
                <Text style={styles.senderName}>{message.senderName}</Text>
              </View>
              <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
            </View>

            <Text style={styles.messageContent}>{message.content}</Text>

            <View style={styles.messageActions}>
              <Pressable
                style={styles.actionButton}
                onPress={() => handleReply(message.id)}
              >
                <Text style={styles.actionButtonText}>Reply</Text>
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
            <Text style={styles.modalTitle}>New Message</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Recipient"
              placeholderTextColor={colors.grey}
              value={newMessage.recipient}
              onChangeText={(text) => setNewMessage({ ...newMessage, recipient: text })}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor={colors.grey}
              value={newMessage.subject}
              onChangeText={(text) => setNewMessage({ ...newMessage, subject: text })}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Message content..."
              placeholderTextColor={colors.grey}
              value={newMessage.content}
              onChangeText={(text) => setNewMessage({ ...newMessage, content: text })}
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
                onPress={handleSendMessage}
              >
                <Text style={[styles.buttonText, styles.submitButtonText]}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
