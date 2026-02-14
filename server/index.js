import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connect } from './db.js';
import {
  addClothInward,
  addClothOutward,
  getClothInwards,
  getClothOutwards,
  getDashboardStats,
} from './data/store.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Auth: simple credential check (match frontend)
app.post('/api/auth/login', (req, res) => {
  const { userId, password } = req.body || {};
  if (userId === 'admin' && password === '1234') {
    return res.json({ success: true, token: 'auth-token-' + Date.now() });
  }
  return res.status(401).json({ success: false, message: 'Invalid User ID or Password' });
});

// Dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Cloth Inwards
app.get('/api/cloth-inwards', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const offset = parseInt(req.query.offset, 10) || 0;
    const result = await getClothInwards(limit, offset);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cloth-inwards', async (req, res) => {
  try {
    const { formData, items } = req.body || {};
    const record = {
      ...formData,
      items: items || [],
    };
    const created = await addClothInward(record);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Cloth Outwards
app.get('/api/cloth-outwards', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    const offset = parseInt(req.query.offset, 10) || 0;
    const result = await getClothOutwards(limit, offset);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cloth-outwards', async (req, res) => {
  try {
    const { formData, items } = req.body || {};
    const record = {
      ...formData,
      items: items || [],
    };
    const created = await addClothOutward(record);
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function start() {
  await connect();
  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
