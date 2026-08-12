'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '../../lib/supabase-browser';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError('Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
      return;
    }
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.replace('/dashboard');
  }

  return (
    <main className="authShell">
      <section className="authCard">
        <p className="eyebrow">FOUNDER ACCESS</p>
        <h1>GATE HUB</h1>
        <p className="muted">Sign in to your private control center.</p>
        <form onSubmit={submit} className="authForm">
          <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></label>
          <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" /></label>
          {error && <p className="errorBox">{error}</p>}
          <button disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </section>
    </main>
  );
}
