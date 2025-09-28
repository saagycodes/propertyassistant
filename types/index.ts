
export interface Property {
  id: string;
  name: string;
  address: string;
  totalRooms: number;
  vacantRooms: number;
  occupiedRooms: number;
  monthlyRent: number;
  imageUrl?: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  roomNumber: string;
  rentAmount: number;
  rentDueDate: string;
  rentStatus: 'paid' | 'pending' | 'overdue';
  leaseStartDate: string;
  leaseEndDate: string;
  profileImage?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  createdAt: string;
  updatedAt: string;
  category: 'maintenance' | 'complaint' | 'request' | 'emergency';
}

export interface Document {
  id: string;
  title: string;
  type: 'lease' | 'tax' | 'insurance' | 'maintenance' | 'other';
  url: string;
  uploadDate: string;
  propertyId?: string;
  tenantId?: string;
}

export interface IoTDevice {
  id: string;
  name: string;
  type: 'thermostat' | 'lock' | 'camera' | 'sensor' | 'light';
  status: 'online' | 'offline';
  propertyId: string;
  roomNumber?: string;
  value?: string | number;
  unit?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'landlord' | 'tenant' | 'admin';
  receiverId: string;
  receiverName: string;
  receiverRole: 'landlord' | 'tenant' | 'admin';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'landlord' | 'tenant' | 'admin';
  profileImage?: string;
}
