import { trpc } from "~/trpc/client";

const useCreateForm = () => {
  const createForm = trpc.form.createForm.useMutation();
  return createForm;
};

// const useGetForm = () => {
//   const getForm = trpc.form.get.useMutation();
//   return getForm;
// };

// const useForms = () => {
//   const getForms = trpc.form.getAll.useQuery();
//   return getForms;
// };

// const useUpdateForm = () => {
//   const updateForm = trpc.form.update.useMutation();
//   return updateForm;
// };

// const useDeleteForm = () => {
//   const deleteForm = trpc.form.delete.useMutation();
//   return deleteForm;
// };

// export { useCreateForm, useGetForm, useForms, useUpdateForm, useDeleteForm };
export { useCreateForm };
