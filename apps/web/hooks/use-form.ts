import { trpc } from "~/trpc/client";

const useCreateForm = () => {
  const utils = trpc.useUtils();
  const createForm = trpc.form.createForm.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
  });
  return createForm;
};

const useForm = (formId: string) => {
  const getForm = trpc.form.getUserFormById.useQuery(
    { formId },
    { refetchOnWindowFocus: true, staleTime: 0 },
  );
  return getForm;
};

const useLiveForm = (formId: string) => {
  const getForm = trpc.form.getLiveFormById.useQuery(
    { formId },
    { refetchOnWindowFocus: true, staleTime: 0 },
  );
  return getForm;
};

const useForms = () => {
  const getForms = trpc.form.getUserForms.useQuery();
  return getForms;
};

const useUpdateForm = () => {
  const utils = trpc.useUtils();
  const updateForm = trpc.form.updateForm.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
  });
  return updateForm;
};

const useDeleteForm = () => {
  const utils = trpc.useUtils();
  const deleteForm = trpc.form.deleteForm.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
  });
  return deleteForm;
};

const useUpdateStatus = () => {
  const utils = trpc.useUtils();
  const updateStatus = trpc.form.updateStatus.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
  });
  return updateStatus;
};

const useGenerateFormWithAi = () => {
  const utils = trpc.useUtils();
  const generateForm = trpc.ai.generateForm.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
  });
  return generateForm;
};

export {
  useCreateForm,
  useUpdateForm,
  useForm,
  useForms,
  useDeleteForm,
  useUpdateStatus,
  useLiveForm,
  useGenerateFormWithAi,
};
