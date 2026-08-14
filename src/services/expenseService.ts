import type { Expense } from "../types/expense.js";
import { readExpenses, saveExpenses } from "../storage/expenseStorage.js";

export function addExpense(
  description: string,
  amount: number,
): Expense {
  const expenses = readExpenses();

  const expense: Expense = {
    id: getNextId(expenses),
    date: new Date().toISOString().split("T")[0] ?? "",
    description,
    amount,
  };

  expenses.push(expense);

  saveExpenses(expenses);

  return expense;
}
function getNextId(expenses: Expense[]): number {
  if (expenses.length === 0) {
    return 1;
  }

  return Math.max(...expenses.map((expense) => expense.id)) + 1;
}

export function deleteExpense(id: number): boolean {
  const expenses = readExpenses();

  const expenseExists = expenses.some(
    (expense) => expense.id === id,
  );

  if (!expenseExists) {
    return false;
  }

  const updatedExpenses = expenses.filter(
    (expense) => expense.id !== id,
  );

  saveExpenses(updatedExpenses);

  return true;
}


export function updateExpense(id: number, description: string, amount: number): boolean {
  const expenses = readExpenses();
  const foundExpense = expenses.find(expense => expense.id === id)
  if (!foundExpense) {
    return false;
  }
  foundExpense.amount=amount
  foundExpense.description=description
  
  saveExpenses(expenses);
  return true;


}