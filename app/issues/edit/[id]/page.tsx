import { fetchOneIssue, updateIssue } from "@/actions/issues.action";
import { IssueForm } from "@/components/issue-form";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const issueId = (await params).id;

  if (!issueId) {
    return notFound();
  }
  const fetchIssueById = await fetchOneIssue(issueId);
  if (!fetchIssueById) {
    return notFound();
  }

  const initialValues = {
    title: fetchIssueById.title,
    description: fetchIssueById.description || "",
    status: fetchIssueById.status,
    priority: fetchIssueById.priority,
    createdAt: fetchIssueById.createdAt.toISOString(),
    updatedAt: fetchIssueById.updatedAt.toISOString(),
  };
  console.log("initialValues", initialValues);
  return (
    <main>
      <div className="container px-4 mt-10 mx-auto">
        <h2 className="font-bold text-4xl text-center">Edit Issue</h2>
        <div className="mt-10 flex justify-center items-center">
          <IssueForm
            type="update"
            initialValues={initialValues}
            serverAction={updateIssue}
            issueId={issueId}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
