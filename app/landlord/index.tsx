
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties, mockTickets, mockTenants, mockUsers } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greeting: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  quickOverview: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  overviewCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  propertyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 4,
  },
  vacancyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vacancyText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '47%',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  menuIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

const menuItems = [
  {
    id: 'properties',
    title: 'Properties',
    description: 'Manage your properties',
    icon: 'house',
    route: '/landlord/properties',
    badge: 0,
  },
  {
    id: 'tickets',
    title: 'Tickets',
    description: 'Support requests',
    icon: 'exclamationmark.circle',
    route: '/landlord/tickets',
    badge: 0,
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Leases & contracts',
    icon: 'doc.text',
    route: '/landlord/documents',
    badge: 0,
  },
  {
    id: 'iot',
    title: 'IoT Devices',
    description: 'Smart home control',
    icon: 'homekit',
    route: '/landlord/iot',
    badge: 0,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Chat with tenants',
    icon: 'message',
    route: '/landlord/messages',
    badge: 0,
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Account settings',
    icon: 'person.circle',
    route: '/landlord/profile',
    badge: 0,
  },
];

export default function LandlordDashboard() {
  console.log('LandlordDashboard rendered');

  const landlord = mockUsers.find(user => user.role === 'landlord');
  const totalProperties = mockProperties.length;
  const totalRooms = mockProperties.reduce((sum, prop) => sum + prop.totalRooms, 0);
  const vacantRooms = mockProperties.reduce((sum, prop) => sum + prop.vacantRooms, 0);
  const openTickets = mockTickets.filter(ticket => ticket.status === 'open').length;

  // Get properties with vacancies first
  const propertiesWithVacancies = mockProperties
    .filter(prop => prop.vacantRooms > 0)
    .sort((a, b) => b.vacantRooms - a.vacantRooms);
  
  const otherProperties = mockProperties
    .filter(prop => prop.vacantRooms === 0)
    .slice(0, 2);

  const displayProperties = [...propertiesWithVacancies, ...otherProperties].slice(0, 3);

  // Update badge counts
  const updatedMenuItems = menuItems.map(item => {
    if (item.id === 'tickets') {
      return { ...item, badge: openTickets };
    }
    return item;
  });

  const handleMenuPress = (route: string) => {
    console.log('Menu pressed:', route);
    router.push(route as any);
  };

  const handleViewAllProperties = () => {
    console.log('View all properties pressed');
    router.push('/landlord/properties' as any);
  };

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
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <BackButton color="#ffffff" />
              <View style={styles.greeting}>
                <Text style={styles.headerTitle}>
                  Good morning, {landlord?.name.split(' ')[0] || 'Manager'}!
                </Text>
                <Text style={styles.headerSubtitle}>
                  Here&apos;s your property overview
                </Text>
              </View>
              <View style={styles.profileImage}>
                <IconSymbol name="person.fill" size={24} color={colors.primary} />
              </View>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Quick Overview Section */}
            <View style={styles.quickOverview}>
              <Text style={styles.sectionTitle}>Quick Overview</Text>
              
              <View style={styles.overviewCard}>
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>
                    Vacant Properties ({propertiesWithVacancies.length})
                  </Text>
                  <Pressable style={styles.viewAllButton} onPress={handleViewAllProperties}>
                    <Text style={styles.viewAllText}>View All</Text>
                    <IconSymbol name="chevron.right" size={14} color={colors.primary} />
                  </Pressable>
                </View>
                
                {displayProperties.map((property, index) => (
                  <View key={property.id} style={[
                    styles.propertyItem,
                    index === displayProperties.length - 1 && { borderBottomWidth: 0 }
                  ]}>
                    <Image 
                      source={{ uri: property.imageUrl }} 
                      style={styles.propertyImage}
                    />
                    <View style={styles.propertyInfo}>
                      <Text style={styles.propertyName}>{property.name}</Text>
                      <Text style={styles.propertyAddress}>{property.address}</Text>
                      <View style={styles.vacancyInfo}>
                        <IconSymbol
                          name={getVacancyIcon(property.vacantRooms) as any}
                          size={16}
                          color={getVacancyColor(property.vacantRooms)}
                        />
                        <Text style={[
                          styles.vacancyText,
                          { color: getVacancyColor(property.vacantRooms) }
                        ]}>
                          {property.vacantRooms === 0 
                            ? 'Fully Occupied' 
                            : `${property.vacantRooms} Vacant Room${property.vacantRooms > 1 ? 's' : ''}`
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

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
                <Text style={styles.statNumber}>{vacantRooms}</Text>
                <Text style={styles.statLabel}>Vacant</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{openTickets}</Text>
                <Text style={styles.statLabel}>Open Tickets</Text>
              </View>
            </View>

            {/* Menu Grid */}
            <View style={styles.menuGrid}>
              {updatedMenuItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={styles.menuIcon}>
                    <IconSymbol name={item.icon as any} size={24} color="#ffffff" />
                    {item.badge > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
