import crypto from 'node:crypto';
import { query } from './db.js';

const KEY = process.env.GATE_HUB_SECRET_KEY;

function keyBytes() {
  if (!KEY) throw new Error('GATE_HUB_SECRET_KEY is required for credential storage');
  return crypto.createHash('sha256').update(KEY).digest();
}

export function encryptSecret(plaintext) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBytes(), iv);
  const encrypted = Buffer.concat([cipher.update(String(plaintext), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64url')}:${tag.toString('base64url')}:${encrypted.toString('base64url')}`;
}

export function decryptSecret(payload) {
  const [version, ivText, tagText, cipherText] = String(payload).split(':');
  if (version !== 'v1') throw new Error('Unsupported credential version');
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBytes(), Buffer.from(ivText, 'base64url'));
  decipher.setAuthTag(Buffer.from(tagText, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(cipherText, 'base64url')), decipher.final()]).toString('utf8');
}

export async function createCredential({ name, provider, secret, metadata = {} }) {
  if (!name || !provider || !secret) throw new Error('name, provider and secret are required');
  const encrypted = encryptSecret(secret);
  const result = await query(
    `INSERT INTO credentials(name, provider, encrypted_secret, metadata)
     VALUES ($1,$2,$3,$4) RETURNING id,name,provider,metadata,created_at,updated_at`,
    [name, provider, encrypted, metadata]
  );
  return result.rows[0];
}

export async function getCredentialSecret(id) {
  const result = await query('SELECT encrypted_secret FROM credentials WHERE id=$1', [id]);
  if (!result.rows[0]) throw new Error('Credential not found');
  return decryptSecret(result.rows[0].encrypted_secret);
}
