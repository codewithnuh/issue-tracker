"use server";

import { prisma } from "@/utils/prismaClient";
import { createServerValidate } from "@tanstack/react-form/nextjs";
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
export const fetchOneIssue = async (id: string) => {
  const issue = await prisma.issue.findFirst({
    where: { id },
  });
  return issue;
};
export const createIssue = async (
  prev: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  data: unknown;
  message: string;
}> => {
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
    return {
      success: true,
      message: "Issue created successfully",
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Issue not created successfully",
      data: "",
    };
  }
};
export const updateIssue = async (
  prev: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  data: unknown;
  message: string;
}> => {
  try {
    const validatedData = await serverValidate(formData);
    const { id, title, description, status, priority } = validatedData;
    if (!id) {
      return {
        success: false,
        message: "Issue ID is required for update",
        data: "",
      };
    }
    const data = await prisma.issue.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        updatedAt: new Date(),
      },
    });
    console.log("Issue updated:", data);
    return {
      success: true,
      message: "Issue updated successfully",
      data: data,
    };
  } catch (error) {
    console.error("Error updating issue:", error);
    return {
      success: false,
      message: "Issue not updated successfully",
      data: "",
    };
  }
};
