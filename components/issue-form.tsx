"use client";
import { useActionState, useEffect } from "react";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { createIssue } from "@/actions/issues.action";
import { formOpts, FormValues } from "@/lib/share-code";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

export const IssueForm = ({
  serverAction,
  issueId,
  type,
  initialValues,
}: {
  serverAction: (state: any, payload: FormData) => any;
  type: "create" | "update";
  initialValues?: FormValues;
  issueId?: string;
}) => {
  const [state, action, isPending] = useActionState(
    serverAction,
    type == "update"
      ? { ...initialValues, id: issueId }
      : (formOpts.defaultValues as any)
  );
  useEffect(() => {
    if (state.success) {
      toast.success(state.message, state.data);
    } else {
      toast.error(state.message, state.data);
    }
  }, [state]);
  const form = useForm({
    defaultValues:
      type == "update"
        ? { ...initialValues, id: issueId }
        : formOpts.defaultValues,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
  });
  const formErrors = useStore(form.store, (formState) => formState.errors);
  return (
    <form action={action as never} className="max-w-md mx-auto space-y-2">
      {formErrors.map((error) => (
        <p key={error as unknown as string}>{error}</p>
      ))}
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => (value ? undefined : "Title is required"),
        }}
      >
        {(field) => {
          return (
            <div>
              <Label className="mb-2" htmlFor={field.name}>
                Title
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as string)}
              />
              {field.state.meta.errors.map((error) => (
                <p className="text-red-500" key={error as string}>
                  {error}
                </p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <form.Field name="id">
        {(field) => {
          return (
            <div>
              <Label className="mb-2" htmlFor={field.name}>
                Id
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="text"
                className="hidden"
                value={field.state.value}
              />
            </div>
          );
        }}
      </form.Field>
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }) =>
            value ? undefined : "Description is required",
        }}
      >
        {(field) => {
          return (
            <div>
              <Label className="mb-2" htmlFor={field.name}>
                Description
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as string)}
              />
              {field.state.meta.errors.map((error) => (
                <p className="text-red-500" key={error as string}>
                  {error}
                </p>
              ))}
            </div>
          );
        }}
      </form.Field>
      <div className="flex items-center  space-x-4">
        <form.Field
          name="status"
          validators={{
            onChange: ({ value }) => (value ? undefined : "Status is required"),
          }}
        >
          {(field) => {
            return (
              <div>
                <Label className="mb-2" htmlFor={field.name}>
                  Status
                </Label>
                <Select
                  name="status"
                  value={field.state.value}
                  onValueChange={(e) =>
                    field.handleChange(e as "open" | "closed")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Close</SelectItem>
                  </SelectContent>
                </Select>

                {field.state.meta.errors.map((error) => (
                  <p className="text-red-500" key={error as string}>
                    {error}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="priority"
          validators={{
            onChange: ({ value }) =>
              value ? undefined : "Priority is required",
          }}
        >
          {(field) => {
            return (
              <div>
                <Label className="mb-2" htmlFor={field.name}>
                  Priority
                </Label>
                <Select
                  name="priority"
                  value={field.state.value}
                  onValueChange={(e) =>
                    field.handleChange(e as "high" | "medium" | "low")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                {field.state.meta.errors.map((error) => (
                  <p className="text-red-500" key={error as string}>
                    {error}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
