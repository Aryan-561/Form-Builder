import { trpc } from "~/trpc/client";

export const useMe = () => trpc.user.me.useQuery();

export const useGetPlan = () => trpc.user.getPlan.useQuery();

export const useUpdateProfile = () => trpc.user.updateProfile.useMutation();
