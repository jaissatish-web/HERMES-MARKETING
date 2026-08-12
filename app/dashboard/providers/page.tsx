'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase-browser';

type Provider = {
  id: string;
  name: string;
  kind: string;
  website: string | null;
  status: string;
  purpose: string;
  created_at: string;
};

const providerTypes = ['AI / LLM', 'Image', 'Video', 'Search / Research', 'Analytics', 'Social', 'Email', 'Other'];

function statusLabel(status: string) {
  if (status === 'active') return 'Enabled';
  if (status === 'archived') return 'Archived';
  if (status === 'disabled') return 'Disabled';
  return 'Not configured';
}

export default function ProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Provider | null>(null);
  const [form, setForm] = useState({ name: '', kind: 'AI / LLM', website: '', purpose: '', status: 'active' });

  const supabase = getSupabaseBrowserClient();

  async function loadProviders() {
    if (!supabase) { setError('Supabase is not configured.'); setLoading(false); return; }
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) { router.replace('/login'); return; }
    const { data, error: queryError } = await supabase
      .from('providers')
      .select('id,name,kind,website,status,purpose,created_at')
      .order('created_at', { ascending: false });
    if (queryError) setError(queryError.message);
    setProviders((data as Provider[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { loadProviders(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return providers;
    return providers.filter(p => `${p.name} ${p.kind} ${p.purpose}`.toLowerCase().includes(q));
  }, [providers, search]);

  function openCreate() {
    setEditing(null);
    setForm({ name: '', kind: 'AI / LLM', website: '', purpose: '', status: 'active' });
    setError('');
    setShowForm(true);
  }

  function openEdit(provider: Provider) {
    setEditing(provider);
    setForm({ name: provider.name, kind: provider.kind, website: provider.website ?? '', purpose: provider.purpose, status: provider.status === 'archived' ? 'disabled' : provider.status });
    setError('');
    setShowForm(true);
  }

  async function saveProvider(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    if (!form.name.trim() || !form.purpose.trim()) { setError('Add a provider name and explain what it is used for.'); return; }
    setSaving(true); setError('');
    const payload = { name: form.name.trim(), kind: form.kind, website: form.website.trim() || null, purpose: form.purpose.trim(), status: form.status };
    const result = editing
      ? await supabase.from('providers').update(payload).eq('id', editing.id)
      : await supabase.from('providers').insert(payload);
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    setShowForm(false);
    await loadProviders();
  }

  async function toggleProvider(provider: Provider) {
    if (!supabase) return;
    const next = provider.status === 'active' ? 'disabled' : 'active';
    const { error: updateError } = await supabase.from('providers').update({ status: next }).eq('id', provider.id);
    if (updateError) { setError(updateError.message); return; }
    await loadProviders();
  }

  async function archiveProvider(provider: Provider) {
    if (!supabase) return;
    const { count, error: countError } = await supabase.from('services').select('id', { count: 'exact', head: true }).eq('provider_id', provider.id);
    if (countError) { setError(countError.message); return; }
    if ((count ?? 0) > 0) { setError('This provider is still linked to a service. Disconnect the service first; GATE HUB will not silently break an active relationship.'); return; }
    if (!window.confirm(`Archive ${provider.name}? This keeps the record for audit/history.`)) return;
    const { error: archiveError } = await supabase.from('providers').update({ status: 'archived' }).eq('id', provider.id);
    if (archiveError) { setError(archiveError.message); return; }
    await loadProviders();
  }

  async function signOut() {
    await supabase?.auth.signOut();
    router.replace('/login');
  }

  if (loading) return <main className="center"><div className="loadingCard"><div className="logoMark">GH</div><span>Loading Provider Manager…</span></div></main>;

  return (
    <main className="appShell">
      <aside className="sidebar">
        <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
        <div className="workspace"><span className="workspaceDot" /> Founder workspace <b>ADMIN</b></div>
        <nav>
          <button onClick={() => router.push('/dashboard')}><span>⌂</span>Overview</button>
          <button onClick={() => router.push('/dashboard')}><span>▦</span>Services</button>
          <button className="active"><span>◈</span>Providers & Models</button>
          <button><span>◇</span>Credentials</button>
          <button><span>✓</span>Approvals</button>
          <button><span>◷</span>Budgets</button>
          <button><span>↗</span>Jobs</button>
          <button><span>≡</span>Audit</button>
        </nav>
        <div className="sidebarBottom"><div className="connection"><i /> Supabase connected</div><button className="logout" onClick={signOut}>↪ <span>Sign out</span></button></div>
      </aside>

      <section className="mainArea">
        <header className="topbar"><div className="crumb"><span>GATE HUB</span><b>/</b> Provider Manager</div><div className="topActions"><span className="livePill"><i /> SECURE</span></div></header>
        <div className="page">
          <div className="pageIntro">
            <div><p className="eyebrow">AI STACK CONTROL</p><h1>Provider Manager</h1><p className="muted">Manage the companies that supply the services inside GATE HUB.</p></div>
            <div className="introActions"><button className="secondary" onClick={() => router.push('/dashboard')}>Back to control center</button><button className="primary compactButton" onClick={openCreate}>+ Add provider</button></div>
          </div>

          <section className="metricGrid">
            <div className="metricCard featured"><span>Total providers</span><strong>{providers.length}</strong><p>Real records in Supabase</p></div>
            <div className="metricCard"><span>Enabled</span><strong>{providers.filter(p => p.status === 'active').length}</strong><p>Available for configuration</p></div>
            <div className="metricCard"><span>Disabled</span><strong>{providers.filter(p => p.status === 'disabled').length}</strong><p>Kept but not selectable</p></div>
            <div className="metricCard"><span>Archived</span><strong>{providers.filter(p => p.status === 'archived').length}</strong><p>Historical records</p></div>
          </section>

          <div className="sectionHeader"><div><h2>Your providers</h2><p>Provider is simply the company behind an AI or API capability.</p></div><input className="providerSearch" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search providers…" aria-label="Search providers" /></div>
          {error && <p className="error">{error}</p>}

          {filtered.length === 0 ? (
            <section className="emptyService"><div className="emptyIcon">◈</div><h2>{providers.length ? 'No matching providers' : 'Your provider layer is empty'}</h2><p>{providers.length ? 'Try a different search.' : 'Start with a company such as OpenAI, Anthropic, Google, or another API provider. GATE HUB will use this record later when you connect credentials and models.'}</p>{!providers.length && <button className="primary compactButton" onClick={openCreate}>Add your first provider</button>}</section>
          ) : (
            <div className="serviceList">{filtered.map(provider => (
              <article className="serviceCard" key={provider.id}>
                <div className="serviceGlyph">{provider.name.slice(0, 1).toUpperCase()}</div>
                <div className="serviceInfo"><div className="serviceTitle"><h3>{provider.name}</h3><span className={`badge ${provider.status === 'active' ? 'on' : 'off'}`}>{statusLabel(provider.status)}</span></div><p>{provider.purpose}</p><div className="serviceMeta"><span>Type <b>{provider.kind}</b></span>{provider.website && <span>Website <b>{provider.website.replace(/^https?:\/\//, '')}</b></span>}</div></div>
                <div className="serviceActions"><button className="secondary" onClick={() => openEdit(provider)}>Edit</button>{provider.status !== 'archived' && <button className="secondary" onClick={() => toggleProvider(provider)}>{provider.status === 'active' ? 'Disable' : 'Enable'}</button>}{provider.status !== 'archived' && <button className="secondary" onClick={() => archiveProvider(provider)}>Archive</button>}</div>
              </article>
            ))}</div>
          )}

          <section className="featureGrid"><article className="featureCard dark"><div className="featureIcon">1</div><span className="tag">PLAIN ENGLISH</span><h3>Provider = company</h3><p>You do not need to think about API architecture here. GATE HUB only asks which company supplies the capability.</p></article><article className="featureCard"><div className="featureIcon light">2</div><span className="tag">NEXT STEP</span><h3>Connect a credential</h3><p>The next module will securely connect a provider without showing the secret again after it is saved.</p></article><article className="featureCard"><div className="featureIcon light">3</div><span className="tag">THEN</span><h3>Choose a model</h3><p>After the secure connection exists, you will select the specific model that powers each service.</p></article></section>
        </div>
      </section>

      {showForm && <div className="modalBackdrop" role="dialog" aria-modal="true"><form className="modal" onSubmit={saveProvider}><div className="modalHead"><div><p className="eyebrow">{editing ? 'EDIT PROVIDER' : 'NEW PROVIDER'}</p><h2>{editing ? 'Update provider' : 'Add a provider'}</h2><p>Use plain language. You can change this later.</p></div><button type="button" className="close" onClick={() => setShowForm(false)}>×</button></div><div className="formGrid"><label>Provider name<span className="fieldHint">The company supplying the AI or API.</span><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. OpenAI" /></label><label>Provider type<span className="fieldHint">Helps GATE HUB organize providers.</span><select value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value })}>{providerTypes.map(type => <option key={type}>{type}</option>)}</select></label><label className="wide">Purpose<span className="fieldHint">What do you expect this company to power?</span><textarea required value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} placeholder="e.g. AI models for writing, research and structured content." /></label><label>Website / API information<span className="fieldHint">Optional reference link. No secret belongs here.</span><input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://example.com" /></label><label>Status<span className="fieldHint">Disabled providers cannot be selected for new setups.</span><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="active">Enabled</option><option value="disabled">Disabled</option></select></label></div><div className="modalActions"><button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button><button className="primary modalPrimary" disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Create provider'}</button></div></form></div>}
    </main>
  );
}
