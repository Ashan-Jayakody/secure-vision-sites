# SecureView Backend API

This is a Node.js/Express backend for the SecureView gallery application.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file with:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/secureview?retryWrites=true&w=majority
PORT=3001
ADMIN_PASSWORD=secureview2024
JWT_SECRET=your-super-secret-jwt-key-change-this
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get single album
- `POST /api/albums` - Create album (auth required)
- `PUT /api/albums/:id` - Update album (auth required)
- `DELETE /api/albums/:id` - Delete album (auth required)

### Installations
- `POST /api/albums/:albumId/installations` - Add installation (auth required)
- `PUT /api/albums/:albumId/installations/:installationId` - Update installation (auth required)
- `DELETE /api/albums/:albumId/installations/:installationId` - Delete installation (auth required)

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to Settings > Upload > Upload presets
3. Create an unsigned upload preset
4. Use the cloud name and preset in the frontend configuration
