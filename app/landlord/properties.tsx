
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.backgroundAlt,
  },
  propertyContent: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  propertyAddress: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
    marginTop: 2,
  },
  vacancyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  vacancyText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  rentAmount: {
    fontSize: 16,
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
    return 'exclamationmark.circle.fill';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Properties',
          headerRight: () => (
            <Pressable onPress={() => console.log('Add property')}>
              <IconSymbol name="plus" size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockProperties.map((property) => (
          <View key={property.id} style={styles.propertyCard}>
            <Image
              source={{ uri: property.imageUrl }}
              style={styles.propertyImage}
              resizeMode="cover"
            />
            <View style={styles.propertyContent}>
              <View style={styles.propertyHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.propertyName}>{property.name}</Text>
                  <Text style={styles.propertyAddress}>{property.address}</Text>
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
                <View style={styles.statItem}>
                  <Text style={styles.rentAmount}>${property.monthlyRent}</Text>
                  <Text style={styles.statLabel}>Monthly Rent</Text>
                </View>
              </View>

              <View style={[
                styles.vacancyIndicator,
                { backgroundColor: getVacancyColor(property.vacantRooms) + '20' }
              ]}>
                <IconSymbol
                  name={getVacancyIcon(property.vacantRooms) as any}
                  size={16}
                  color={getVacancyColor(property.vacantRooms)}
                />
                <Text style={[
                  styles.vacancyText,
                  { color: getVacancyColor(property.vacantRooms) }
                ]}>
                  {property.vacantRooms === 0 ? 'Fully Occupied' : `${property.vacantRooms} Vacant`}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
