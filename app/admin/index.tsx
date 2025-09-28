
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: '47%',
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
    description: 'Manage all properties',
    icon: 'house',
    route: '/admin/properties',
    badge: 0,
  },
  {
    id: 'tenants',
    title: 'Tenants',
    description: 'Add/remove tenants',
    icon: 'person.2',
    route: '/admin/tenants',
    badge: 0,
  },
  {
    id: 'tickets',
    title: 'All Tickets',
    description: 'Handle support requests',
    icon: 'exclamationmark.circle',
    route: '/admin/tickets',
    badge: 0,
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Document archive',
    icon: 'doc.text',
    route: '/admin/documents',
    badge: 0,
  },
  {
    id: 'messages',
    title: 'Broadcast',
    description: 'Send messages',
    icon: 'megaphone',
    route: '/admin/messages',
    badge: 0,
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Account settings',
    icon: 'person.circle',
    route: '/admin/profile',
    badge: 0,
  },
];

export default function AdminDashboard() {
  console.log('AdminDashboard rendered');

  const totalProperties = mockProperties.length;
  const totalTenants = mockTenants.length;
  const totalRooms = mockProperties.reduce((sum, prop) => sum + prop.totalRooms, 0);
  const vacantRooms = mockProperties.reduce((sum, prop) => sum + prop.vacantRooms, 0);
  const allTickets = mockTickets.length;
  const openTickets = mockTickets.filter(ticket => ticket.status === 'open').length;
  const overdueRent = mockTenants.filter(tenant => tenant.rentStatus === 'overdue').length;

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
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>System overview and management</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalProperties}</Text>
                <Text style={styles.statLabel}>Properties</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalTenants}</Text>
                <Text style={styles.statLabel}>Active Tenants</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{vacantRooms}</Text>
                <Text style={styles.statLabel}>Vacant Rooms</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{openTickets}</Text>
                <Text style={styles.statLabel}>Open Tickets</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{overdueRent}</Text>
                <Text style={styles.statLabel}>Overdue Rent</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{allTickets}</Text>
                <Text style={styles.statLabel}>Total Tickets</Text>
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
