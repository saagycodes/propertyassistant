
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties } from '@/data/mockData';

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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
  propertyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  propertyHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 8,
  },
  propertyRent: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  propertyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  statText: {
    fontSize: 12,
    color: colors.grey,
  },
  vacancyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  vacancyText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default function AdminPropertiesScreen() {
  console.log('AdminPropertiesScreen rendered');

  const totalProperties = mockProperties.length;
  const totalRooms = mockProperties.reduce((sum, prop) => sum + prop.totalRooms, 0);
  const vacantRooms = mockProperties.reduce((sum, prop) => sum + prop.vacantRooms, 0);
  const occupiedRooms = mockProperties.reduce((sum, prop) => sum + prop.occupiedRooms, 0);

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
          title: 'Properties Overview',
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={commonStyles.header}>
          <BackButton />
          <Text style={commonStyles.headerTitle}>Properties</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalProperties}</Text>
              <Text style={styles.statLabel}>Properties</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{totalRooms}</Text>
              <Text style={styles.statLabel}>Total Rooms</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{occupiedRooms}</Text>
              <Text style={styles.statLabel}>Occupied</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{vacantRooms}</Text>
              <Text style={styles.statLabel}>Vacant</Text>
            </View>
          </View>

          {/* Properties List */}
          {mockProperties.map((property) => (
            <View key={property.id} style={styles.propertyCard}>
              <View style={styles.propertyHeader}>
                <Image 
                  source={{ uri: property.imageUrl }} 
                  style={styles.propertyImage}
                />
                <View style={styles.propertyInfo}>
                  <Text style={styles.propertyName}>{property.name}</Text>
                  <Text style={styles.propertyAddress}>{property.address}</Text>
                  <Text style={styles.propertyRent}>${property.monthlyRent}/month</Text>
                  
                  <View style={[
                    styles.vacancyBadge,
                    { backgroundColor: `${getVacancyColor(property.vacantRooms)}20` }
                  ]}>
                    <IconSymbol
                      name={getVacancyIcon(property.vacantRooms) as any}
                      size={12}
                      color={getVacancyColor(property.vacantRooms)}
                    />
                    <Text style={[
                      styles.vacancyText,
                      { color: getVacancyColor(property.vacantRooms) }
                    ]}>
                      {property.vacantRooms === 0 
                        ? 'Fully Occupied' 
                        : `${property.vacantRooms} Vacant`
                      }
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.propertyStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{property.totalRooms}</Text>
                  <Text style={styles.statText}>Total Rooms</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{property.occupiedRooms}</Text>
                  <Text style={styles.statText}>Occupied</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{property.vacantRooms}</Text>
                  <Text style={styles.statText}>Vacant</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>
                    {Math.round((property.occupiedRooms / property.totalRooms) * 100)}%
                  </Text>
                  <Text style={styles.statText}>Occupancy</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}
