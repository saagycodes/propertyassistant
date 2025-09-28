import React from "react";
import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: '0px 8px 24px rgba(37, 99, 235, 0.3)',
    elevation: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 60,
  },
  roleContainer: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
  },
  roleDescription: {
    fontSize: 16,
    color: colors.grey,
    lineHeight: 22,
  },
  chevron: {
    marginLeft: 12,
  },
});

const roles = [
  {
    id: 'landlord',
    title: 'Landlord',
    description: 'Manage properties, tenants, and view reports',
    icon: 'house',
    route: '/landlord',
  },
  {
    id: 'tenant',
    title: 'Tenant',
    description: 'View rent status, documents, and raise tickets',
    icon: 'person',
    route: '/tenant',
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Full system access and tenant management',
    icon: 'gear',
    route: '/admin',
  },
];

export default function HomeScreen() {
  console.log('HomeScreen rendered');

  const handleRoleSelect = (route: string) => {
    console.log('Role selected:', route);
    router.push(route as any);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Prop AI",
          headerShown: false,
        }}
      />
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PA</Text>
            </View>
            <Text style={styles.title}>Prop AI</Text>
            <Text style={styles.subtitle}>Property Management System</Text>
          </View>

          <View style={styles.roleContainer}>
            {roles.map((role) => (
              <Pressable
                key={role.id}
                style={styles.roleCard}
                onPress={() => handleRoleSelect(role.route)}
              >
                <View style={styles.roleHeader}>
                  <View style={styles.roleIcon}>
                    <IconSymbol 
                      name={role.icon as any} 
                      size={24} 
                      color="#ffffff" 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.roleDescription}>{role.description}</Text>
                  </View>
                  <View style={styles.chevron}>
                    <IconSymbol 
                      name="chevron.right" 
                      size={20} 
                      color={colors.grey} 
                    />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
