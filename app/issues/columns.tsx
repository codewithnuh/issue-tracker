"use client";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<issue>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
