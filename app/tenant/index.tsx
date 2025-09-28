
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockTenants, mockTickets, mockProperties, mockDocuments } from '@/data/mockData';

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
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  propertyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  propertyImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  roomNumber: {
    fontSize: 14,
    color: colors.grey,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.grey,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  rentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  rentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  rentAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  rentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  dueDate: {
    fontSize: 14,
    color: colors.grey,
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
    id: 'documents',
    title: 'Documents',
    description: 'Lease & agreements',
    icon: 'doc.text',
    route: '/tenant/documents',
    badge: 0,
  },
  {
    id: 'tickets',
    title: 'Support',
    description: 'Raise tickets',
    icon: 'exclamationmark.circle',
    route: '/tenant/tickets',
    badge: 0,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Chat with landlord',
    icon: 'message',
    route: '/tenant/messages',
    badge: 0,
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Account settings',
    icon: 'person.circle',
    route: '/tenant/profile',
    badge: 0,
  },
];

export default function TenantDashboard() {
  console.log('TenantDashboard rendered');

  // Using first tenant as current user
  const currentTenant = mockTenants[0];
  const currentProperty = mockProperties.find(prop => prop.id === currentTenant.propertyId);
  const myTickets = mockTickets.filter(ticket => ticket.tenantId === currentTenant.id);
  const myDocuments = mockDocuments.filter(doc => doc.tenantId === currentTenant.id);

  const getRentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.grey;
    }
  };

  const getRentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return 'checkmark.circle.fill';
      case 'pending': return 'clock.fill';
      case 'overdue': return 'exclamationmark.triangle.fill';
      default: return 'circle';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleMenuPress = (route: string) => {
    console.log('Menu pressed:', route);
    router.push(route as any);
  };

  const handlePayRent = () => {
    console.log('Pay rent pressed');
    router.push('/tenant/payment' as any);
  };

  // Update badge counts
  const updatedMenuItems = menuItems.map(item => {
    if (item.id === 'tickets') {
      return { ...item, badge: myTickets.length };
    }
    if (item.id === 'documents') {
      return { ...item, badge: myDocuments.length };
    }
    return item;
  });

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
                  Hello, {currentTenant.name.split(' ')[0]}!
                </Text>
                <Text style={styles.headerSubtitle}>
                  Welcome to your tenant portal
                </Text>
              </View>
              <Image 
                source={{ uri: currentTenant.profileImage }} 
                style={styles.profileImage}
              />
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

            {/* Quick Overview Section */}
            <View style={styles.quickOverview}>
              <Text style={styles.sectionTitle}>Your Residence</Text>
              
              <View style={styles.overviewCard}>
                <View style={styles.overviewHeader}>
                  <Text style={styles.overviewTitle}>Property Details</Text>
                </View>
                
                <View style={styles.propertyInfo}>
                  <Image 
                    source={{ uri: currentProperty?.imageUrl }} 
                    style={styles.propertyImage}
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyName}>{currentProperty?.name}</Text>
                    <Text style={styles.roomNumber}>Room {currentTenant.roomNumber}</Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>{currentProperty?.address}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Lease Start</Text>
                  <Text style={styles.infoValue}>{formatDate(currentTenant.leaseStartDate)}</Text>
                </View>

                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.infoLabel}>Lease End</Text>
                  <Text style={styles.infoValue}>{formatDate(currentTenant.leaseEndDate)}</Text>
                </View>
              </View>
            </View>

            {/* Rent Status Card */}
            <View style={styles.rentCard}>
              <View style={styles.rentHeader}>
                <Text style={styles.rentTitle}>Monthly Rent</Text>
                <Text style={styles.rentAmount}>${currentTenant.rentAmount}</Text>
              </View>

              <View style={styles.rentStatus}>
                <IconSymbol
                  name={getRentStatusIcon(currentTenant.rentStatus) as any}
                  size={20}
                  color={getRentStatusColor(currentTenant.rentStatus)}
                />
                <Text style={[
                  styles.statusText,
                  { color: getRentStatusColor(currentTenant.rentStatus) }
                ]}>
                  {currentTenant.rentStatus.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.dueDate}>
                Due: {formatDate(currentTenant.rentDueDate)}
              </Text>

              {currentTenant.rentStatus !== 'paid' && (
                <Pressable style={styles.payButton} onPress={handlePayRent}>
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </Pressable>
              )}
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
