
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Primary Brand Colors
  primary: '#3b82f6',      // Vibrant Blue
  primaryDark: '#1d4ed8',  // Darker Blue
  primaryLight: '#93c5fd', // Light Blue
  
  // Secondary Colors
  secondary: '#8b5cf6',    // Purple
  secondaryDark: '#7c3aed', // Dark Purple
  secondaryLight: '#c4b5fd', // Light Purple
  
  // Accent Colors
  accent: '#10b981',       // Emerald Green
  accentDark: '#059669',   // Dark Green
  accentLight: '#6ee7b7',  // Light Green
  
  // Status Colors
  success: '#22c55e',      // Green
  warning: '#f59e0b',      // Amber
  error: '#ef4444',        // Red
  info: '#06b6d4',         // Cyan
  
  // Neutral Colors
  background: '#ffffff',    // White background
  backgroundAlt: '#f8fafc', // Light grey background
  backgroundDark: '#1e293b', // Dark background
  text: '#1e293b',         // Dark text
  textLight: '#64748b',    // Light text
  textMuted: '#94a3b8',    // Muted text
  
  // Card and Surface Colors
  card: '#ffffff',         // White card
  cardAlt: '#f1f5f9',     // Light card
  surface: '#f8fafc',      // Surface color
  
  // Border and Divider Colors
  border: '#e2e8f0',       // Light border
  borderDark: '#cbd5e1',   // Darker border
  divider: '#f1f5f9',      // Divider color
  
  // Property Status Colors
  vacant: '#f59e0b',       // Orange for vacant
  occupied: '#22c55e',     // Green for occupied
  maintenance: '#ef4444',  // Red for maintenance
  
  // Rent Status Colors
  paid: '#22c55e',         // Green for paid
  pending: '#f59e0b',      // Orange for pending
  overdue: '#ef4444',      // Red for overdue
  
  // Priority Colors
  high: '#ef4444',         // Red for high priority
  medium: '#f59e0b',       // Orange for medium priority
  low: '#22c55e',          // Green for low priority
  
  // Role Colors
  landlord: '#3b82f6',     // Blue for landlord
  tenant: '#8b5cf6',       // Purple for tenant
  admin: '#10b981',        // Green for admin
};

export const gradients = {
  primary: ['#3b82f6', '#1d4ed8'],
  secondary: ['#8b5cf6', '#7c3aed'],
  accent: ['#10b981', '#059669'],
  sunset: ['#f59e0b', '#ef4444'],
  ocean: ['#06b6d4', '#3b82f6'],
  forest: ['#22c55e', '#10b981'],
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(59, 130, 246, 0.3)',
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(139, 92, 246, 0.3)',
    elevation: 3,
  },
  accentButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(16, 185, 129, 0.3)',
    elevation: 3,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    marginBottom: 6,
    lineHeight: 20,
  },
  textMuted: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    marginBottom: 4,
    lineHeight: 18,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    elevation: 4,
  },
  cardAlt: {
    backgroundColor: colors.cardAlt,
    borderColor: colors.borderDark,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  gradientCard: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
    elevation: 6,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.text,
  },
  iconSmall: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  iconMedium: {
    width: 32,
    height: 32,
    tintColor: colors.text,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeAccent: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  listItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  listItemAlt: {
    backgroundColor: colors.cardAlt,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderDark,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 16,
    width: '100%',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
