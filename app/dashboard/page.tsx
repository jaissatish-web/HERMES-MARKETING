'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../lib/supabase-browser';

const sections = ['Overview', 'Services', 'Providers & Models', 'Credentials', 'Approvals', 'Budgets', 'Jobs', 'Audit'];
const paths = ['/dashboard', '/dashboard/services', '/dashboard/providers', '/dashboard/credentials', '/dashboard/approvals', '/dashboard/budgets', '/dashboard/jobs', '/dashboard/audit'];
const icons = ['⌂','▦','◈','◇','✓','◷','↗','≡'];

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

  async function signOut() { const supabase = getSupabaseBrowserClient(); await supabase?.auth.signOut(); router.replace('/login'); }
  if (loading) return <main className="center"><div className="loadingCard"><div className="logoMark">GH</div><span>Loading GATE HUB…</span></div></main>;

  return <main className="appShell">
    <aside className="sidebar">
      <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
      <div className="workspace"><span className="workspaceDot" /> Founder workspace <b>ADMIN</b></div>
      <nav>{sections.map((item, i) => <button key={item} className={i === 0 ? 'active' : ''} onClick={() => router.push(paths[i])}><span>{icons[i]}</span>{item}</button>)}</nav>
      <div className="sidebarBottom"><div className="connection"><i /> Supabase connected</div><button className="logout" onClick={signOut}>↪ <span>Sign out</span></button></div>
    </aside>
    <section className="mainArea">
      <header className="topbar"><div className="crumb"><span>GATE HUB</span><b>/</b> Founder Control Center</div><div className="topActions"><span className="livePill"><i /> LIVE</span></div></header>
      <div className="page">
        <div className="pageIntro"><div><p className="eyebrow">FOUNDER CONTROL CENTER</p><h1>Welcome back</h1><p className="muted">{email}</p></div><div className="introActions"><button className="secondary" onClick={() => router.push('/dashboard/providers')}>Providers & Models</button><button className="primary compactButton" onClick={() => router.push('/dashboard/credentials')}>+ Connect credential</button></div></div>
        <section className="metricGrid"><div className="metricCard featured"><span>Services</span><strong>{services ?? '—'}</strong><p>Live database records</p></div><div className="metricCard"><span>Providers</span><strong>{providers ?? '—'}</strong><p>Managed in Provider Manager</p></div><div className="metricCard"><span>Credentials</span><strong>0</strong><p>Secure connections ready</p></div><div className="metricCard"><span>System</span><strong>Live</strong><p>Supabase session active</p></div></section>
        <section className="featureGrid"><article className="featureCard dark"><div className="featureIcon">S</div><span className="tag">SERVICES</span><h3>What GATE HUB does</h3><p>Services are the jobs or capabilities you want the platform to perform.</p><button onClick={()=>router.push('/dashboard/services')}>Open Service Manager →</button></article><article className="featureCard"><div className="featureIcon light">P</div><span className="tag">PROVIDER</span><h3>Who powers it</h3><p>A provider is the company that supplies an AI or API capability, such as OpenAI or OpenRouter.</p><button onClick={()=>router.push('/dashboard/providers')}>Open Provider Manager →</button></article><article className="featureCard"><div className="featureIcon light">◇</div><span className="tag">CREDENTIAL</span><h3>Secure connection</h3><p>The Credential Vault stores API secrets securely. You never need to put a key into a normal service record.</p><button onClick={()=>router.push('/dashboard/credentials')}>Open Credential Vault →</button></article></section>
        <div className="sectionHeader"><div><h2>Founder control</h2><p>Each sidebar item now opens its own control surface instead of repeating the dashboard.</p></div></div>
        <div className="serviceList"><article className="serviceCard" onClick={()=>router.push('/dashboard/services')} style={{cursor:'pointer'}}><div className="serviceGlyph">1</div><div className="serviceInfo"><div className="serviceTitle"><h3>Services</h3><span className="badge on">Control</span></div><p>Create and configure the jobs GATE HUB performs.</p></div></article><article className="serviceCard" onClick={()=>router.push('/dashboard/approvals')} style={{cursor:'pointer'}}><div className="serviceGlyph">2</div><div className="serviceInfo"><div className="serviceTitle"><h3>Approvals</h3><span className="badge">Governance</span></div><p>Decide which actions require Founder approval.</p></div></article><article className="serviceCard" onClick={()=>router.push('/dashboard/budgets')} style={{cursor:'pointer'}}><div className="serviceGlyph">3</div><div className="serviceInfo"><div className="serviceTitle"><h3>Budgets</h3><span className="badge">Cost control</span></div><p>Set spending limits before execution begins.</p></div></article><article className="serviceCard" onClick={()=>router.push('/dashboard/jobs')} style={{cursor:'pointer'}}><div className="serviceGlyph">4</div><div className="serviceInfo"><div className="serviceTitle"><h3>Jobs</h3><span className="badge">Execution</span></div><p>Monitor running and completed service executions.</p></div></article><article className="serviceCard" onClick={()=>router.push('/dashboard/audit')} style={{cursor:'pointer'}}><div className="serviceGlyph">5</div><div className="serviceInfo"><div className="serviceTitle"><h3>Audit</h3><span className="badge">Traceability</span></div><p>Review important changes and execution history.</p></div></article></div>
      </div>
    </section>
  </main>;
}
