import { deleteExpense } from "../services/expenseService.js";

type DeleteOptions = {
  id: string;
};

export function handleDelete(options: DeleteOptions): void {
  const id = Number(options.id);

  if (!Number.isInteger(id) || id <= 0) {
    console.error("ID must be a positive integer.");
    process.exit(1);
  }

  const deleted = deleteExpense(id);

  if (!deleted) {
    console.error(`Expense with ID ${id} not found.`);
    process.exit(1);
  }

  console.log("Expense deleted successfully");
}