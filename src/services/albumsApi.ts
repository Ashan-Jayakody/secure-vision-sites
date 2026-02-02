import { API_BASE_URL } from '@/config/api';
import { authFetch } from './authApi';

export interface Installation {
  _id?: string;
  id?: string;
  image: string;
  title: string;
  category: string;
  description?: string;
  date: string;
}

export interface Album {
  _id: string;
  name: string;
  description: string;
  installations: Installation[];
  createdAt: string;
}

export const albumsApi = {
  // Public endpoints
  getAll: async (): Promise<Album[]> => {
    const response = await fetch(`${API_BASE_URL}/albums`);
    if (!response.ok) throw new Error('Failed to fetch albums');
    return response.json();
  },
  
  getById: async (id: string): Promise<Album> => {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`);
    if (!response.ok) throw new Error('Failed to fetch album');
    return response.json();
  },
  
  // Protected endpoints
  create: async (album: { name: string; description: string; installations?: Installation[] }): Promise<Album> => {
    const response = await authFetch(`${API_BASE_URL}/albums`, {
      method: 'POST',
      body: JSON.stringify(album),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create album');
    }
    return response.json();
  },
  
  update: async (id: string, updates: { name?: string; description?: string }): Promise<Album> => {
    const response = await authFetch(`${API_BASE_URL}/albums/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update album');
    }
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await authFetch(`${API_BASE_URL}/albums/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete album');
    }
  },
  
  // Installation endpoints
  addInstallation: async (albumId: string, installation: Omit<Installation, '_id' | 'id'>): Promise<Installation> => {
    const response = await authFetch(`${API_BASE_URL}/albums/${albumId}/installations`, {
      method: 'POST',
      body: JSON.stringify(installation),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add installation');
    }
    return response.json();
  },
  
  updateInstallation: async (
    albumId: string,
    installationId: string,
    updates: Partial<Installation>
  ): Promise<Installation> => {
    const response = await authFetch(`${API_BASE_URL}/albums/${albumId}/installations/${installationId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update installation');
    }
    return response.json();
  },
  
  deleteInstallation: async (albumId: string, installationId: string): Promise<void> => {
    const response = await authFetch(`${API_BASE_URL}/albums/${albumId}/installations/${installationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete installation');
    }
  },
};
