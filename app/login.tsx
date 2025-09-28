
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
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
  formContainer: {
    gap: 20,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  demoContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  demoButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  demoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  demoText: {
    flex: 1,
  },
  demoRole: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  demoEmail: {
    fontSize: 14,
    color: colors.grey,
  },
});

const demoAccounts = [
  {
    role: 'landlord',
    name: 'Property Manager',
    email: 'manager@propai.com',
    icon: 'house',
    route: '/landlord',
  },
  {
    role: 'tenant',
    name: 'John Smith',
    email: 'john.smith@email.com',
    icon: 'person',
    route: '/tenant',
  },
  {
    role: 'admin',
    name: 'System Admin',
    email: 'admin@propai.com',
    icon: 'gear',
    route: '/admin',
  },
];

export default function LoginScreen() {
  console.log('LoginScreen rendered');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <>
      <Stack.Screen
        options={{
          title: "Login - Prop AI",
          headerShown: false,
        }}
      />
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PA</Text>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={colors.grey}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.grey}
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
            <Text style={styles.demoTitle}>Demo Accounts</Text>
            {demoAccounts.map((account) => (
              <Pressable
                key={account.role}
                style={styles.demoButton}
                onPress={() => handleDemoLogin(account.route, account.email)}
              >
                <View style={styles.demoButtonContent}>
                  <View style={styles.demoIcon}>
                    <IconSymbol 
                      name={account.icon as any} 
                      size={20} 
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
                  size={16} 
                  color={colors.grey} 
                />
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
