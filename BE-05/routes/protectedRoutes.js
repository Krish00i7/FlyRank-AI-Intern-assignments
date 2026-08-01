import express from 'express';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// GET /protected/profile
router.get('/profile', requireAuth, (req, res) => {
  const { id, email, created_at } = req.user;
  res.status(200).json({ id, email, created_at });
});

// GET /protected/dashboard — proves the middleware is reusable, no new auth code
router.get('/dashboard', requireAuth, (req, res) => {
  res.status(200).json({ message: `Welcome to your dashboard, ${req.user.email}` });
});

export default router;