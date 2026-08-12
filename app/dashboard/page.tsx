'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../lib/supabase-browser';

const sections = ['Overview', 'Services', 'Providers & Models', 'Credentials', 'Approvals', 'Budgets', 'Jobs', 'Audit', 'Settings'];

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<number | null>(null);
  const [providers, setProviders] = useState<number | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.replace('/login'); return; }
      setEmail(data.user.email ?? 'Founder');
      const [{ count: serviceCount }, { count: providerCount }] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('providers').select('*', { count: 'exact', head: true }),
      ]);
      setServices(serviceCount ?? 0);
      setProviders(providerCount ?? 0);
      setLoading(false);
    });
  }, [router]);

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace('/login');
  }

  if (loading) return <main className="authShell"><section className="authCard"><p>Loading secure control center…</p></section></main>;

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
        <nav>{sections.map((item, i) => <button key={item} className={i === 0 ? 'active' : ''} onClick={() => item === 'Providers & Models' ? router.push('/dashboard/providers') : undefined}>{item}</button>)}</nav>
        <button className="sideButton" onClick={signOut}>Sign out</button>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">FOUNDER CONTROL CENTER</p><h1>Welcome back</h1><p className="muted">{email}</p></div><div className="health"><i /> Authenticated</div></header>
        <section className="cards"><div><span>Services</span><b>{services ?? '—'}</b><small>Live database records</small></div><div><span>Providers</span><b>{providers ?? '—'}</b><small>Managed in Provider Manager</small></div><div><span>Jobs</span><b>—</b><small>Ready for execution layer</small></div><div><span>System</span><b>Live</b><small>Supabase session active</small></div></section>
        <section className="panel"><div className="panelHead"><div><h2>Founder control</h2><p>Your authenticated GATE HUB workspace is connected to the real Supabase database.</p></div></div><div className="grid"><article><div className="icon">S</div><div className="serviceText"><h3>Services</h3><p>Manage capability slots and activation.</p></div><span className="badge">Connected</span></article><article onClick={() => router.push('/dashboard/providers')} style={{ cursor: 'pointer' }}><div className="icon">P</div><div className="serviceText"><h3>Providers & Models</h3><p>Manage the companies that supply your AI/API capabilities.</p></div><span className="badge">Provider Manager</span></article><article><div className="icon">A</div><div className="serviceText"><h3>Approvals & Budgets</h3><p>Keep important actions under Founder control.</p></div><span className="badge">Next</span></article></div></section>
      </section>
    </main>
  );
}
