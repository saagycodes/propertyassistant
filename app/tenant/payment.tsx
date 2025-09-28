
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockTenants } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 20,
  },
  rentCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  rentHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rentAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  rentLabel: {
    fontSize: 16,
    color: colors.grey,
  },
  paymentMethods: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  methodCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedMethod: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  methodIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 14,
    color: colors.grey,
  },
  cardForm: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    backgroundColor: colors.card,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  payButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 12,
  },
  securityText: {
    fontSize: 14,
    color: colors.grey,
    marginLeft: 12,
    flex: 1,
  },
});

const paymentMethods = [
  {
    id: 'card',
    title: 'Credit/Debit Card',
    description: 'Pay with your card',
    icon: 'creditcard',
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: 'building.columns',
  },
  {
    id: 'digital',
    title: 'Digital Wallet',
    description: 'Apple Pay, Google Pay',
    icon: 'wallet.pass',
  },
];

export default function PaymentScreen() {
  console.log('PaymentScreen rendered');

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  // Using first tenant as current user
  const currentTenant = mockTenants[0];

  const handlePayment = () => {
    console.log('Processing payment:', { method: selectedMethod, amount: currentTenant.rentAmount });
    // In a real app, this would process the payment
    // For now, just navigate back
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Make Payment',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.rentCard}>
            <View style={styles.rentHeader}>
              <Text style={styles.rentAmount}>${currentTenant.rentAmount}</Text>
              <Text style={styles.rentLabel}>Monthly Rent Payment</Text>
            </View>
          </View>

          <View style={styles.paymentMethods}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentMethods.map((method) => (
              <Pressable
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && styles.selectedMethod
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodIcon}>
                  <IconSymbol name={method.icon as any} size={20} color="#ffffff" />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                  <Text style={styles.methodDescription}>{method.description}</Text>
                </View>
                {selectedMethod === method.id && (
                  <IconSymbol name="checkmark.circle.fill" size={24} color={colors.primary} />
                )}
              </Pressable>
            ))}
          </View>

          {selectedMethod === 'card' && (
            <View style={styles.cardForm}>
              <Text style={styles.sectionTitle}>Card Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                placeholderTextColor={colors.grey}
                value={cardForm.number}
                onChangeText={(text) => setCardForm({ ...cardForm, number: text })}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                placeholderTextColor={colors.grey}
                value={cardForm.name}
                onChangeText={(text) => setCardForm({ ...cardForm, name: text })}
              />
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="MM/YY"
                  placeholderTextColor={colors.grey}
                  value={cardForm.expiry}
                  onChangeText={(text) => setCardForm({ ...cardForm, expiry: text })}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.inputHalf]}
                  placeholder="CVV"
                  placeholderTextColor={colors.grey}
                  value={cardForm.cvv}
                  onChangeText={(text) => setCardForm({ ...cardForm, cvv: text })}
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>
          )}

          <Pressable style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pay ${currentTenant.rentAmount}</Text>
          </Pressable>

          <View style={styles.securityNote}>
            <IconSymbol name="lock.shield" size={20} color={colors.success} />
            <Text style={styles.securityText}>
              Your payment information is encrypted and secure. We never store your card details.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
