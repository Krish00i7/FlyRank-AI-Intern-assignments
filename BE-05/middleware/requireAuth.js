import supabase from '../supabaseClient.js';

// Reusable guard: extracts + verifies the bearer token, attaches req.user, or rejects with 401.
export default async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Header missing, malformed, or no token present
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] === '') {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  // Ask Supabase whether the token is real
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = data.user;
  req.token = token;
  next();
}