import { formOptions } from "@tanstack/react-form/nextjs";
export const formOpts = formOptions({
  defaultValues: {
    status: "open",
    title: "",
    description: "",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
});
export type FormValues = typeof formOpts.defaultValues;
