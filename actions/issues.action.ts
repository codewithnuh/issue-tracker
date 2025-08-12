"use server";

import { prisma } from "@/utils/prismaClient";

export const fetchAllIssues = async () => {
  const issues = await prisma.issue.findMany({});
  return issues;
};
