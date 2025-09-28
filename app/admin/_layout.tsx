
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function AdminLayout() {
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
          title: 'Admin Dashboard',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="properties" 
        options={{ title: 'Properties' }} 
      />
      <Stack.Screen 
        name="tenants" 
        options={{ title: 'Tenant Management' }} 
      />
      <Stack.Screen 
        name="tickets" 
        options={{ title: 'All Tickets' }} 
      />
      <Stack.Screen 
        name="documents" 
        options={{ title: 'Document Archive' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'Profile' }} 
      />
      <Stack.Screen 
        name="messages" 
        options={{ title: 'Broadcast Messages' }} 
      />
    </Stack>
  );
}
