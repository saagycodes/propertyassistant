
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import BackButton from '@/components/BackButton';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockUsers } from '@/data/mockData';

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
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  profileName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastInfoRow: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 17,
    color: colors.text,
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: colors.error,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    boxShadow: '0px 4px 12px rgba(239, 68, 68, 0.3)',
    elevation: 4,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  weatherSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
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
});

export default function AdminProfileScreen() {
  console.log('AdminProfileScreen rendered');

  const admin = mockUsers.find(user => user.role === 'admin');

  const profileInfo = [
    { icon: 'envelope.fill', label: 'Email', value: admin?.email || 'admin@propai.com' },
    { icon: 'phone.fill', label: 'Phone', value: admin?.phone || '+1 (555) 000-0002' },
    { icon: 'location.fill', label: 'Location', value: 'New York, NY' },
    { icon: 'calendar', label: 'Member Since', value: 'January 2023' },
    { icon: 'building.2.fill', label: 'Properties Managed', value: '3 Properties' },
    { icon: 'person.2.fill', label: 'Total Tenants', value: '58 Tenants' },
  ];

  const menuItems = [
    { icon: 'gear', label: 'Account Settings', action: () => console.log('Settings') },
    { icon: 'bell.fill', label: 'Notifications', action: () => console.log('Notifications') },
    { icon: 'shield.fill', label: 'Privacy & Security', action: () => console.log('Privacy') },
    { icon: 'chart.bar.fill', label: 'Analytics', action: () => console.log('Analytics') },
    { icon: 'questionmark.circle.fill', label: 'Help & Support', action: () => console.log('Help') },
  ];

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            console.log('Admin signed out');
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin Profile',
          headerShown: false,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <BackButton color="#ffffff" />
            <View style={{ flex: 1 }} />
          </View>
          <View style={styles.profileImage}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.profileName}>{admin?.name || 'System Admin'}</Text>
          <Text style={styles.profileRole}>Administrator</Text>
        </View>

        <View style={styles.content}>
          {/* Weather Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Weather</Text>
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
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoCard}>
              {profileInfo.map((info, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.infoRow,
                    index === profileInfo.length - 1 && styles.lastInfoRow
                  ]}
                >
                  <View style={styles.infoIcon}>
                    <IconSymbol name={info.icon as any} size={20} color={colors.primary} />
                  </View>
                  <View style={styles.infoText}>
                    <Text style={styles.infoLabel}>{info.label}</Text>
                    <Text style={styles.infoValue}>{info.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {menuItems.map((item, index) => (
              <Pressable key={index} style={styles.menuItem} onPress={item.action}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
                  </View>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color={colors.grey} />
              </Pressable>
            ))}
          </View>

          {/* Sign Out Button */}
          <Pressable style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}
