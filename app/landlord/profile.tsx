
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.backgroundAlt,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
});

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');

  const profileInfo = [
    { icon: 'envelope', label: 'Email', value: 'manager@propai.com' },
    { icon: 'phone', label: 'Phone', value: '+1 (555) 000-0001' },
    { icon: 'location', label: 'Location', value: 'New York, NY' },
    { icon: 'calendar', label: 'Member Since', value: 'January 2023' },
  ];

  const menuItems = [
    { icon: 'gear', label: 'Account Settings', action: () => console.log('Settings') },
    { icon: 'bell', label: 'Notifications', action: () => console.log('Notifications') },
    { icon: 'shield', label: 'Privacy & Security', action: () => console.log('Privacy') },
    { icon: 'questionmark.circle', label: 'Help & Support', action: () => console.log('Help') },
    { icon: 'arrow.right.square', label: 'Sign Out', action: () => console.log('Sign Out') },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.grey} />
          </View>
          <Text style={styles.profileName}>Property Manager</Text>
          <Text style={styles.profileRole}>Landlord</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.infoCard}>
              {profileInfo.map((info, index) => (
                <View key={index} style={styles.infoRow}>
                  <IconSymbol name={info.icon as any} size={20} color={colors.primary} />
                  <Text style={styles.infoLabel}>{info.label}</Text>
                  <Text style={styles.infoValue}>{info.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {menuItems.map((item, index) => (
              <Pressable key={index} style={styles.menuItem} onPress={item.action}>
                <View style={styles.menuItemLeft}>
                  <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.grey} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
