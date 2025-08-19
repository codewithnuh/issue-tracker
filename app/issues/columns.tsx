"use client";
import { deleteIssue } from "@/actions/issues.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";

const DeleteIssueForm = ({ issueId }: { issueId: string }) => {
  const [state, formAction, isPending] = useActionState(deleteIssue, {
    success: false,
    message: "",
    data: "",
  });

  useEffect(() => {
    if (state.message && state.message.length > 0) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={issueId} />
      <AlertDialogAction type="submit" disabled={isPending}>
        {isPending ? "Deleting..." : "Confirm"}
      </AlertDialogAction>
    </form>
  );
};

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
    enableHiding: false,
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                Delete <Trash className="ml-2" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <DeleteIssueForm issueId={row.original.id} />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
