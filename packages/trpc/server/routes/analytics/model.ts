import { z } from "zod";

export const timeFilterSchema = z.enum(["today", "7d", "30d", "90d", "year", "all"]).default("30d");

export const getDashboardStatsInputModel = z.object({
  filter: timeFilterSchema.optional(),
});

export const responseTrendPointModel = z.object({
  label: z.string(),
  timestamp: z.string(),
  count: z.number(),
});

export const recentCreatedFormModel = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(["draft", "publish", "private", "unpublish"]),
  totalResponses: z.number(),
  totalViews: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const recentSubmittedResponseModel = z.object({
  id: z.string(),
  formId: z.string(),
  formTitle: z.string(),
  submittedAt: z.date(),
});

export const getDashboardStatsOutputModel = z.object({
  forms: z.object({
    totalForms: z.number(),
    publishedForms: z.number(),
    draftForms: z.number(),
    privateForms: z.number(),
    archivedForms: z.number(),
  }),
  responses: z.object({
    totalResponses: z.number(),
    responsesToday: z.number(),
    responsesLast7Days: z.number(),
    responsesLast30Days: z.number(),
  }),
  analytics: z.object({
    selectedFilter: timeFilterSchema,
    responseTrend: z.array(responseTrendPointModel),
    avgResponsesPerForm: z.number(),
    responseGrowthPercentage: z.number(),
    mostActiveDay: z
      .object({
        date: z.string(),
        count: z.number(),
      })
      .nullable(),
    bestPerformingForm: z
      .object({
        id: z.string(),
        title: z.string(),
        responseCount: z.number(),
      })
      .nullable(),
  }),
  recentData: z.object({
    recentCreatedForms: z.array(recentCreatedFormModel),
    recentSubmittedResponses: z.array(recentSubmittedResponseModel),
  }),
});
