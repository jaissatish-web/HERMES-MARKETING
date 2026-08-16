'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../../lib/supabase-browser';

type Provider = { id: string; name: string; kind: string; status: string };
type Credential = { id: string; label: string; provider_id: string; key_hint: string | null; status: string; created_at: string };

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

  if (loading) return <main className="authShell"><section className="authCard"><p>Loading Credential Vault…</p></section></main>;

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
      <nav>
        <button onClick={() => router.push('/dashboard')}>Overview</button>
        <button onClick={() => router.push('/dashboard')}>Services</button>
        <button onClick={() => router.push('/dashboard/providers')}>Providers & Models</button>
        <button className="active">Credentials</button>
        <button>Approvals</button><button>Budgets</button><button>Jobs</button><button>Audit</button><button>Settings</button>
      </nav>
      <button className="sideButton" onClick={signOut}>Sign out</button>
    </aside>
    <section className="content">
      <header><div><p className="eyebrow">SECURITY CONTROL</p><h1>Credential Vault</h1><p className="muted">Connect an API securely. The complete secret is never shown after saving.</p></div><div className="health"><i /> Secret-safe</div></header>
      <section className="cards"><div><span>Connections</span><b>{credentials.length}</b><small>Secure references</small></div><div><span>Connected</span><b>{credentials.filter(c => c.status === 'active').length}</b><small>Ready for service setup</small></div><div><span>Secrets shown</span><b>0</b><small>Raw keys never listed</small></div><div><span>Providers</span><b>{providers.length}</b><small>Available to connect</small></div></section>
      {error && <p className="error">{error}</p>}
      <section className="panel"><div className="panelHead"><div><h2>Secure connections</h2><p>API credentials are encrypted server-side. You only see safe metadata and the last four characters.</p></div><button className="primary" onClick={openCreate}>+ Add credential</button></div>
        {credentials.length === 0 ? <div className="emptyService"><h2>No credentials connected yet</h2><p>Connect your first provider to prepare GATE HUB for AI services.</p><button className="primary" onClick={openCreate}>Connect first provider</button></div> : <div className="grid">{credentials.map(c => <article key={c.id}><div className="icon">🔐</div><div className="serviceText"><h3>{c.label}</h3><p>{providerName[c.provider_id] ?? 'Provider'} · Key ••••••••{c.key_hint ?? '••••'}</p></div><span className="badge">{c.status}</span></article>)}</div>}
      </section>
    </section>
    {showForm && <div className="modalBackdrop" role="dialog" aria-modal="true"><form className="modal" onSubmit={save}><div className="modalHead"><div><p className="eyebrow">NEW SECURE CONNECTION</p><h2>Connect a provider</h2><p>Your API key is sent to the protected vault function and is never displayed after save.</p></div><button type="button" className="close" onClick={() => setShowForm(false)}>×</button></div><div className="formGrid"><label>Connection name<span className="fieldHint">Example: OpenRouter Production</span><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="OpenRouter Production" /></label><label>Provider<span className="fieldHint">Choose the provider that issued the key.</span><select required value={form.provider_id} onChange={e => setForm({ ...form, provider_id: e.target.value })}><option value="">Choose provider…</option>{providers.filter(p => p.status === 'active').map(p => <option key={p.id} value={p.id}>{p.name} — {p.kind}</option>)}</select></label><label className="wide">API key / secret<span className="fieldHint">Paste it here. It is sent to the protected Edge Function.</span><input required type="password" value={form.secret} onChange={e => setForm({ ...form, secret: e.target.value })} autoComplete="new-password" placeholder="Paste API key" /></label></div><div className="credentialNotice"><b>🔐 Security boundary</b><span>GATE HUB encrypts the secret server-side. The normal UI receives only the connection name, provider reference, status and last four characters.</span></div><div className="modalActions"><button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button><button className="primary" disabled={saving}>{saving ? 'Securing…' : 'Save securely'}</button></div></form></div>}
  </main>;
}