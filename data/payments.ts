export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a1b2c3d4",
    amount: 200,
    status: "success",
    email: "a@example.com",
  },
  {
    id: "e5f6g7h8",
    amount: 150,
    status: "failed",
    email: "e@example.com",
  },
  // ...
];
