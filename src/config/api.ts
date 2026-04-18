let baseUrl = import.meta.env.VITE_API_URL || '';

// Remove trailing slashes
baseUrl = baseUrl.replace(/\/+$/, '');

// If baseUrl is provided but doesn't end with /api, append it
if (baseUrl && !baseUrl.endsWith('/api')) {
  baseUrl = `${baseUrl}/api`;
} else if (!baseUrl) {
  // If no base URL is provided, fallback to /api assuming same origin
  baseUrl = '/api';
}

export const API_BASE_URL = baseUrl;
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dh3sza0e8';
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset';
