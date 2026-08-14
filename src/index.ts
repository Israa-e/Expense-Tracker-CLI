#!/usr/bin/env node
import { Command } from "commander";
import { handleAdd } from "./commands/add.js";
import { handleDelete } from "./commands/delete.js";
import { handleList } from "./commands/list.js";
import { handleSummary } from "./commands/summary.js";
import { handleUpdate } from "./commands/update.js";

const program = new Command();

program
  .name("expense-tracker")
  .description("A simple CLI expense tracker")
  .version("1.0.0");
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount")
  .action((options) => {
    handleAdd(options);
  });

program
  .command("list")
  .description("List all expenses")
  .action(() => {
    handleList();
  });

program
  .command("summary")
  .description("Show expense summary")
  .option("-m, --month <month>", "Show summary for a specific month")
  .action((options) => {
    handleSummary(options);
  });

program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("-i, --id <id>", "Expense ID")
  .action((options) => {
    handleDelete(options);
  });

program
  .command("update")
  .description("Update an expense")
  .requiredOption("-i, --id <id>", "Expense ID")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount")
  .action((options) => {
    handleUpdate(options);
  });

program.parse();