
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockDocuments } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  documentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  documentType: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  documentDate: {
    fontSize: 12,
    color: colors.grey,
  },
  downloadButton: {
    padding: 8,
  },
});

export default function TenantDocumentsScreen() {
  console.log('TenantDocumentsScreen rendered');

  // Filter documents for current tenant (using first tenant as example)
  const myDocuments = mockDocuments.filter(doc => doc.tenantId === '1' || !doc.tenantId);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'lease': return 'doc.text';
      case 'tax': return 'doc.plaintext';
      case 'insurance': return 'shield.checkered';
      case 'maintenance': return 'wrench';
      default: return 'doc';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (documentId: string) => {
    console.log('Downloading document:', documentId);
    // In a real app, this would download the document
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Documents',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {myDocuments.map((document) => (
          <View key={document.id} style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <IconSymbol 
                name={getDocumentIcon(document.type) as any} 
                size={24} 
                color="#ffffff" 
              />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>{document.title}</Text>
              <Text style={styles.documentType}>{document.type.toUpperCase()}</Text>
              <Text style={styles.documentDate}>
                Uploaded: {formatDate(document.uploadDate)}
              </Text>
            </View>
            <Pressable
              style={styles.downloadButton}
              onPress={() => handleDownload(document.id)}
            >
              <IconSymbol name="arrow.down.circle" size={24} color={colors.primary} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
