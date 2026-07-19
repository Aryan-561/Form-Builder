"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useState, useTransition } from "react";
import { login, signup } from "~/app/auth/actions";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isLogin = type === "login";

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const action = isLogin ? login : signup;
      const result = await action(formData);
      // If result is returned (no redirect), it contains an error
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="w-full max-w-[480px] flex flex-col items-center">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 group cursor-default">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow-sm group-hover:rotate-6 transition-transform">
            <FileText className="text-primary-foreground w-6 h-6" />
          </div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground">ProForms</h1>
        </div>
        <h2 className="font-sans text-3xl font-semibold text-foreground mb-2">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="font-sans text-muted-foreground">
          {isLogin
            ? "Enter your credentials to access your workspace."
            : "Start building better forms today."}
        </p>
      </header>

      <Card className="w-full shadow-sm border-border/50">
        <CardContent className="pt-8 md:pt-10 px-8 md:px-10">
          <form className="flex flex-col gap-6" action={handleSubmit}>
            {/* Error banner */}
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Full Name — signup only */}
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  required
                  disabled={isPending}
                  className="py-6"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                  disabled={isPending}
                  className="pl-10 py-6"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link
                    className="text-xs font-semibold text-primary hover:underline transition-all"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isPending}
                  className="pl-10 pr-12 py-6"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 font-semibold shadow-sm"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" data-icon="inline-start" />
                  {isLogin ? "Signing in…" : "Creating account…"}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-8 justify-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              className="font-semibold text-primary hover:underline"
              href={isLogin ? "/signup" : "/login"}
            >
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
