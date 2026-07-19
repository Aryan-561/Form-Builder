import { useMutation } from "@tanstack/react-query";
import { createClient } from "~/lib/supabase/client";
import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

export const useSignUp = () => {
  const supabase = createClient();
  return useMutation({
    mutationFn: async (credentials: SignUpWithPasswordCredentials) => {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) throw error;
      return data;
    },
  });
};

export const useLogin = () => {
  const supabase = createClient();
  return useMutation({
    mutationFn: async (credentials: SignInWithPasswordCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      if (error) throw error;
      return data;
    },
  });
};

export const useLogout = () => {
  const supabase = createClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  });
};

export const useSession = () => {
  const supabase = createClient();
  return () => supabase.auth.getSession();
};
