
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  console.log('HomeScreen - redirecting to login');
  
  return <Redirect href="/login" />;
}
