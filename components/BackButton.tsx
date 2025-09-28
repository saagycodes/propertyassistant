
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

interface BackButtonProps {
  onPress?: () => void;
  color?: string;
  size?: number;
  style?: any;
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
});

export default function BackButton({ 
  onPress, 
  color = colors.text, 
  size = 20,
  style 
}: BackButtonProps) {
  console.log('BackButton rendered');

  const handlePress = () => {
    console.log('Back button pressed');
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable 
      style={[styles.backButton, style]} 
      onPress={handlePress}
    >
      <IconSymbol 
        name="chevron.left" 
        size={size} 
        color={color} 
      />
    </Pressable>
  );
}
