
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockIoTDevices, mockProperties } from '@/data/mockData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  deviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  offlineIcon: {
    backgroundColor: colors.grey,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  deviceLocation: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 2,
  },
  deviceValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deviceControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  controlButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: colors.grey,
  },
});

export default function IoTDevicesScreen() {
  console.log('IoTDevicesScreen rendered');

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'thermostat': return 'thermometer';
      case 'lock': return 'lock';
      case 'camera': return 'camera';
      case 'sensor': return 'sensor';
      case 'light': return 'lightbulb';
      default: return 'gear';
    }
  };

  const getPropertyName = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.name || 'Unknown Property';
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? colors.success : colors.error;
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? 'checkmark.circle.fill' : 'xmark.circle.fill';
  };

  const handleDeviceControl = (deviceId: string, action: string) => {
    console.log('Device control:', deviceId, action);
    // In a real app, this would send commands to the IoT device
  };

  const getDeviceLocation = (device: any) => {
    const propertyName = getPropertyName(device.propertyId);
    return device.roomNumber ? `${propertyName} - Room ${device.roomNumber}` : propertyName;
  };

  const getDeviceValue = (device: any) => {
    if (device.value && device.unit) {
      return `${device.value}${device.unit}`;
    }
    return device.value || 'N/A';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'IoT Devices',
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {mockIoTDevices.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <View style={[
                styles.deviceIcon,
                device.status === 'offline' && styles.offlineIcon
              ]}>
                <IconSymbol 
                  name={getDeviceIcon(device.type) as any} 
                  size={24} 
                  color="#ffffff" 
                />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceLocation}>{getDeviceLocation(device)}</Text>
                <Text style={styles.deviceValue}>{getDeviceValue(device)}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(device.status) + '20' }
              ]}>
                <IconSymbol
                  name={getStatusIcon(device.status) as any}
                  size={14}
                  color={getStatusColor(device.status)}
                />
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(device.status) }
                ]}>
                  {device.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.deviceControls}>
              <View />
              {device.status === 'online' && (
                <Pressable
                  style={styles.controlButton}
                  onPress={() => handleDeviceControl(device.id, 'toggle')}
                >
                  <Text style={styles.controlButtonText}>
                    {device.type === 'lock' ? 'Toggle Lock' : 
                     device.type === 'thermostat' ? 'Adjust' : 
                     device.type === 'light' ? 'Toggle' : 'Control'}
                  </Text>
                </Pressable>
              )}
              {device.status === 'offline' && (
                <Pressable
                  style={[styles.controlButton, styles.disabledButton]}
                  disabled
                >
                  <Text style={styles.controlButtonText}>Offline</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
