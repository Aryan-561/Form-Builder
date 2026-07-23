import db, { eq, and, gte, lte, sql, desc, inArray, count } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formSubmisssoinsTable } from "@repo/database/models/form_submission";
import type { UUidInput } from "@repo/validators/src";

export type TimeFilter = "today" | "7d" | "30d" | "90d" | "year" | "all";

export interface ResponseTrendPoint {
  label: string;
  timestamp: string;
  count: number;
}

export interface RecentCreatedForm {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "publish" | "private" | "unpublish";
  totalResponses: number;
  totalViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecentSubmittedResponse {
  id: string;
  formId: string;
  formTitle: string;
  submittedAt: Date;
}

export interface DashboardStatsOutput {
  forms: {
    totalForms: number;
    publishedForms: number;
    draftForms: number;
    privateForms: number;
    archivedForms: number;
  };
  responses: {
    totalResponses: number;
    responsesToday: number;
    responsesLast7Days: number;
    responsesLast30Days: number;
  };
  analytics: {
    selectedFilter: TimeFilter;
    responseTrend: ResponseTrendPoint[];
    avgResponsesPerForm: number;
    responseGrowthPercentage: number;
    mostActiveDay: { date: string; count: number } | null;
    bestPerformingForm: { id: string; title: string; responseCount: number } | null;
  };
  recentData: {
    recentCreatedForms: RecentCreatedForm[];
    recentSubmittedResponses: RecentSubmittedResponse[];
  };
}

export class AnalyticsService {
  private getDateRanges(filter: TimeFilter) {
    const now = new Date();
    let currentStart: Date | null = null;
    let previousStart: Date | null = null;
    let previousEnd: Date | null = null;

    switch (filter) {
      case "today": {
        currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        previousStart = new Date(currentStart.getTime() - 24 * 60 * 60 * 1000);
        previousEnd = currentStart;
        break;
      }
      case "7d": {
        currentStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        previousEnd = currentStart;
        break;
      }
      case "30d": {
        currentStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        previousEnd = currentStart;
        break;
      }
      case "90d": {
        currentStart = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        previousStart = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        previousEnd = currentStart;
        break;
      }
      case "year": {
        currentStart = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
        previousStart = new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
        previousEnd = currentStart;
        break;
      }
      case "all": {
        currentStart = null;
        previousStart = null;
        previousEnd = null;
        break;
      }
    }

    return { now, currentStart, previousStart, previousEnd };
  }

  async getDashboardStats(
    userId: UUidInput,
    filter: TimeFilter = "30d",
  ): Promise<DashboardStatsOutput> {
    // 1. Get user forms
    const userForms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        slug: formsTable.slug,
        status: formsTable.status,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
      })
      .from(formsTable)
      .where(eq(formsTable.createdBy, userId));

    const userFormIds = userForms.map((f) => f.id);

    // Form Stats
    const totalForms = userForms.length;
    const publishedForms = userForms.filter((f) => f.status === "publish").length;
    const draftForms = userForms.filter((f) => f.status === "draft").length;
    const privateForms = userForms.filter((f) => f.status === "private").length;
    const archivedForms = userForms.filter((f) => f.status === "unpublish").length;

    if (userFormIds.length === 0) {
      return {
        forms: {
          totalForms: 0,
          publishedForms: 0,
          draftForms: 0,
          privateForms: 0,
          archivedForms: 0,
        },
        responses: {
          totalResponses: 0,
          responsesToday: 0,
          responsesLast7Days: 0,
          responsesLast30Days: 0,
        },
        analytics: {
          selectedFilter: filter,
          responseTrend: [],
          avgResponsesPerForm: 0,
          responseGrowthPercentage: 0,
          mostActiveDay: null,
          bestPerformingForm: null,
        },
        recentData: {
          recentCreatedForms: [],
          recentSubmittedResponses: [],
        },
      };
    }

    // 2. Fetch all submissions for user's forms
    const allSubmissions = await db
      .select({
        id: formSubmisssoinsTable.id,
        formId: formSubmisssoinsTable.formId,
        createdAt: formSubmisssoinsTable.createdAt,
      })
      .from(formSubmisssoinsTable)
      .where(inArray(formSubmisssoinsTable.formId, userFormIds))
      .orderBy(desc(formSubmisssoinsTable.createdAt));

    // Response counters
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const startOf7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOf30DaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalResponses = allSubmissions.length;
    const responsesToday = allSubmissions.filter((s) => s.createdAt >= startOfToday).length;
    const responsesLast7Days = allSubmissions.filter((s) => s.createdAt >= startOf7DaysAgo).length;
    const responsesLast30Days = allSubmissions.filter(
      (s) => s.createdAt >= startOf30DaysAgo,
    ).length;

    // 3. Filtered calculations for selected filter
    const { currentStart, previousStart, previousEnd } = this.getDateRanges(filter);

    const currentPeriodSubmissions = currentStart
      ? allSubmissions.filter((s) => s.createdAt >= currentStart)
      : allSubmissions;

    const previousPeriodSubmissions =
      previousStart && previousEnd
        ? allSubmissions.filter((s) => s.createdAt >= previousStart && s.createdAt < previousEnd)
        : [];

    // Growth percentage calculation
    let responseGrowthPercentage = 0;
    if (filter !== "all") {
      const currentCount = currentPeriodSubmissions.length;
      const prevCount = previousPeriodSubmissions.length;
      if (prevCount > 0) {
        responseGrowthPercentage = Number(
          (((currentCount - prevCount) / prevCount) * 100).toFixed(1),
        );
      } else if (currentCount > 0) {
        responseGrowthPercentage = 100;
      }
    }

    // Average responses per form in current period
    const avgResponsesPerForm =
      totalForms > 0 ? Number((currentPeriodSubmissions.length / totalForms).toFixed(2)) : 0;

    // Response trend grouping
    const responseTrendMap = new Map<string, { label: string; timestamp: string; count: number }>();

    if (filter === "today") {
      for (let h = 0; h < 24; h++) {
        const hourStr = h.toString().padStart(2, "0") + ":00";
        responseTrendMap.set(hourStr, { label: hourStr, timestamp: hourStr, count: 0 });
      }
      currentPeriodSubmissions.forEach((s) => {
        const hourStr = s.createdAt.getHours().toString().padStart(2, "0") + ":00";
        const item = responseTrendMap.get(hourStr);
        if (item) item.count++;
      });
    } else if (filter === "7d" || filter === "30d") {
      const daysCount = filter === "7d" ? 7 : 30;
      for (let i = daysCount - 1; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = d.toISOString().split("T")[0]!;
        responseTrendMap.set(dateStr, { label: dateStr, timestamp: dateStr, count: 0 });
      }
      currentPeriodSubmissions.forEach((s) => {
        const dateStr = s.createdAt.toISOString().split("T")[0]!;
        const item = responseTrendMap.get(dateStr);
        if (item) item.count++;
      });
    } else if (filter === "year" || filter === "90d" || filter === "all") {
      currentPeriodSubmissions.forEach((s) => {
        const key = `${s.createdAt.getFullYear()}-${(s.createdAt.getMonth() + 1).toString().padStart(2, "0")}`;
        const existing = responseTrendMap.get(key) || { label: key, timestamp: key, count: 0 };
        existing.count++;
        responseTrendMap.set(key, existing);
      });
    }

    const responseTrend = Array.from(responseTrendMap.values());

    // Most Active Day
    const dayCounts = new Map<string, number>();
    currentPeriodSubmissions.forEach((s) => {
      const dateStr = s.createdAt.toISOString().split("T")[0]!;
      dayCounts.set(dateStr, (dayCounts.get(dateStr) || 0) + 1);
    });

    let mostActiveDay: { date: string; count: number } | null = null;
    let maxDayCount = 0;
    dayCounts.forEach((cnt, dateStr) => {
      if (cnt > maxDayCount) {
        maxDayCount = cnt;
        mostActiveDay = { date: dateStr, count: cnt };
      }
    });

    // Best Performing Form
    const formSubmissionCounts = new Map<string, number>();
    currentPeriodSubmissions.forEach((s) => {
      formSubmissionCounts.set(s.formId, (formSubmissionCounts.get(s.formId) || 0) + 1);
    });

    let bestPerformingForm: { id: string; title: string; responseCount: number } | null = null;
    let maxFormResponses = 0;
    const formMap = new Map(userForms.map((f) => [f.id, f.title]));

    formSubmissionCounts.forEach((cnt, formId) => {
      if (cnt > maxFormResponses) {
        maxFormResponses = cnt;
        bestPerformingForm = {
          id: formId,
          title: formMap.get(formId) || "Untitled Form",
          responseCount: cnt,
        };
      }
    });

    // 4. Recent Data
    // Count responses per form overall for recent created forms
    const totalResponsesPerFormMap = new Map<string, number>();
    allSubmissions.forEach((s) => {
      totalResponsesPerFormMap.set(s.formId, (totalResponsesPerFormMap.get(s.formId) || 0) + 1);
    });

    const recentCreatedForms: RecentCreatedForm[] = [...userForms]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map((f) => ({
        id: f.id,
        title: f.title,
        slug: f.slug,
        status: f.status,
        totalResponses: totalResponsesPerFormMap.get(f.id) || 0,
        totalViews: 0,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      }));

    const recentSubmittedResponses: RecentSubmittedResponse[] = allSubmissions
      .slice(0, 5)
      .map((s) => ({
        id: s.id,
        formId: s.formId,
        formTitle: formMap.get(s.formId) || "Untitled Form",
        submittedAt: s.createdAt,
      }));

    return {
      forms: {
        totalForms,
        publishedForms,
        draftForms,
        privateForms,
        archivedForms,
      },
      responses: {
        totalResponses,
        responsesToday,
        responsesLast7Days,
        responsesLast30Days,
      },
      analytics: {
        selectedFilter: filter,
        responseTrend,
        avgResponsesPerForm,
        responseGrowthPercentage,
        mostActiveDay,
        bestPerformingForm,
      },
      recentData: {
        recentCreatedForms,
        recentSubmittedResponses,
      },
    };
  }
}
