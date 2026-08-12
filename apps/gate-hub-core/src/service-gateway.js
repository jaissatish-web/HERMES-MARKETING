import { query } from './db.js';

const registry = new Map();

export function registerServiceAdapter(name, adapter) {
  if (!name || typeof adapter?.execute !== 'function') throw new Error('Invalid service adapter');
  registry.set(name, adapter);
}

export function listRegisteredAdapters() {
  return [...registry.keys()];
}

export async function executeService({ serviceId, action, payload = {}, actorId }) {
  const result = await query('SELECT * FROM services WHERE id=$1', [serviceId]);
  const service = result.rows[0];
  if (!service) throw new Error('Service not found');

  const adapter = registry.get(service.name);
  if (!adapter) {
    return { status: 'unsupported', serviceId, action, message: 'No adapter is registered for this service yet.' };
  }

  if (!Array.isArray(service.allowed_actions) || !service.allowed_actions.includes(action)) {
    throw new Error('Action is not allowed for this service');
  }

  const output = await adapter.execute({ service, action, payload, actorId });
  return { status: 'completed', serviceId, action, output };
}

// Service adapters are deliberately external to GATE HUB core.
// This keeps providers interchangeable and lets us add research/content/social
// engines without changing authentication, budgets, permissions or audit code.
export function registerBuiltInAdapters() {
  registerServiceAdapter('Analytics', {
    async execute({ action }) {
      if (action === 'health') return { healthy: true };
      return { queued: true, action };
    }
  });
}
