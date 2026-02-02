// API configuration for backend connection
// Update this URL to point to your deployed backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Cloudinary configuration
// Create a free account at cloudinary.com and get these values
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset';
