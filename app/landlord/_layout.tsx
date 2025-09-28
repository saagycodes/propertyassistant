
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function LandlordLayout() {
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
          title: 'Landlord Dashboard',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="properties" 
        options={{ title: 'Properties' }} 
      />
      <Stack.Screen 
        name="tickets" 
        options={{ title: 'Tickets' }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ title: 'Profile' }} 
      />
      <Stack.Screen 
        name="documents" 
        options={{ title: 'Documents' }} 
      />
      <Stack.Screen 
        name="iot" 
        options={{ title: 'IoT Devices' }} 
      />
      <Stack.Screen 
        name="messages" 
        options={{ title: 'Messages' }} 
      />
    </Stack>
  );
}
