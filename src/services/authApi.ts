import { API_BASE_URL } from '@/config/api';

const TOKEN_KEY = 'secureview_admin_token';

export const authApi = {
  login: async (password: string): Promise<{ token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  isAuthenticated: async (): Promise<boolean> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};

// Helper for authenticated requests
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = authApi.getToken();
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};
