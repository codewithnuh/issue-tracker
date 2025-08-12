import React from "react";
import { Issue } from "../generated/prisma";
import { fetchAllIssues } from "@/actions/issues.action";
import { DataTable } from "./data-table";
import { columns } from "./columns";
async function getData(): Promise<Issue[]> {
  const issues = await fetchAllIssues();
  return issues;
}
const IssuesPage = async () => {
  const data = await getData();
  console.log(data);
  return (
    <div className="container mx-auto px-4 ">
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold mb-4">View All Issues Here</h1>
      </div>
      <DataTable columns={columns} data={data} />
      {/* Add your issues content here */}
      {/* You can fetch and display issues from your database or API */}
    </div>
  );
};

export default IssuesPage;
