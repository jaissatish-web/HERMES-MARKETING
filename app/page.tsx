"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabaseBrowser } from "../supabase-browser";

const menu = ["Overview", "Services", "Providers & Models", "Credentials", "Approvals", "Budgets", "Jobs", "Audit", "Settings"];

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
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session) loadServices();
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
      if (nextSession) loadServices();
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadServices() {
    try {
      const { count } = await getSupabaseBrowser().from("services").select("id", { count: "exact", head: true });
      setServicesCount(count ?? 0);
    } catch {
      setServicesCount(0);
    }
  }

  async function submitAuth(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const supabase = getSupabaseBrowser();
    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: "Founder" } } });
    if (result.error) setMessage(result.error.message);
    else setMessage(mode === "login" ? "Signed in successfully." : "Account created. Check your email if confirmation is enabled.");
  }

  if (loading) return <main className="center"><div className="loginCard"><b>Loading GATE HUB…</b></div></main>;

  if (!session) return (
    <main className="center">
      <form className="loginCard" onSubmit={submitAuth}>
        <div className="brand loginBrand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
        <p className="eyebrow">FOUNDER ACCESS</p>
        <h1>{mode === "login" ? "Welcome back" : "Create Founder account"}</h1>
        <p className="muted">Your control center is protected by Supabase Authentication.</p>
        <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
        {message && <p className="error">{message}</p>}
        <button className="primary" type="submit">{mode === "login" ? "Sign in" : "Create account"}</button>
        <button className="linkButton" type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}>
          {mode === "login" ? "Need the first Founder account? Create it" : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
        <nav>{menu.map(item => <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}>{item}</button>)}</nav>
        <button className="logout" onClick={() => getSupabaseBrowser().auth.signOut()}>Sign out</button>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">FOUNDER CONTROL CENTER</p><h1>{active}</h1><p className="muted">One control room for GCC-MENTOR growth, marketing and revenue operations.</p></div><div className="health"><i /> Authenticated</div></header>
        <section className="cards"><div><span>Services</span><b>{servicesCount}</b><small>Real Supabase records</small></div><div><span>Approvals</span><b>0</b><small>Waiting for Founder</small></div><div><span>Today&apos;s cost</span><b>$0.00</b><small>Providers not connected</small></div><div><span>System</span><b>Ready</b><small>Authenticated</small></div></section>
        <section className="panel"><div className="panelHead"><div><h2>{active}</h2><p>{active === "Overview" ? "Your live GATE HUB control center." : `${active} module is being connected to the real Supabase data model.`}</p></div>{active === "Services" && <button onClick={loadServices}>Refresh</button>}</div>
          {active === "Overview" ? <div className="grid"><article><div className="icon">R</div><div className="serviceText"><h3>Research</h3><p>Market intelligence and opportunity research.</p></div><span className="badge">Planned</span></article><article><div className="icon">C</div><div className="serviceText"><h3>Content</h3><p>Blogs, social content and campaigns.</p></div><span className="badge">Planned</span></article><article><div className="icon">S</div><div className="serviceText"><h3>Social</h3><p>Publishing and scheduling.</p></div><span className="badge">Planned</span></article><article><div className="icon">A</div><div className="serviceText"><h3>Analytics</h3><p>Acquisition, conversion and revenue.</p></div><span className="badge">Planned</span></article></div> : <div className="empty"><h3>{active}</h3><p>This section is now clickable and ready for its database-backed module.</p></div>}
        </section>
      </section>
    </main>
  );
}
