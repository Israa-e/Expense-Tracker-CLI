import { readExpenses } from "../storage/expenseStorage.js";


export function handleList(): void {

    const expenses = readExpenses()
    if (expenses.length === 0) {
        console.log("No expenses found.");
        return;
    }
    console.log(`ID  Date         Description     Amount`)

    for (const expense of expenses) {
console.log(
  `${String(expense.id).padEnd(4)}${expense.date.padEnd(13)}${expense.description.padEnd(20)}$${expense.amount}`,
);    }
}