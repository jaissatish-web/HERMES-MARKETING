import crypto from 'node:crypto';
import { query } from './db.js';

const SESSION_DAYS = Number(process.env.SESSION_DAYS || 7);
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'gate_hub_session';

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').filter(Boolean).map(pair => {
    const index = pair.indexOf('=');
    return [pair.slice(0, index).trim(), decodeURIComponent(pair.slice(index + 1).trim())];
  }));
}

function passwordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${derived}`;
}

function verifyPassword(password, encoded) {
  if (!encoded?.startsWith('scrypt:')) return false;
  const [, salt, expected] = encoded.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

export async function ensureFounder({ email, name, password }) {
  const result = await query('SELECT id, email, name, role FROM users WHERE lower(email) = lower($1)', [email]);
  if (result.rows[0]) return result.rows[0];
  if (!password) throw new Error('FOUNDER_PASSWORD is required for first-time setup');
  const created = await query(
    'INSERT INTO users(email, name, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id,email,name,role',
    [email.toLowerCase(), name, passwordHash(password), 'founder']
  );
  return created.rows[0];
}

export async function login(email, password) {
  const result = await query('SELECT id,email,name,password_hash,role,active FROM users WHERE lower(email)=lower($1)', [email]);
  const user = result.rows[0];
  if (!user?.active || !verifyPassword(password, user.password_hash)) return null;
  const token = crypto.randomBytes(48).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000);
  await query('INSERT INTO sessions(user_id, token_hash, expires_at) VALUES ($1,$2,$3)', [user.id, hashToken(token), expiresAt]);
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, cookie: buildCookie(token, expiresAt) };
}

function buildCookie(token, expiresAt) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}${secure}`;
}

export async function getUser(req) {
  const token = parseCookies(req.headers.cookie || '')[COOKIE_NAME];
  if (!token) return null;
  const result = await query(
    `SELECT u.id,u.email,u.name,u.role,u.active
       FROM sessions s JOIN users u ON u.id=s.user_id
      WHERE s.token_hash=$1 AND s.expires_at>NOW() AND u.active=true`,
    [hashToken(token)]
  );
  return result.rows[0] || null;
}

export function unauthorized(res) {
  res.writeHead(401, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify({ error: 'Authentication required' }));
}

export function requireRole(user, roles) {
  return !!user && roles.includes(user.role);
}

export { COOKIE_NAME };
