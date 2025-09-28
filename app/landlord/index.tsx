
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles, gradients } from '@/styles/commonStyles';
import { mockProperties, mockTickets, mockTenants, mockUsers } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.landlord,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    boxShadow: '0px 8px 24px rgba(59, 130, 246, 0.3)',
    elevation: 8,
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
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  weatherSection: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.info,
    marginBottom: 24,
    boxShadow: '0px 6px 16px rgba(6, 182, 212, 0.15)',
    elevation: 6,
  },
  weatherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherIcon: {
    width: 56,
    height: 56,
    backgroundColor: colors.info,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  weatherInfo: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
  },
  weatherDesc: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 6,
    fontWeight: '600',
  },
  weatherDetailValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  newsSection: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.accent,
    marginBottom: 24,
    boxShadow: '0px 6px 16px rgba(16, 185, 129, 0.15)',
    elevation: 6,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  newsIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.accent,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  lastNewsItem: {
    borderBottomWidth: 0,
  },
  newsItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
    lineHeight: 22,
  },
  newsItemSource: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
  },
  quickOverview: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  overviewCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    boxShadow: '0px 6px 16px rgba(139, 92, 246, 0.15)',
    elevation: 6,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
    marginRight: 6,
  },
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  propertyImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: colors.backgroundAlt,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  propertyAddress: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  vacancyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vacancyText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    flex: 1,
    borderWidth: 2,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  propertiesCard: {
    borderColor: colors.primary,
  },
  roomsCard: {
    borderColor: colors.secondary,
  },
  vacantCard: {
    borderColor: colors.warning,
  },
  ticketsCard: {
    borderColor: colors.error,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '600',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 40,
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '47%',
    borderWidth: 2,
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  propertiesMenu: {
    borderColor: colors.primary,
  },
  ticketsMenu: {
    borderColor: colors.error,
  },
  documentsMenu: {
    borderColor: colors.accent,
  },
  iotMenu: {
    borderColor: colors.secondary,
  },
  messagesMenu: {
    borderColor: colors.info,
  },
  profileMenu: {
    borderColor: colors.warning,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  menuDescription: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
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
    color: colors.primary,
    style: 'propertiesMenu',
  },
  {
    id: 'tickets',
    title: 'Tickets',
    description: 'Support requests',
    icon: 'exclamationmark.circle',
    route: '/landlord/tickets',
    badge: 0,
    color: colors.error,
    style: 'ticketsMenu',
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Leases & contracts',
    icon: 'doc.text',
    route: '/landlord/documents',
    badge: 0,
    color: colors.accent,
    style: 'documentsMenu',
  },
  {
    id: 'iot',
    title: 'IoT Devices',
    description: 'Smart home control',
    icon: 'homekit',
    route: '/landlord/iot',
    badge: 0,
    color: colors.secondary,
    style: 'iotMenu',
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Chat with tenants',
    icon: 'message',
    route: '/landlord/messages',
    badge: 0,
    color: colors.info,
    style: 'messagesMenu',
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Account settings',
    icon: 'person.circle',
    route: '/landlord/profile',
    badge: 0,
    color: colors.warning,
    style: 'profileMenu',
  },
];

const realEstateNews = [
  {
    title: 'Housing Market Shows Strong Growth in Q1 2024',
    source: 'Real Estate Weekly',
  },
  {
    title: 'New Rental Regulations Take Effect Next Month',
    source: 'Property Management Today',
  },
  {
    title: 'Smart Home Technology Increases Property Values',
    source: 'Tech Property News',
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

  const getStatCardStyle = (index: number) => {
    switch (index) {
      case 0: return styles.propertiesCard;
      case 1: return styles.roomsCard;
      case 2: return styles.vacantCard;
      case 3: return styles.ticketsCard;
      default: return {};
    }
  };

  const getStatColor = (index: number) => {
    switch (index) {
      case 0: return colors.primary;
      case 1: return colors.secondary;
      case 2: return colors.warning;
      case 3: return colors.error;
      default: return colors.text;
    }
  };

  const getMenuItemStyle = (item: any) => {
    return styles[item.style as keyof typeof styles] || {};
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
              <BackButton color="#ffffff" variant="primary" />
              <View style={styles.greeting}>
                <Text style={styles.headerTitle}>
                  Good morning, {landlord?.name.split(' ')[0] || 'Manager'}!
                </Text>
                <Text style={styles.headerSubtitle}>
                  Here&apos;s your property overview
                </Text>
              </View>
              <View style={styles.profileImage}>
                <IconSymbol name="person.fill" size={28} color={colors.landlord} />
              </View>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Weather Section */}
            <View style={styles.weatherSection}>
              <View style={styles.weatherHeader}>
                <View style={styles.weatherIcon}>
                  <IconSymbol name="sun.max.fill" size={28} color="#ffffff" />
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

            {/* Real Estate News Section */}
            <View style={styles.newsSection}>
              <View style={styles.newsHeader}>
                <Text style={styles.newsTitle}>Real Estate News</Text>
                <View style={styles.newsIcon}>
                  <IconSymbol name="newspaper.fill" size={20} color="#ffffff" />
                </View>
              </View>
              {realEstateNews.map((news, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.newsItem,
                    index === realEstateNews.length - 1 && styles.lastNewsItem
                  ]}
                >
                  <Text style={styles.newsItemTitle}>{news.title}</Text>
                  <Text style={styles.newsItemSource}>{news.source}</Text>
                </View>
              ))}
            </View>

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
                    <IconSymbol name="chevron.right" size={16} color="#ffffff" />
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
                          size={18}
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
              {[
                { value: totalProperties, label: 'Properties' },
                { value: totalRooms, label: 'Total Rooms' },
                { value: vacantRooms, label: 'Vacant' },
                { value: openTickets, label: 'Open Tickets' }
              ].map((stat, index) => (
                <View key={index} style={[styles.statCard, getStatCardStyle(index)]}>
                  <Text style={[styles.statNumber, { color: getStatColor(index) }]}>
                    {stat.value}
                  </Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Menu Grid */}
            <View style={styles.menuGrid}>
              {updatedMenuItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={[styles.menuItem, getMenuItemStyle(item)]}
                  onPress={() => handleMenuPress(item.route)}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                    <IconSymbol name={item.icon as any} size={28} color="#ffffff" />
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
