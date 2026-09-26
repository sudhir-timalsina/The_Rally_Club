"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { LogoBadge } from "@/components/logo";
import { Label, Input, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !data.session) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    // Confirm this user is on the admins allow-list before letting them in.
    const { data: adminRow } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", data.session.user.id)
      .maybeSingle();

    if (!adminRow) {
      setError("This account doesn't have admin access.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    const next = searchParams.get("next") || "/admin/dashboard";
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      {error && <FieldError message={error} />}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <LogoBadge size={56} className="mb-4" />
          <div className="flex items-center gap-2 text-taupe-dark">
            <Lock size={13} />
            <span className="eyebrow">Admin</span>
          </div>
        </div>
        <div className="bg-bone border border-line rounded-sm p-8">
          <h1 className="font-display text-2xl mb-6 text-center">Sign in</h1>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="text-center text-xs text-chocolate/50 mt-6">
          The Rally Club admin dashboard. Not a member of the team? Head back to{" "}
          <a href="/" className="underline">
            therallyclubuk.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
