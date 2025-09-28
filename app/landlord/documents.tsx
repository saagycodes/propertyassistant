
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockDocuments, mockProperties } from '@/data/mockData';

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
  documentCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  documentMeta: {
    fontSize: 12,
    color: colors.grey,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  propertyTag: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  propertyText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
});

export default function LandlordDocumentsScreen() {
  console.log('LandlordDocumentsScreen rendered');

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'lease': return 'doc.text';
      case 'tax': return 'doc.plaintext';
      case 'insurance': return 'shield.checkered';
      case 'maintenance': return 'wrench';
      default: return 'doc';
    }
  };

  const getPropertyName = (propertyId?: string) => {
    if (!propertyId) return 'General';
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.name || 'Unknown Property';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = (documentId: string) => {
    console.log('Downloading document:', documentId);
    // In a real app, this would download the document
  };

  const handleShare = (documentId: string) => {
    console.log('Sharing document:', documentId);
    // In a real app, this would share the document
  };

  const handleUpload = () => {
    console.log('Upload new document');
    // In a real app, this would open document picker
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Documents',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockDocuments.map((document) => (
          <View key={document.id} style={styles.documentCard}>
            <View style={styles.documentHeader}>
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
                <Text style={styles.documentMeta}>
                  Uploaded: {formatDate(document.uploadDate)}
                </Text>
              </View>
            </View>

            <View style={styles.documentActions}>
              <View style={styles.propertyTag}>
                <Text style={styles.propertyText}>
                  {getPropertyName(document.propertyId)}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleShare(document.id)}
                >
                  <IconSymbol name="square.and.arrow.up" size={20} color={colors.primary} />
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleDownload(document.id)}
                >
                  <IconSymbol name="arrow.down.circle" size={20} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.fab} onPress={handleUpload}>
        <IconSymbol name="plus" size={24} color="#ffffff" />
      </Pressable>
    </>
  );
}
