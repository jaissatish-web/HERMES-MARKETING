import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function keyMaterial() {
  const raw = Deno.env.get("GATE_HUB_CREDENTIAL_ENCRYPTION_KEY");
  if (!raw) throw new Error("Credential encryption is not configured on the server.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt"]);
}

async function encryptSecret(secret: string) {
  const key = await keyMaterial();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(secret)));
  const combined = new Uint8Array(iv.length + encrypted.length);
  combined.set(iv);
  combined.set(encrypted, iv.length);
  return btoa(String.fromCharCode(...combined));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authorization = req.headers.get("Authorization") ?? "";
    const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authorization } } });
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) throw new Error("You must be signed in.");

    const adminClient = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: profile } = await adminClient.from("profiles").select("role,active").eq("id", user.id).single();
    if (!profile?.active || !["founder", "admin"].includes(profile.role)) throw new Error("Founder/admin access required.");

    const body = await req.json();

    if (body.action === "list") {
      const { data, error } = await adminClient
        .from("credentials")
        .select("id,name,provider_id,secret_last4,status,created_at,updated_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ credentials: data ?? [] }), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    if (body.action === "save") {
      const secret = String(body.secret ?? "").trim();
      if (!body.name?.trim() || !body.provider_id || !secret) throw new Error("Provider, credential name and secret are required.");
      const ciphertext = await encryptSecret(secret);
      const { data, error } = await adminClient
        .from("credentials")
        .insert({
          name: body.name.trim(),
          provider_id: body.provider_id,
          secret_ciphertext: ciphertext,
          secret_last4: secret.slice(-4),
          metadata: body.metadata ?? {},
          status: "connected",
          created_by: user.id,
        })
        .select("id,name,provider_id,secret_last4,status,created_at,updated_at")
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ credential: data }), { headers: { ...cors, "Content-Type": "application/json" } });
    }

    throw new Error("Unsupported action.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Credential vault request failed.";
    return new Response(JSON.stringify({ error: message }), { status: 400, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
