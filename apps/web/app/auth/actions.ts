"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(credentials);

  if (error) {
    return { error: error.message };
  }

  // Redirect to dashboard — or show "check your email" if email confirmation is enabled
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
