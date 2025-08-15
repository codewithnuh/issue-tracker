import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/react";
import { CreateIssueForm } from "@/components/create-issue";
import { createIssue } from "@/actions/issues.action";
import { vi } from "vitest";

vi.mock("@/actions/issues.action", () => ({
  createIssue: vi.fn().mockResolvedValue({ success: true }),
}));

describe("CreateIssueForm", () => {
  it("submits with correct values", async () => {
    render(<CreateIssueForm />, { container: document.body });

    await userEvent.type(screen.getByLabelText(/title/i), "Login bug");
    await userEvent.type(
      screen.getByLabelText(/description/i),
      "Login button fails"
    );

    await userEvent.click(screen.getByText(/select status/i));
    await userEvent.click(screen.getByText(/open/i));

    await userEvent.click(screen.getByText(/select priority/i));
    await userEvent.click(screen.getByText(/high/i));

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(createIssue).toHaveBeenCalledWith({
        title: "Login bug",
        description: "Login button fails",
        status: "open",
        priority: "high",
      });
    });
  });
});
