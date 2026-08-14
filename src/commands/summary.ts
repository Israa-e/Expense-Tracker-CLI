import { readExpenses } from "../storage/expenseStorage.js";

type SummaryOptions = {
  month?: string;
};

export function handleSummary(options: SummaryOptions): void {
  const expenses = readExpenses();

  if (expenses.length === 0) {
    console.log("No expenses found.");
    return;
  }

  if (options.month !== undefined) {
    const month = Number(options.month);

    if (!Number.isInteger(month) || month < 1 || month > 12) {
      console.error("Month must be a number between 1 and 12.");
      process.exit(1);
    } const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter((expense) => {
      const [year, expenseMonth] = expense.date.split("-");

      return (
        Number(year) === currentYear &&
        Number(expenseMonth) === month
      );
    });

    const total = monthlyExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    const monthName = new Date(
      new Date().getFullYear(),

      month - 1,
    ).toLocaleString("en-US", {
      month: "long",
    });

    console.log(
      `Total expenses for ${monthName}: $${total}`,
    );

    return;
  }

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  console.log(`Total expenses: $${total}`);
}