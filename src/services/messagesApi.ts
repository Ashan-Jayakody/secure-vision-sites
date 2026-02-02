import { API_BASE_URL } from '@/config/api';
import { authFetch } from './authApi';

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
}

export const messagesApi = {
  send: async (message: Omit<Message, '_id' | 'createdAt'>): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }
    return response.json();
  },

  getAll: async (): Promise<Message[]> => {
    const response = await authFetch(`${API_BASE_URL}/messages`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch messages');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await authFetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete message');
    }
  },
};
