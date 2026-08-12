const services = [
  { name: 'Research Engine', purpose: 'Public-web and market research', provider: 'Crawl4AI', model: '—', status: 'Online', mode: 'Execute within limits' },
  { name: 'Blog Writing', purpose: 'SEO articles and Gulf career guides', provider: 'Not configured', model: 'Not configured', status: 'Setup', mode: 'Approval required' },
  { name: 'Social Publishing', purpose: 'Schedule and publish approved social content', provider: 'Mixpost', model: '—', status: 'Online', mode: 'Approval required' },
  { name: 'Image Generation', purpose: 'Marketing images and thumbnails', provider: 'InvokeAI', model: 'Not configured', status: 'Setup', mode: 'Approval required' },
  { name: 'Analytics', purpose: 'Product, funnel and campaign analytics', provider: 'PostHog', model: '—', status: 'Online', mode: 'Execute within limits' }
];

const providers = [
  { name: 'OpenAI', purpose: 'General LLM tasks', models: ['Not configured'], status: 'Not configured', usage: '0%' },
  { name: 'Google', purpose: 'Research / multimodal options', models: ['Not configured'], status: 'Not configured', usage: '0%' },
  { name: 'Anthropic', purpose: 'Optional second-model routing', models: ['Not configured'], status: 'Not configured', usage: '0%' },
  { name: 'Crawl4AI', purpose: 'Research extraction engine', models: ['—'], status: 'Connected', usage: '18%' },
  { name: 'Mixpost', purpose: 'Social publishing', models: ['—'], status: 'Connected', usage: '7%' },
  { name: 'PostHog', purpose: 'Analytics', models: ['—'], status: 'Connected', usage: '12%' }
];

const approvals = [
  { title: 'Connect a production LLM provider', detail: 'Choose provider/model and add a credential. Production credentials must be entered through the secure deployment, not this static prototype.', risk: 'High' },
  { title: 'Enable autonomous Social Publishing', detail: 'Current recommendation: keep social publishing in approval-required mode until the content workflow is validated.', risk: 'Medium' },
  { title: 'Set the first monthly AI budget', detail: 'Founder input is required before external AI APIs are enabled.', risk: 'High' }
];

const budgets = [
  { name: 'LLM / Text', limit: 100, used: 0, unit: '$' },
  { name: 'Research', limit: 30, used: 4, unit: '$' },
  { name: 'Creative', limit: 50, used: 0, unit: '$' },
  { name: 'Social', limit: 20, used: 1, unit: '$' },
  { name: 'Total platform', limit: 200, used: 5, unit: '$' }
];

const health = [
  { name: 'GATE HUB UI', status: 'Healthy', detail: 'Prototype loaded locally' },
  { name: 'Research Engine', status: 'Healthy', detail: 'Mock health check: OK' },
  { name: 'Social Engine', status: 'Healthy', detail: 'Mock health check: OK' },
  { name: 'Analytics', status: 'Healthy', detail: 'Mock health check: OK' },
  { name: 'LLM providers', status: 'Not configured', detail: 'Add through production Service Registry' },
  { name: 'Secret vault', status: 'Not configured', detail: 'Production secure storage required' }
];

const permissions = [
  ['Research Engine', 'Read', 'Research', 'Execute', 'Publish'],
  ['Blog Writing', 'Read', 'Draft', 'Draft', 'Publish'],
  ['Social Publishing', 'Read', 'Draft', 'Schedule', 'Publish'],
  ['Image Generation', 'Read', 'Generate', 'Generate', 'Publish'],
  ['Analytics', 'Read', 'Read', 'Report', 'Change data']
];

const activity = [
  ['10:31', 'Founder', 'Opened GATE HUB prototype', 'info'],
  ['10:29', 'Research Engine', 'Completed mock health check', 'success'],
  ['10:20', 'System', 'Loaded service registry', 'success'],
  ['10:12', 'Founder', 'Viewed approval center', 'info']
];

const el = (id) => document.getElementById(id);

function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
  document.querySelectorAll('.nav-item').forEach(v => v.classList.remove('active'));
  el(view)?.classList.add('active-view');
  document.querySelector(`.nav-item[data-view="${view}"]`)?.classList.add('active');
  const title = document.querySelector(`.nav-item[data-view="${view}"]`)?.textContent || (view === 'overview' ? 'Overview' : view);
  el('pageTitle').textContent = title;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => navigate(button.dataset.view)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.go)));

function renderServices() {
  el('serviceSummary').innerHTML = services.slice(0, 5).map(s => `<div class="service-mini"><div><strong>${s.name}</strong><p>${s.purpose}</p></div><span class="badge ${s.status === 'Online' ? 'green' : 'amber'}">${s.status}</span></div>`).join('');
  el('serviceTable').innerHTML = services.map(s => `<tr><td><strong>${s.name}</strong></td><td>${s.purpose}</td><td>${s.provider}</td><td>${s.model}</td><td><span class="badge ${s.status === 'Online' ? 'green' : 'amber'}">${s.status}</span></td><td>${s.mode}</td><td><button class="text-button" data-service="${s.name}">Manage</button></td></tr>`).join('');
  document.querySelectorAll('[data-service]').forEach(b => b.addEventListener('click', () => openService(b.dataset.service)));
}

function renderProviders() {
  el('providerCards').innerHTML = providers.map(p => `<div class="service-card"><div class="panel-title"><h3>${p.name}</h3><span class="badge ${p.status === 'Connected' ? 'green' : 'amber'}">${p.status}</span></div><p>${p.purpose}</p><div class="muted">Models: ${p.models.join(', ')}</div><div style="margin-top:14px"><div class="panel-title"><span class="small">Configured usage</span><strong>${p.usage}</strong></div><div class="meter"><span style="width:${parseInt(p.usage)||0}%"></span></div></div><div class="form-actions" style="margin-top:15px"><button class="secondary">Test</button><button class="primary">Manage</button></div></div>`).join('');
}

function renderPermissions() {
  el('permissionTable').innerHTML = `<div class="permission-row permission-head"><span>Service</span><span>Read</span><span>Draft</span><span>Execute</span><span>Publish</span></div>` + permissions.map(row => `<div class="permission-row"><strong>${row[0]}</strong><span>✓ ${row[1]}</span><span>✓ ${row[2]}</span><span>✓ ${row[3]}</span><span>○ ${row[4]}</span></div>`).join('');
}

function renderApprovals() {
  el('approvalList').innerHTML = approvals.map((a, i) => `<div class="approval"><div><span class="eyebrow">Approval #${i+1} · ${a.risk} risk</span><h3>${a.title}</h3><p>${a.detail}</p></div><div class="approval-actions"><button class="secondary" data-reject="${i}">Reject</button><button class="primary" data-approve="${i}">Review</button></div></div>`).join('');
  document.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => alert('Prototype: approval review opened. Production version will show evidence, cost, permissions, and audit history.')));
  document.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => alert('Prototype: approval rejected and recorded in the audit log.')));
}

function renderBudgets() {
  el('budgetCards').innerHTML = budgets.map(b => { const pct = b.limit ? Math.round(b.used / b.limit * 100) : 0; return `<div class="service-card"><div class="panel-title"><h3>${b.name}</h3><strong>${b.unit}${b.used}</strong></div><p>Limit ${b.unit}${b.limit} / month</p><div class="meter"><span style="width:${pct}%"></span></div><p>${pct}% used</p></div>`; }).join('');
}

function renderHealth() {
  el('healthCards').innerHTML = health.map(h => `<div class="service-card"><div class="panel-title"><h3>${h.name}</h3><span class="badge ${h.status === 'Healthy' ? 'green' : 'amber'}">${h.status}</span></div><p>${h.detail}</p></div>`).join('');
}

function renderActivity() {
  el('activityList').innerHTML = activity.map(a => `<div class="activity-row"><span>${a[0]}</span><strong>${a[1]}</strong><span>${a[2]}</span><span class="badge ${a[3] === 'success' ? 'green' : 'amber'}">${a[3]}</span></div>`).join('');
}

function openService(name) { alert(`Prototype: managing “${name}”. Production UI will provide provider, model, credential reference, purpose, permissions, budget, approval mode, health and logs.`); }

const modal = el('modal');
function showModal() { modal.classList.remove('hidden'); }
function hideModal() { modal.classList.add('hidden'); }

el('newService').addEventListener('click', showModal);
el('closeModal').addEventListener('click', hideModal);
el('cancelModal').addEventListener('click', hideModal);
el('serviceForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  services.push({ name: data.name, purpose: data.purpose, provider: data.provider || 'Not configured', model: data.model || 'Not configured', status: 'Setup', mode: data.approval });
  renderServices();
  hideModal();
  event.target.reset();
  navigate('services');
});

el('newProvider').addEventListener('click', () => alert('Prototype: provider setup. Production version will store credentials through the secure server-side secret vault and never expose raw keys to the browser.'));
el('pauseAll').addEventListener('click', () => alert('Prototype emergency control: production version will require server-side permission and immediately disable autonomous external actions.'));

renderServices();
renderProviders();
renderPermissions();
renderApprovals();
renderBudgets();
renderHealth();
renderActivity();
