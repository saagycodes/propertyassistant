
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockProperties, mockTickets, mockTenants } from '@/data/mockData';

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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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

  const totalProperties = mockProperties.length;
  const totalRooms = mockProperties.reduce((sum, prop) => sum + prop.totalRooms, 0);
  const vacantRooms = mockProperties.reduce((sum, prop) => sum + prop.vacantRooms, 0);
  const openTickets = mockTickets.filter(ticket => ticket.status === 'open').length;

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
            <Text style={styles.headerTitle}>Welcome Back!</Text>
            <Text style={styles.headerSubtitle}>Manage your properties efficiently</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
