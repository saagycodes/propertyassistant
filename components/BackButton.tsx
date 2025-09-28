
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
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

const styles = StyleSheet.create({
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  accentButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accentDark,
  },
});

export default function BackButton({ 
  onPress, 
  color, 
  size = 22,
  style,
  variant = 'default'
}: BackButtonProps) {
  console.log('BackButton rendered with variant:', variant);

  const handlePress = () => {
    console.log('Back button pressed');
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'accent':
        return styles.accentButton;
      default:
        return {};
    }
  };

  const getIconColor = () => {
    if (color) return color;
    
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'accent':
        return '#ffffff';
      default:
        return colors.text;
    }
  };

  return (
    <Pressable 
      style={[styles.backButton, getButtonStyle(), style]} 
      onPress={handlePress}
    >
      <IconSymbol 
        name="chevron.left" 
        size={size} 
        color={getIconColor()} 
      />
    </Pressable>
  );
}
