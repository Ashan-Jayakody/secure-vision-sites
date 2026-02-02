require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schemas
const installationSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Cloudinary URL
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  date: { type: String, required: true }
});

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  installations: [installationSchema],
  createdAt: { type: Date, default: Date.now }
});

const Album = mongoose.model('Album', albumSchema);

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true });
});

// Albums - Public
app.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/albums/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Albums - Protected
app.post('/api/albums', authenticateToken, async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/albums/:id', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description },
      { new: true }
    );
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/albums/:id', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Installations - Protected
app.post('/api/albums/:albumId/installations', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    album.installations.push(req.body);
    await album.save();
    
    const newInstallation = album.installations[album.installations.length - 1];
    res.status(201).json(newInstallation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/albums/:albumId/installations/:installationId', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    const installation = album.installations.id(req.params.installationId);
    if (!installation) {
      return res.status(404).json({ error: 'Installation not found' });
    }
    
    Object.assign(installation, req.body);
    await album.save();
    
    res.json(installation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/albums/:albumId/installations/:installationId', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    
    album.installations.pull(req.params.installationId);
    await album.save();
    
    res.json({ message: 'Installation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
