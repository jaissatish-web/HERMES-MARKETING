'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase-browser';

type Provider = { id: string; name: string; kind: string; status: string };
type Credential = { id: string; name: string; provider_id: string; secret_last4: string | null; status: string; created_at: string };

export default function CredentialsPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', provider_id: '', secret: '' });

  async function load() {
    if (!supabase) { setError('Supabase is not configured.'); setLoading(false); return; }
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { router.replace('/login'); return; }
    const [{ data: providerData, error: providerError }, { data: vaultData, error: vaultError }] = await Promise.all([
      supabase.from('providers').select('id,name,kind,status').neq('status', 'archived').order('name'),
      supabase.functions.invoke('credential-vault-secure', { body: { action: 'list' } })
    ]);
    if (providerError) setError(providerError.message);
    if (vaultError) setError(vaultError.message);
    setProviders((providerData as Provider[]) ?? []);
    setCredentials((vaultData?.credentials as Credential[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const providerName = useMemo(() => Object.fromEntries(providers.map(p => [p.id, p.name])), [providers]);

  function openCreate() {
    setForm({ name: '', provider_id: providers.find(p => p.status === 'active')?.id ?? '', secret: '' });
    setError('');
    setShowForm(true);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    if (!form.name.trim() || !form.provider_id || !form.secret.trim()) { setError('Add a name, provider and API key.'); return; }
    setSaving(true); setError('');
    const { error: fnError } = await supabase.functions.invoke('credential-vault-secure', { body: { action: 'save', name: form.name.trim(), provider_id: form.provider_id, secret: form.secret } });
    setSaving(false);
    if (fnError) { setError(fnError.message); return; }
    setForm({ name: '', provider_id: '', secret: '' });
    setShowForm(false);
    await load();
  }

  async function signOut() { await supabase?.auth.signOut(); router.replace('/login'); }

  if (loading) return <main className="center"><div className="loadingCard"><div className="logoMark">GH</div><span>Loading Credential Vault…</span></div></main>;

  return <main className="appShell">
    <aside className="sidebar">
      <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
      <div className="workspace"><span className="workspaceDot" /> Founder workspace <b>ADMIN</b></div>
      <nav>
        <button onClick={() => router.push('/dashboard')}><span>⌂</span>Overview</button>
        <button onClick={() => router.push('/dashboard')}><span>▦</span>Services</button>
        <button onClick={() => router.push('/dashboard/providers')}><span>◈</span>Providers & Models</button>
        <button className="active"><span>◇</span>Credentials</button>
        <button><span>✓</span>Approvals</button><button><span>◷</span>Budgets</button><button><span>↗</span>Jobs</button><button><span>≡</span>Audit</button>
      </nav>
      <div className="sidebarBottom"><div className="connection"><i /> Supabase connected</div><button className="logout" onClick={signOut}>↪ <span>Sign out</span></button></div>
    </aside>
    <section className="mainArea">
      <header className="topbar"><div className="crumb"><span>GATE HUB</span><b>/</b> Secure Credential Vault</div><div className="topActions"><span className="livePill"><i /> SECRET-SAFE</span></div></header>
      <div className="page">
        <div className="pageIntro"><div><p className="eyebrow">SECURITY CONTROL</p><h1>Credential Vault</h1><p className="muted">Connect an API without putting the secret into your website or service records.</p></div><div className="introActions"><button className="secondary" onClick={() => router.push('/dashboard/providers')}>Providers</button><button className="primary compactButton" onClick={openCreate}>+ Add credential</button></div></div>
        <section className="metricGrid"><div className="metricCard featured"><span>Connections</span><strong>{credentials.length}</strong><p>Secure references in GATE HUB</p></div><div className="metricCard"><span>Connected</span><strong>{credentials.filter(c => c.status === 'connected').length}</strong><p>Ready for service setup</p></div><div className="metricCard"><span>Secrets shown</span><strong>0</strong><p>Raw keys are never listed</p></div><div className="metricCard"><span>Providers</span><strong>{providers.length}</strong><p>Available to connect</p></div></section>
        {error && <p className="error">{error}</p>}
        <section className="featureGrid"><article className="featureCard dark"><div className="featureIcon">✓</div><span className="tag">IMPORTANT</span><h3>The key is not a website field</h3><p>Your browser sends the secret to the protected server function. GATE HUB stores encrypted secret material and only keeps a safe reference in the normal UI.</p></article><article className="featureCard"><div className="featureIcon light">•••</div><span className="tag">AFTER SAVE</span><h3>You see only the last 4</h3><p>For example: ••••••••••••ABCD. The complete API key is not returned by the Credential Vault listing.</p></article><article className="featureCard"><div className="featureIcon light">↗</div><span className="tag">NEXT</span><h3>Services use the connection</h3><p>A service will reference this credential. The service itself never needs to contain the raw secret.</p></article></section>
        <div className="sectionHeader"><div><h2>Your secure connections</h2><p>These are connection labels and safe metadata — not the actual API keys.</p></div></div>
        {credentials.length === 0 ? <section className="emptyService"><div className="emptyIcon">◇</div><h2>No credentials connected yet</h2><p>Start by connecting one provider. You will enter the API key once, and GATE HUB will not show the complete secret again.</p><button className="primary compactButton" onClick={openCreate}>Connect your first provider</button></section> : <div className="serviceList">{credentials.map(c => <article className="serviceCard" key={c.id}><div className="serviceGlyph">✓</div><div className="serviceInfo"><div className="serviceTitle"><h3>{c.name}</h3><span className="badge on">{c.status === 'connected' ? 'Connected' : c.status}</span></div><p>{providerName[c.provider_id] ?? 'Provider'} connection</p><div className="serviceMeta"><span>Secret <b>••••••••{c.secret_last4 ?? '••••'}</b></span><span>Stored <b>Encrypted</b></span></div></div></article>)}</div>}
      </div>
    </section>
    {showForm && <div className="modalBackdrop" role="dialog" aria-modal="true"><form className="modal" onSubmit={save}><div className="modalHead"><div><p className="eyebrow">NEW SECURE CONNECTION</p><h2>Connect a provider</h2><p>Your API key is sent to the protected vault function and is never displayed after save.</p></div><button type="button" className="close" onClick={() => setShowForm(false)}>×</button></div><div className="formGrid"><label>Connection name<span className="fieldHint">A friendly name such as “OpenAI Production”.</span><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="OpenAI Production" /></label><label>Provider<span className="fieldHint">Choose the company that issued the API key.</span><select required value={form.provider_id} onChange={e => setForm({ ...form, provider_id: e.target.value })}><option value="">Choose provider…</option>{providers.filter(p => p.status === 'active').map(p => <option key={p.id} value={p.id}>{p.name} — {p.kind}</option>)}</select></label><label className="wide">API key / secret<span className="fieldHint">Paste the secret here. It will not be stored in the browser's normal database record or shown after save.</span><input required type="password" value={form.secret} onChange={e => setForm({ ...form, secret: e.target.value })} autoComplete="new-password" placeholder="Paste API key" /></label></div><div className="credentialNotice"><b>🔐 Security boundary</b><span>GATE HUB encrypts the secret server-side before storing it. The normal credential list contains only the connection name, provider reference, status and last four characters.</span></div><div className="modalActions"><button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button><button className="primary modalPrimary" disabled={saving}>{saving ? 'Securing…' : 'Save securely'}</button></div></form></div>}
  </main>;
}
