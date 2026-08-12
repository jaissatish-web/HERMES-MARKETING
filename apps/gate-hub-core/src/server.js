import http from 'node:http';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';

// First production slice: an API contract and in-memory store.
// Replace the store with PostgreSQL in the next slice; do not use this
// in-memory mode for production data.
const state = {
  services: [],
  providers: [],
  models: [],
  approvals: [],
  audit: [],
  budgets: { global: { limit: 0, used: 0, currency: 'USD' } },
  paused: false
};

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
    'cache-control': 'no-store'
  });
  res.end(payload);
}

function audit(action, detail = {}) {
  state.audit.unshift({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    actor: 'system',
    action,
    detail
  });
  state.audit = state.audit.slice(0, 500);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function routeKey(req) {
  return `${req.method} ${new URL(req.url, `http://${HOST}:${PORT}`).pathname}`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${HOST}:${PORT}`);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'access-control-allow-headers': 'content-type,authorization'
      });
      return res.end();
    }

    if (url.pathname === '/health') {
      return json(res, 200, { ok: true, service: 'gate-hub-core', paused: state.paused, now: new Date().toISOString() });
    }

    if (url.pathname === '/api/v1/status' && req.method === 'GET') {
      return json(res, 200, {
        ok: true,
        paused: state.paused,
        counts: {
          services: state.services.length,
          providers: state.providers.length,
          models: state.models.length,
          approvals: state.approvals.length,
          audit: state.audit.length
        }
      });
    }

    if (url.pathname === '/api/v1/services' && req.method === 'GET') {
      return json(res, 200, { data: state.services });
    }

    if (url.pathname === '/api/v1/services' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.name || !body.purpose) return json(res, 400, { error: 'name and purpose are required' });
      const service = {
        id: crypto.randomUUID(),
        name: String(body.name),
        purpose: String(body.purpose),
        category: String(body.category || 'Other'),
        providerId: body.providerId || null,
        modelId: body.modelId || null,
        credentialRef: body.credentialRef || null,
        allowedActions: Array.isArray(body.allowedActions) ? body.allowedActions : [],
        approvalMode: body.approvalMode || 'approval_required',
        budget: body.budget || null,
        status: 'setup',
        createdAt: new Date().toISOString()
      };
      state.services.push(service);
      audit('service.created', { serviceId: service.id, name: service.name });
      return json(res, 201, { data: service });
    }

    if (url.pathname === '/api/v1/providers' && req.method === 'GET') {
      return json(res, 200, { data: state.providers });
    }

    if (url.pathname === '/api/v1/providers' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.name || !body.purpose) return json(res, 400, { error: 'name and purpose are required' });
      const provider = {
        id: crypto.randomUUID(),
        name: String(body.name),
        purpose: String(body.purpose),
        credentialRef: body.credentialRef || null,
        status: 'not_configured',
        createdAt: new Date().toISOString()
      };
      state.providers.push(provider);
      audit('provider.created', { providerId: provider.id, name: provider.name });
      return json(res, 201, { data: provider });
    }

    if (url.pathname === '/api/v1/models' && req.method === 'GET') {
      return json(res, 200, { data: state.models });
    }

    if (url.pathname === '/api/v1/models' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.providerId || !body.name) return json(res, 400, { error: 'providerId and name are required' });
      const model = {
        id: crypto.randomUUID(),
        providerId: String(body.providerId),
        name: String(body.name),
        capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
        costMetadata: body.costMetadata || null,
        createdAt: new Date().toISOString()
      };
      state.models.push(model);
      audit('model.created', { modelId: model.id, name: model.name });
      return json(res, 201, { data: model });
    }

    if (url.pathname === '/api/v1/approvals' && req.method === 'GET') {
      return json(res, 200, { data: state.approvals });
    }

    if (url.pathname === '/api/v1/approvals' && req.method === 'POST') {
      const body = await readBody(req);
      if (!body.action || !body.risk) return json(res, 400, { error: 'action and risk are required' });
      const approval = {
        id: crypto.randomUUID(),
        action: String(body.action),
        reason: body.reason || '',
        evidence: body.evidence || [],
        estimatedCost: body.estimatedCost || null,
        risk: String(body.risk),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      state.approvals.push(approval);
      audit('approval.created', { approvalId: approval.id, risk: approval.risk });
      return json(res, 201, { data: approval });
    }

    if (url.pathname === '/api/v1/control/pause' && req.method === 'POST') {
      state.paused = true;
      audit('system.paused');
      return json(res, 200, { ok: true, paused: true });
    }

    if (url.pathname === '/api/v1/control/resume' && req.method === 'POST') {
      state.paused = false;
      audit('system.resumed');
      return json(res, 200, { ok: true, paused: false });
    }

    if (url.pathname === '/api/v1/audit' && req.method === 'GET') {
      return json(res, 200, { data: state.audit });
    }

    json(res, 404, { error: 'Route not found', route: routeKey(req) });
  } catch (error) {
    json(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`GATE HUB Core listening on http://${HOST}:${PORT}`);
  audit('server.started', { port: PORT });
});
