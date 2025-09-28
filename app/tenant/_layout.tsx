
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function TenantLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Tenant Dashboard',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="rent-status" 
        options={{ title: 'Rent Status' }} 
      />
      <Stack.Screen 
        name="documents" 
        options={{ title: 'My Documents' }} 
      />
      <Stack.Screen 
        name="tickets" 
        options={{ title: 'Support Tickets' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'Profile' }} 
      />
      <Stack.Screen 
        name="messages" 
        options={{ title: 'Messages' }} 
      />
      <Stack.Screen 
        name="payment" 
        options={{ title: 'Make Payment' }} 
      />
    </Stack>
  );
}
