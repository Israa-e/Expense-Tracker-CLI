import { addExpense } from "../services/expenseService.js";

type AddOptions = {
    description: string;
    amount: string;
};
export function handleAdd(options: AddOptions): void {
    const amount = Number(options.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
        console.error("Amount must be a positive number.");
        process.exit(1);
    }

    const expense = addExpense(
        options.description,
        amount,
    );

    console.log(
        `Expense added successfully (ID: ${expense.id})`,
    );
}