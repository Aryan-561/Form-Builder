import { trpc } from "~/trpc/client";

const DUMMY_UUID = "00000000-0000-0000-0000-000000000000";

const useMe = () =>
  trpc.user.me.useQuery({ id: DUMMY_UUID, email: "himanshutamoli2005@gmail.com" });

const useUpdateProfile = () => trpc.user.updateProfile.useMutation();

const useGetPlan = () => trpc.user.getPlan.useQuery({ id: DUMMY_UUID });

export { useMe, useUpdateProfile, useGetPlan };
