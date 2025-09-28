
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert, Image } from 'react-native';
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
    marginBottom: 40,
  },
  logo: {
    width: 140,
    height: 140,
    backgroundColor: colors.primary,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    boxShadow: '0px 12px 32px rgba(37, 99, 235, 0.4)',
    elevation: 12,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
  },
  companyName: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: '500',
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
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.primary,
    boxShadow: '0px 0px 0px 3px rgba(37, 99, 235, 0.1)',
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    boxShadow: '0px 4px 16px rgba(37, 99, 235, 0.3)',
    elevation: 6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  demoContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    padding: 24,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  demoButton: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  demoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  demoIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  demoText: {
    flex: 1,
  },
  demoRole: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
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
    icon: 'house.fill',
    route: '/landlord',
  },
  {
    role: 'tenant',
    name: 'John Smith',
    email: 'john.smith@email.com',
    icon: 'person.fill',
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

  return (
    <>
      <Stack.Screen
        options={{
          title: "PropAI - Property Management",
          headerShown: false,
        }}
      />
      <SafeAreaView style={commonStyles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>PA</Text>
            </View>
            <Text style={styles.companyName}>PropAI</Text>
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
                placeholderTextColor={colors.grey}
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
            <Text style={styles.demoTitle}>Try Demo Accounts</Text>
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
                      size={24} 
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
                  size={18} 
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
