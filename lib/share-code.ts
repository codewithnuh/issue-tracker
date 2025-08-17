import { formOptions } from "@tanstack/react-form/nextjs";
export const formOpts = formOptions({
  defaultValues: {
    id: "",
    status: "open",
    title: "",
    description: "",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});
type FormValuesRaw = typeof formOpts.defaultValues;
export type FormValues = Omit<FormValuesRaw, "id"> & {
  id?: string;
};
