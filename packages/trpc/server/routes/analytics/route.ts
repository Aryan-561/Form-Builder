import { UUidInput } from "@repo/validators/src";
import { analyticsService } from "../../services";
import { router, protectedProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { getDashboardStatsInputModel, getDashboardStatsOutputModel } from "./model";

const TAGS = ["Analytics"];
const getPath = generatePath("/analytics");

export const analyticsRouter = router({
  getDashboardStats: protectedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/stats"), tags: TAGS } })
    .input(getDashboardStatsInputModel)
    .output(getDashboardStatsOutputModel)
    .query(async ({ input, ctx }) => {
      const userId = ctx.user?.id as UUidInput;
      return await analyticsService.getDashboardStats(userId, input.filter ?? "30d");
    }),
});
