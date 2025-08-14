import { CreateIssueForm } from "@/components/create-issue";
import React from "react";

const CreateIssuePage = () => {
  return (
    <div className="container px-4 mt-10 mx-auto">
      <h2 className="font-bold text-4xl text-center">Create Issue</h2>
      <div className="mt-10">
        <CreateIssueForm />
      </div>
    </div>
  );
};

export default CreateIssuePage;
