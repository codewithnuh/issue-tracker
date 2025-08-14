"use server";

import { prisma } from "@/utils/prismaClient";
import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "@/lib/share-code";
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.title) {
      return "Title is required";
    }
    if (!value.description) {
      return "Description is required";
    }
    if (!value.priority) {
      return "Priority is required";
    }
    if (!value.status) {
      return "Status is required";
    }
  },
});
export const fetchAllIssues = async () => {
  const issues = await prisma.issue.findMany({});
  return issues;
};

export const createIssue = async (prev: unknown, formData: FormData) => {
  try {
    const validatedData = await serverValidate(formData);
    const { title, description, status, priority } = validatedData;

    const data = await prisma.issue.create({
      data: {
        title,
        description,
        status,
        priority,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("Issue created:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
