"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowser } from "../supabase-browser";

const menu = [
  ["Overview", "⌂"], ["Services", "◈"], ["Providers & Models", "✦"], ["Credentials", "▣"],
  ["Approvals", "✓"], ["Budgets", "◷"], ["Jobs", "↗"], ["Audit", "≡"], ["Settings", "⚙"]
];

export default function Home() {
  const [session, setSession] = useState<any>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [servicesCount, setServicesCount] = useState(0);
  const [active, setActive] = useState("Overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); if (data.session) loadServices(); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setLoading(false); if (nextSession) loadServices(); });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadServices() {
    try { const { count } = await getSupabaseBrowser().from("services").select("id", { count: "exact", head: true }); setServicesCount(count ?? 0); }
    catch { setServicesCount(0); }
  }

  async function submitAuth(event: FormEvent) {
    event.preventDefault(); setMessage(""); const supabase = getSupabaseBrowser();
    const result = mode === "login" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { data: { full_name: "Founder" } } });
    if (result.error) setMessage(result.error.message); else setMessage(mode === "login" ? "Signed in successfully." : "Account created. Check your email if confirmation is enabled.");
  }

  if (loading) return <main className="center"><div className="loadingCard"><div className="logoMark">GH</div><b>Preparing your control room</b><span>Securely connecting to GATE HUB…</span></div></main>;

  if (!session) return (
    <main className="authPage">
      <div className="authGlow glowOne" /><div className="authGlow glowTwo" />
      <section className="authShowcase"><div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div><div className="showcaseCopy"><p className="eyebrow">FOUNDER OPERATING SYSTEM</p><h1>One beautiful control room for your entire growth engine.</h1><p>Connect services, AI providers, content systems, approvals and revenue operations without living in spreadsheets.</p><div className="miniStats"><span><b>01</b> Control center</span><span><b>∞</b> Services</span><span><b>24/7</b> Visibility</span></div></div></section>
      <form className="loginCard" onSubmit={submitAuth}><div className="mobileBrand"><div className="logoMark">GH</div><b>GATE HUB</b></div><p className="eyebrow">{mode === "login" ? "FOUNDER ACCESS" : "FIRST-TIME SETUP"}</p><h2>{mode === "login" ? "Welcome back" : "Create your Founder account"}</h2><p className="muted">{mode === "login" ? "Sign in to manage your GCC-MENTOR operating system." : "Your private control center starts here."}</p><div className="authForm"><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="founder@company.com" /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="••••••••" /></label></div>{message && <p className="error">{message}</p>}<button className="primary" type="submit">{mode === "login" ? "Enter GATE HUB" : "Create Founder account"}<span>→</span></button><button className="linkButton" type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>{mode === "login" ? "Create the first Founder account" : "Already have an account? Sign in"}</button><small className="secureNote">⌁ Protected by Supabase Authentication</small></form>
    </main>
  );

  return (
    <main className="appShell">
      <aside className="sidebar"><div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div><div className="workspace"><span className="workspaceDot" /> Founder workspace <b>⌄</b></div><nav>{menu.map(([item, icon]) => <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}><span>{icon}</span>{item}</button>)}</nav><div className="sidebarBottom"><div className="connection"><i /> All systems normal</div><button className="logout" onClick={() => getSupabaseBrowser().auth.signOut()}>↪ <span>Sign out</span></button></div></aside>
      <section className="mainArea"><header className="topbar"><div className="crumb"><span>GATE HUB</span><b>/</b>{active}</div><div className="topActions"><button className="iconButton">?</button><button className="avatar">{(session.user.email?.[0] || "F").toUpperCase()}</button></div></header><div className="page"><div className="pageIntro"><div><p className="eyebrow">FOUNDER CONTROL CENTER</p><h1>{active === "Overview" ? "Good to see you, Founder." : active}</h1><p className="muted">{active === "Overview" ? "Your growth, marketing and revenue command center at a glance." : `Manage ${active.toLowerCase()} from one clear workspace.`}</p></div><div className="livePill"><i /> LIVE</div></div>
        <section className="metricGrid"><div className="metricCard featured"><div className="metricTop"><span>Services connected</span><em>Live</em></div><strong>{servicesCount}</strong><p>Capabilities available to your workspace</p><div className="spark"><span /><span /><span /><span /><span /><span /><span /></div></div><div className="metricCard"><span>Pending approvals</span><strong>0</strong><p>Nothing waiting for you</p><div className="metricIcon">✓</div></div><div className="metricCard"><span>Today's spend</span><strong>$0</strong><p>No paid activity running</p><div className="metricIcon">$</div></div><div className="metricCard"><span>System health</span><strong className="good">100%</strong><p>Authentication & database online</p><div className="metricIcon">⌁</div></div></section>
        <section className="sectionHeader"><div><h2>{active === "Overview" ? "Your operating system" : active}</h2><p>{active === "Overview" ? "Everything important, organized into simple control surfaces." : "This module is connected to the GATE HUB workspace and ready for its next database-backed controls."}</p></div>{active === "Services" && <button className="secondary" onClick={loadServices}>↻ Refresh</button>}</section>
        {active === "Overview" ? <><div className="featureGrid"><article className="featureCard dark"><div className="featureIcon">✦</div><span className="tag">AI CONTROL</span><h3>Providers & models</h3><p>Choose exactly which provider and model powers every capability. Keep your stack replaceable and under Founder control.</p><button onClick={() => setActive("Providers & Models")}>Configure stack <b>→</b></button></article><article className="featureCard"><div className="featureIcon light">◈</div><span className="tag">OPERATIONS</span><h3>Services</h3><p>Turn research, content, social, image and video capabilities on or off from one place.</p><button onClick={() => setActive("Services")}>Manage services <b>→</b></button></article><article className="featureCard"><div className="featureIcon light">✓</div><span className="tag">FOUNDER CONTROL</span><h3>Approvals & budgets</h3><p>Keep spending, publishing and important decisions behind clear approval rules.</p><button onClick={() => setActive("Approvals")}>Review controls <b>→</b></button></article></div><section className="activityPanel"><div className="sectionHeader compact"><div><h2>Workspace activity</h2><p>Your most important system events will appear here.</p></div><span className="statusText"><i /> Connected</span></div><div className="emptyActivity"><div className="emptyIcon">⌁</div><h3>You're all caught up</h3><p>No activity requires your attention yet. As we connect the engines, this becomes your live command feed.</p></div></section></> : <section className="modulePanel"><div className="moduleIcon">{menu.find(([name]) => name === active)?.[1]}</div><div><span className="tag">MODULE</span><h2>{active}</h2><p>The visual control surface is ready. The next build step is wiring this module to its Supabase records, permissions and actions.</p></div><span className="coming">Next build</span></section>}
      </div></section>
    </main>
  );
}
