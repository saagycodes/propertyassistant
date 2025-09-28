
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
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
  weatherSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  weatherInfo: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  weatherDesc: {
    fontSize: 14,
    color: colors.grey,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: colors.grey,
    marginBottom: 4,
  },
  weatherDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
    id: 'tenants',
    title: 'Tenants',
    description: 'Manage tenant profiles',
    icon: 'person.2',
    route: '/admin/tenants',
    badge: 0,
  },
  {
    id: 'properties',
    title: 'Properties',
    description: 'Property overview',
    icon: 'house',
    route: '/admin/properties',
    badge: 0,
  },
  {
    id: 'tickets',
    title: 'Tickets',
    description: 'Handle support requests',
    icon: 'exclamationmark.circle',
    route: '/admin/tickets',
    badge: 0,
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Document backup',
    icon: 'doc.text',
    route: '/admin/documents',
    badge: 0,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Broadcast & chat',
    icon: 'message',
    route: '/admin/messages',
    badge: 0,
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Admin settings',
    icon: 'person.circle',
    route: '/admin/profile',
    badge: 0,
  },
];

export default function AdminDashboard() {
  console.log('AdminDashboard rendered');

  const admin = mockUsers.find(user => user.role === 'admin');
  const totalProperties = mockProperties.length;
  const totalTenants = mockTenants.length;
  const totalTickets = mockTickets.length;
  const pendingTickets = mockTickets.filter(ticket => ticket.status === 'open' || ticket.status === 'escalated').length;

  // Update badge counts
  const updatedMenuItems = menuItems.map(item => {
    if (item.id === 'tickets') {
      return { ...item, badge: pendingTickets };
    }
    if (item.id === 'tenants') {
      return { ...item, badge: totalTenants };
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
            <View style={styles.headerTop}>
              <BackButton color="#ffffff" />
              <View style={styles.greeting}>
                <Text style={styles.headerTitle}>
                  Welcome, {admin?.name.split(' ')[0] || 'Admin'}!
                </Text>
                <Text style={styles.headerSubtitle}>
                  System administration panel
                </Text>
              </View>
              <View style={styles.profileImage}>
                <IconSymbol name="person.fill" size={24} color={colors.primary} />
              </View>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Weather Section */}
            <View style={styles.weatherSection}>
              <View style={styles.weatherHeader}>
                <View style={styles.weatherIcon}>
                  <IconSymbol name="sun.max.fill" size={24} color="#ffffff" />
                </View>
                <View style={styles.weatherInfo}>
                  <Text style={styles.weatherTemp}>72°F</Text>
                  <Text style={styles.weatherDesc}>Sunny, Clear Sky</Text>
                </View>
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetail}>
                  <Text style={styles.weatherDetailLabel}>Humidity</Text>
                  <Text style={styles.weatherDetailValue}>45%</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <Text style={styles.weatherDetailLabel}>Wind</Text>
                  <Text style={styles.weatherDetailValue}>8 mph</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <Text style={styles.weatherDetailLabel}>UV Index</Text>
                  <Text style={styles.weatherDetailValue}>6</Text>
                </View>
              </View>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalProperties}</Text>
                <Text style={styles.statLabel}>Properties</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalTenants}</Text>
                <Text style={styles.statLabel}>Tenants</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{totalTickets}</Text>
                <Text style={styles.statLabel}>Total Tickets</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{pendingTickets}</Text>
                <Text style={styles.statLabel}>Pending</Text>
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
