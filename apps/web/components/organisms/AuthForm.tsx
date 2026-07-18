"use client";

import Link from "next/link";
import { Mail, Lock, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const isLogin = type === "login";

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
          {isLogin ? "Enter your credentials to access your workspace." : "Start building better forms today."}
        </p>
      </header>

      <Card className="w-full shadow-sm border-border/50">
        <CardContent className="pt-8 md:pt-10 px-8 md:px-10">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input id="name" placeholder="Jane Doe" required className="py-6" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input id="email" type="email" placeholder="name@company.com" required className="pl-10 py-6" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link className="text-xs font-semibold text-primary hover:underline transition-all" href="#">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="pl-10 pr-12 py-6" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 font-semibold shadow-sm">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-xs font-semibold text-muted-foreground uppercase">OR</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <Button variant="outline" type="button" className="w-full py-6 font-semibold flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.56 0 2.96.54 4.06 1.58l3.05-3.05C17.46 2.05 15.01 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-8 justify-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link className="font-semibold text-primary hover:underline" href={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
