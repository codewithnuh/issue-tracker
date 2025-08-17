"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
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
    header: () => (
      <div className="text-center bg-orange-500/60 text-white font-bold p-[0.3rem] rounded-md">
        Status
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const originalRowData = row.original;
      return (
        <div className="flex items-center justify-center space-x-4 ">
          {/* <form action=""></form> */}
          <Button variant={"secondary"} asChild className="space-x-3">
            <Link href={`/issues/edit/${originalRowData.id}`}>
              Edit <Edit />
            </Link>
          </Button>
          <Button variant={"destructive"} className="space-x-3">
            Edit <Trash />
          </Button>
        </div>
      );
    },
  },
];
