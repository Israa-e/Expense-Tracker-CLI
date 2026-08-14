import { updateExpense } from "../services/expenseService.js";
type UpdateOptions = {
  id: string;
  description: string;
  amount: string;
};

export function handleUpdate(options: UpdateOptions): void {
  const id = Number(options.id);
  const amount = Number(options.amount);

  if (!Number.isInteger(id) || id <= 0) {
    console.error("ID must be a positive integer.");
    process.exit(1);
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    console.error("Amount must be a positive number.");
    process.exit(1);
  }

  const updated = updateExpense(
    id,
    options.description,
    amount,
  );

  if (!updated) {
    console.error(`Expense with ID ${id} not found.`);
    process.exit(1);
  }

  console.log("Expense updated successfully");
}