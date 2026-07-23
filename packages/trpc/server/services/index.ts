import { UserService } from "@repo/services/user";
import { FormService } from "@repo/services/form";
import { FormSubmissionService } from "@repo/services/formSubmission";
import { AnalyticsService } from "@repo/services/analytics";

export const userService = new UserService();
export const formService = new FormService();
export const formSubmissionService = new FormSubmissionService();
export const analyticsService = new AnalyticsService();
