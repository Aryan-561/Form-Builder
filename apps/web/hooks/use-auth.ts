import { useMutation } from "@tanstack/react-query";
import { createClient } from "~/lib/supabase/client";
import { trpc } from "~/trpc/client";
import type {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";

export const useSignUp = () => {
  const supabase = createClient();
  const utils = trpc.useUtils();

  return useMutation({
    mutationFn: async (credentials: SignUpWithPasswordCredentials) => {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) throw error;
      return data;
    },
    onSuccess: async (data) => {
      const user = data.user;
      if (!user?.email) return;

      // Ensure a row exists in public.users for this new auth user.
      // user.me auto-creates the row if it's missing (new signup recovery).
      // await utils.user.me.fetch({ id: user.id, email: user.email });
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
