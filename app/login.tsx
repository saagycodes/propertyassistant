
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles, buttonStyles } from '@/styles/commonStyles';
import { mockUsers } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 160,
    height: 160,
    backgroundColor: colors.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    boxShadow: '0px 16px 40px rgba(59, 130, 246, 0.4)',
    elevation: 16,
    borderWidth: 4,
    borderColor: colors.primaryLight,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -2,
  },
  companyName: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -2,
  },
  tagline: {
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '500',
  },
  formContainer: {
    gap: 24,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: colors.primary,
    boxShadow: '0px 0px 0px 4px rgba(59, 130, 246, 0.15)',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 6px 20px rgba(59, 130, 246, 0.4)',
    elevation: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  demoContainer: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 28,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
    elevation: 6,
  },
  demoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  demoButton: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  landlordButton: {
    borderColor: colors.landlord,
    backgroundColor: colors.card,
  },
  tenantButton: {
    borderColor: colors.tenant,
    backgroundColor: colors.card,
  },
  adminButton: {
    borderColor: colors.admin,
    backgroundColor: colors.card,
  },
  demoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  demoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  landlordIcon: {
    backgroundColor: colors.landlord,
  },
  tenantIcon: {
    backgroundColor: colors.tenant,
  },
  adminIcon: {
    backgroundColor: colors.admin,
  },
  demoText: {
    flex: 1,
  },
  demoRole: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  demoEmail: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
});

const demoAccounts = [
  {
    role: 'landlord',
    name: 'Property Manager',
    email: 'manager@propertyassistant.com',
    icon: 'house.fill',
    route: '/landlord',
    color: colors.landlord,
  },
  {
    role: 'tenant',
    name: 'John Smith',
    email: 'john.smith@email.com',
    icon: 'person.fill',
    route: '/tenant',
    color: colors.tenant,
  },
  {
    role: 'admin',
    name: 'System Admin',
    email: 'admin@propertyassistant.com',
    icon: 'gear',
    route: '/admin',
    color: colors.admin,
  },
];

export default function LoginScreen() {
  console.log('LoginScreen rendered');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = () => {
    console.log('Login attempt:', email);
    
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      Alert.alert('Error', 'Invalid email or password');
      return;
    }

    // Simple password check (in real app, this would be properly hashed)
    if (password !== 'password123') {
      Alert.alert('Error', 'Invalid email or password');
      return;
    }

    console.log('Login successful for:', user.role);
    
    // Navigate based on role
    switch (user.role) {
      case 'landlord':
        router.replace('/landlord');
        break;
      case 'tenant':
        router.replace('/tenant');
        break;
      case 'admin':
        router.replace('/admin');
        break;
      default:
        Alert.alert('Error', 'Invalid user role');
    }
  };

  const handleDemoLogin = (route: string, email: string) => {
    console.log('Demo login:', route);
    setEmail(email);
    setPassword('password123');
    
    // Auto-login after a brief delay
    setTimeout(() => {
      router.replace(route as any);
    }, 500);
  };

  const getButtonStyle = (role: string) => {
    switch (role) {
      case 'landlord':
        return styles.landlordButton;
      case 'tenant':
        return styles.tenantButton;
      case 'admin':
        return styles.adminButton;
      default:
        return {};
    }
  };

  const getIconStyle = (role: string) => {
    switch (role) {
      case 'landlord':
        return styles.landlordIcon;
      case 'tenant':
        return styles.tenantIcon;
      case 'admin':
        return styles.adminIcon;
      default:
        return {};
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "PropertyAssistant - Smart Property Management",
          headerShown: false,
        }}
      />
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PA</Text>
            </View>
            <Text style={styles.companyName}>PropertyAssistant</Text>
            <Text style={styles.tagline}>"Manage your properties from your pocket"</Text>
            <Text style={styles.subtitle}>Smart Property Management Made Simple</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'email' && styles.inputFocused
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'password' && styles.inputFocused
                ]}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </Pressable>

          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Try Demo Accounts</Text>
            {demoAccounts.map((account) => (
              <Pressable
                key={account.role}
                style={[styles.demoButton, getButtonStyle(account.role)]}
                onPress={() => handleDemoLogin(account.route, account.email)}
              >
                <View style={styles.demoButtonContent}>
                  <View style={[styles.demoIcon, getIconStyle(account.role)]}>
                    <IconSymbol 
                      name={account.icon as any} 
                      size={28} 
                      color="#ffffff" 
                    />
                  </View>
                  <View style={styles.demoText}>
                    <Text style={styles.demoRole}>{account.name}</Text>
                    <Text style={styles.demoEmail}>{account.email}</Text>
                  </View>
                </View>
                <IconSymbol 
                  name="chevron.right" 
                  size={20} 
                  color={account.color} 
                />
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
