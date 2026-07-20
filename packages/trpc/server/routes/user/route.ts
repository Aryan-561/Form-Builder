import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../../trpc";
import { userService } from "../../services";
import { userProfileOutput, updateProfileInput, planOutput } from "./model";
import { z } from "zod";

export const userRouter = router({
  /**
   * user.me — returns the full application profile for a given user id.
   * The id comes from the Supabase session (ctx.user.id or passed from frontend).
   *
   * If the row is missing (trigger failure), it auto-creates one from the provided id + email.
   */
  me: publicProcedure
    .input(z.object({ id: z.string().uuid(), email: z.string().email() }))
    .output(userProfileOutput)
    .query(async ({ input }) => {
      try {
        return await userService.getProfile(input.id, input.email);
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to get user profile.",
        });
      }
    }),

  /**
   * user.updateProfile — updates fullName and/or profileImageUrl.
   */
  updateProfile: publicProcedure
    .input(updateProfileInput.extend({ id: z.string().uuid() }))
    .output(userProfileOutput)
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      try {
        return await userService.updateProfile(id, updates);
      } catch (error: any) {
        throw new TRPCError({ code: "NOT_FOUND", message: error.message || "User not found." });
      }
    }),

  /**
   * user.getPlan — returns plan and credits for a given user id.
   */
  getPlan: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .output(planOutput)
    .query(async ({ input }) => {
      try {
        return await userService.getPlan(input.id);
      } catch (error: any) {
        throw new TRPCError({ code: "NOT_FOUND", message: error.message || "User not found." });
      }
    }),
});
