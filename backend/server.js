const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
// Cloud MongoDB URIs usually look like mongodb+srv://username:password@cluster...
// We need to encode the password part if it contains '@'
let encodedURI = mongoURI;
try {
  // If the URI contains more than one '@', the password likely contains an '@'
  if (mongoURI.includes('@') && mongoURI.indexOf('@') !== mongoURI.lastIndexOf('@')) {
    const protocolIndex = mongoURI.indexOf('://');
    const protocol = mongoURI.substring(0, protocolIndex + 3);
    const rest = mongoURI.substring(protocolIndex + 3);
    
    const lastAtToken = rest.lastIndexOf('@');
    const credentials = rest.substring(0, lastAtToken);
    const hostInfo = rest.substring(lastAtToken + 1);
    
    const colonIndex = credentials.indexOf(':');
    if (colonIndex !== -1) {
      const username = credentials.substring(0, colonIndex);
      const password = credentials.substring(colonIndex + 1);
      encodedURI = `${protocol}${username}:${encodeURIComponent(password)}@${hostInfo}`;
    }
  }
} catch (e) {
  console.error('Error encoding MongoDB URI:', e);
}

mongoose.connect(encodedURI)
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

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

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
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/albums/:id', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json({ message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/albums/:albumId/installations', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    album.installations.push(req.body);
    await album.save();
    res.status(201).json(album.installations[album.installations.length - 1]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/albums/:albumId/installations/:installationId', authenticateToken, async (req, res) => {
  try {
    const album = await Album.findById(req.params.albumId);
    if (!album) return res.status(404).json({ error: 'Album not found' });
    const installation = album.installations.id(req.params.installationId);
    if (!installation) return res.status(404).json({ error: 'Installation not found' });
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
    if (!album) return res.status(404).json({ error: 'Album not found' });
    album.installations.pull(req.params.installationId);
    await album.save();
    res.json({ message: 'Installation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Messages
app.post('/api/messages', async (req, res) => {
  try {
    // We add a default service if not provided since schema requires it
    const messageData = {
      ...req.body,
      service: req.body.service || 'Security Assessment'
    };
    const message = new Message(messageData);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/messages/:id', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: mongoose.connection.readyState === 1 });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
