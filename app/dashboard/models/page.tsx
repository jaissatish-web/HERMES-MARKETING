'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase-browser';

type Provider = { id: string; name: string; kind: string; status: string };
type Model = { id: string; provider_id: string; name: string; purpose: string; capabilities: string[]; status: string; is_default: boolean; is_backup: boolean };

export default function ModelsPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', provider_id: '', purpose: '', capabilities: '', status: 'active', is_default: false, is_backup: false });

  async function load() {
    if (!supabase) { setError('Supabase is not configured.'); setLoading(false); return; }
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { router.replace('/login'); return; }
    const [{ data: providerData, error: providerError }, { data: modelData, error: modelError }] = await Promise.all([
      supabase.from('providers').select('id,name,kind,status').neq('status', 'archived').order('name'),
      supabase.from('models').select('id,provider_id,name,purpose,capabilities,status,is_default,is_backup').order('name')
    ]);
    if (providerError) setError(providerError.message);
    if (modelError) setError(modelError.message);
    setProviders((providerData as Provider[]) ?? []);
    setModels((modelData as Model[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);
  const providerName = useMemo(() => Object.fromEntries(providers.map(p => [p.id, p.name])), [providers]);

  function openCreate() {
    setForm({ name: '', provider_id: providers.find(p => p.status === 'active')?.id ?? '', purpose: '', capabilities: '', status: 'active', is_default: false, is_backup: false });
    setError(''); setShowForm(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    if (!form.name.trim() || !form.provider_id) { setError('Add a model name and provider.'); return; }
    setSaving(true); setError('');
    const capabilities = form.capabilities.split(',').map(x => x.trim()).filter(Boolean);
    const { error: insertError } = await supabase.from('models').insert({ name: form.name.trim(), provider_id: form.provider_id, purpose: form.purpose.trim(), capabilities, status: form.status, is_default: form.is_default, is_backup: form.is_backup });
    setSaving(false);
    if (insertError) { setError(insertError.message); return; }
    setShowForm(false); await load();
  }

  async function toggle(model: Model) {
    if (!supabase) return;
    const { error: updateError } = await supabase.from('models').update({ status: model.status === 'active' ? 'disabled' : 'active' }).eq('id', model.id);
    if (updateError) setError(updateError.message); else await load();
  }

  async function remove(model: Model) {
    if (!supabase || !window.confirm(`Remove ${model.name}? This is safe only when no service uses it.`)) return;
    const { error: deleteError } = await supabase.from('models').delete().eq('id', model.id);
    if (deleteError) setError(deleteError.message); else await load();
  }

  async function signOut() { await supabase?.auth.signOut(); router.replace('/login'); }

  if (loading) return <main className="center"><div className="loadingCard"><div className="logoMark">GH</div><span>Loading Model Manager…</span></div></main>;

  return <main className="appShell">
    <aside className="sidebar">
      <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
      <div className="workspace"><span className="workspaceDot" /> Founder workspace <b>ADMIN</b></div>
      <nav>
        <button onClick={() => router.push('/dashboard')}><span>⌂</span>Overview</button>
        <button onClick={() => router.push('/dashboard')}><span>▦</span>Services</button>
        <button onClick={() => router.push('/dashboard/providers')}><span>◈</span>Providers & Models</button>
        <button onClick={() => router.push('/dashboard/credentials')}><span>◇</span>Credentials</button>
        <button className="active"><span>◎</span>Models</button>
        <button><span>✓</span>Approvals</button><button><span>◷</span>Budgets</button><button><span>≡</span>Audit</button>
      </nav>
      <div className="sidebarBottom"><div className="connection"><i /> Supabase connected</div><button className="logout" onClick={signOut}>↪ <span>Sign out</span></button></div>
    </aside>
    <section className="mainArea"><header className="topbar"><div className="crumb"><span>GATE HUB</span><b>/</b> Model Manager</div><span className="livePill"><i /> CONFIGURATION</span></header>
      <div className="page">
        <div className="pageIntro"><div><p className="eyebrow">AI STACK CONTROL</p><h1>Model Manager</h1><p className="muted">Choose which AI engine a provider connection should use. No API secrets belong here.</p></div><div className="introActions"><button className="secondary" onClick={() => router.push('/dashboard/providers')}>Providers</button><button className="primary compactButton" onClick={openCreate}>+ Add model</button></div></div>
        <section className="featureGrid"><article className="featureCard dark"><div className="featureIcon">◎</div><span className="tag">MODEL</span><h3>Specific AI engine</h3><p>A provider can offer many models. A model is the engine GATE HUB selects for a particular service.</p></article><article className="featureCard"><div className="featureIcon light">↔</div><span className="tag">PROVIDER LINK</span><h3>Always tied to a provider</h3><p>Each model belongs to exactly one provider, so the Service Manager can filter models correctly.</p></article><article className="featureCard"><div className="featureIcon light">★</div><span className="tag">ROUTING</span><h3>Default + backup ready</h3><p>Mark a model as preferred or backup now. Execution and fallback routing will be added in the Service Gateway phase.</p></article></section>
        {error && <p className="error">{error}</p>}
        <div className="sectionHeader"><div><h2>Configured models</h2><p>These are safe configuration records. Credentials stay in the separate vault.</p></div></div>
        {models.length === 0 ? <section className="emptyService"><div className="emptyIcon">◎</div><h2>No models configured yet</h2><p>Add the first model for a provider. For example, add the model you want to use for GCC-MENTOR content or research.</p><button className="primary compactButton" onClick={openCreate}>Add your first model</button></section> : <div className="serviceList">{models.map(m => <article className="serviceCard" key={m.id}><div className="serviceGlyph">◎</div><div className="serviceInfo"><div className="serviceTitle"><h3>{m.name}</h3><span className={`badge ${m.status === 'active' ? 'on' : ''}`}>{m.status === 'active' ? 'Active' : 'Disabled'}</span>{m.is_default && <span className="badge on">Default</span>}{m.is_backup && <span className="badge">Backup</span>}</div><p>{providerName[m.provider_id] ?? 'Unknown provider'}{m.purpose ? ` · ${m.purpose}` : ''}</p><div className="serviceMeta"><span>Capabilities <b>{m.capabilities?.length ? m.capabilities.join(' · ') : 'Not specified'}</b></span><span><button className="secondary" onClick={() => toggle(m)}>{m.status === 'active' ? 'Disable' : 'Enable'}</button> <button className="secondary" onClick={() => remove(m)}>Remove</button></span></div></div></article>)}</div>}
      </div>
    </section>
    {showForm && <div className="modalBackdrop"><form className="modal" onSubmit={save}><div className="modalHead"><div><p className="eyebrow">NEW MODEL</p><h2>Add an AI model</h2><p>Model names are configuration only. Never paste an API key here.</p></div><button type="button" className="close" onClick={() => setShowForm(false)}>×</button></div><div className="formGrid"><label>Model name<span className="fieldHint">Use the exact model/API identifier supplied by the provider.</span><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Model name or API ID" /></label><label>Provider<span className="fieldHint">Who supplies this model?</span><select required value={form.provider_id} onChange={e => setForm({ ...form, provider_id: e.target.value })}><option value="">Choose provider…</option>{providers.filter(p => p.status === 'active').map(p => <option key={p.id} value={p.id}>{p.name} — {p.kind}</option>)}</select></label><label className="wide">Purpose<span className="fieldHint">Plain English: what should GATE HUB use this model for?</span><input value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} placeholder="Blog writing, GCC research, resume analysis…" /></label><label className="wide">Capabilities<span className="fieldHint">Optional comma-separated labels.</span><input value={form.capabilities} onChange={e => setForm({ ...form, capabilities: e.target.value })} placeholder="text, reasoning, research" /></label><label>Status<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="disabled">Disabled</option></select></label><label className="checkField"><input type="checkbox" checked={form.is_default} onChange={e => setForm({ ...form, is_default: e.target.checked })} /> Preferred/default model</label><label className="checkField"><input type="checkbox" checked={form.is_backup} onChange={e => setForm({ ...form, is_backup: e.target.checked })} /> Backup model</label></div><div className="modalActions"><button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button><button className="primary modalPrimary" disabled={saving}>{saving ? 'Saving…' : 'Save model'}</button></div></form></div>}
  </main>;
}
