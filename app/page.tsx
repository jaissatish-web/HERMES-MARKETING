const services = [
  ["Research", "Public-web research and market intelligence", "Planned"],
  ["Content", "Blogs, social content and campaigns", "Planned"],
  ["Social", "Publishing and scheduling", "Planned"],
  ["Analytics", "Acquisition, conversion and revenue", "Planned"],
  ["Image", "Creative generation", "Planned"],
  ["Video", "Video generation workflows", "Planned"],
];

export default function Home() {
  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span>GH</span><div><strong>GATE HUB</strong><small>GCC-MENTOR</small></div></div>
        <nav><a className="active">Overview</a><a>Services</a><a>Providers & Models</a><a>Credentials</a><a>Approvals</a><a>Budgets</a><a>Jobs</a><a>Audit</a><a>Settings</a></nav>
      </aside>
      <section className="content">
        <header><div><p className="eyebrow">FOUNDER CONTROL CENTER</p><h1>GATE HUB</h1><p className="muted">One control room for GCC-MENTOR growth, marketing and revenue operations.</p></div><div className="health"><i /> System ready</div></header>
        <section className="cards"><div><span>Services</span><b>6</b><small>Configured service slots</small></div><div><span>Approvals</span><b>0</b><small>Waiting for Founder</small></div><div><span>Today&apos;s cost</span><b>$0.00</b><small>No providers connected</small></div><div><span>System</span><b>Ready</b><small>External APIs not connected</small></div></section>
        <section className="panel"><div className="panelHead"><div><h2>Service control</h2><p>Connect and manage each capability from one place.</p></div><button>Add service</button></div><div className="grid">{services.map(([name, desc, status]) => <article key={name}><div className="icon">{name.slice(0,1)}</div><div className="serviceText"><h3>{name}</h3><p>{desc}</p></div><span className="badge">{status}</span></article>)}</div></section>
        <section className="panel next"><h2>Next setup</h2><p>Connect Supabase credentials through Vercel environment variables, then GATE HUB can replace this dashboard&apos;s placeholder state with the real database and authentication.</p><ol><li>Configure Supabase environment variables</li><li>Enable Founder authentication</li><li>Connect Services, Providers and Models to PostgreSQL</li><li>Add approved external engines one at a time</li></ol></section>
      </section>
    </main>
  );
}
