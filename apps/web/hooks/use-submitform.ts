import { trpc } from "~/trpc/client";

export const useCreateSubmission = () => {
  const utils = trpc.useUtils();
  return trpc.formSubmission.createSubmission.useMutation({
    onSuccess: () => {
      utils.formSubmission.invalidate();
    },
  });
};

export const useSubmitForm = useCreateSubmission;

export const useGetSubmissionsByForm = (formId: string) => {
  return trpc.formSubmission.getSubmissionsByForm.useQuery({ formId }, { enabled: !!formId });
};

export const useGetSubmissionById = (submissionId: string) => {
  return trpc.formSubmission.getSubmissionById.useQuery(
    { submissionId },
    { enabled: !!submissionId },
  );
};

export const useDeleteSubmission = () => {
  const utils = trpc.useUtils();
  return trpc.formSubmission.deleteSubmission.useMutation({
    onSuccess: () => {
      utils.formSubmission.invalidate();
    },
  });
};
