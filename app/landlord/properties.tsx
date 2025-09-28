
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { mockProperties } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
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
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.backgroundAlt,
  },
  propertyContent: {
    padding: 20,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 16,
    color: colors.grey,
    marginBottom: 16,
  },
  vacancyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vacancyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
  },
  rentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  rentLabel: {
    fontSize: 14,
    color: colors.grey,
  },
  rentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.success,
  },
});

export default function PropertiesScreen() {
  console.log('PropertiesScreen rendered');

  const getVacancyColor = (vacantRooms: number) => {
    if (vacantRooms === 0) return colors.success;
    if (vacantRooms <= 2) return colors.warning;
    return colors.error;
  };

  const getVacancyIcon = (vacantRooms: number) => {
    if (vacantRooms === 0) return 'checkmark.circle.fill';
    if (vacantRooms <= 2) return 'exclamationmark.triangle.fill';
    return 'exclamationmark.circle.fill';
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
          <Text style={styles.headerTitle}>Properties</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {mockProperties.map((property) => (
            <View key={property.id} style={styles.propertyCard}>
              <Image 
                source={{ uri: property.imageUrl }} 
                style={styles.propertyImage}
              />
              
              <View style={styles.propertyContent}>
                <View style={styles.propertyHeader}>
                  <View style={styles.propertyInfo}>
                    <Text style={styles.propertyName}>{property.name}</Text>
                    <Text style={styles.propertyAddress}>{property.address}</Text>
                  </View>
                  
                  <View style={[
                    styles.vacancyBadge,
                    { backgroundColor: getVacancyColor(property.vacantRooms) + '20' }
                  ]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconSymbol
                        name={getVacancyIcon(property.vacantRooms) as any}
                        size={12}
                        color={getVacancyColor(property.vacantRooms)}
                      />
                      <Text style={[
                        styles.vacancyText,
                        { color: getVacancyColor(property.vacantRooms), marginLeft: 4 }
                      ]}>
                        {property.vacantRooms === 0 ? 'Full' : `${property.vacantRooms} Vacant`}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{property.totalRooms}</Text>
                    <Text style={styles.statLabel}>Total Rooms</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{property.occupiedRooms}</Text>
                    <Text style={styles.statLabel}>Occupied</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{property.vacantRooms}</Text>
                    <Text style={styles.statLabel}>Vacant</Text>
                  </View>
                </View>

                <View style={styles.rentInfo}>
                  <Text style={styles.rentLabel}>Monthly Rent</Text>
                  <Text style={styles.rentAmount}>${property.monthlyRent}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
