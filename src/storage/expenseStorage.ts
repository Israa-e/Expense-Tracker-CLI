import { existsSync, writeFileSync, readFileSync } from "node:fs";
import type { Expense } from "../types/expense.js";

const FILE_PATH =   "./data/expenses.json"

export function readExpenses():Expense[]{

    if(!existsSync(FILE_PATH)){
        return []
    }
    const data = readFileSync(FILE_PATH,"utf-8"
    )
 if (!data.trim()) {
    return [];
  }

  try {
    return JSON.parse(data) as Expense[];
  } catch {
    console.error("Could not read expenses data.");
    process.exit(1);
  }
}


export function saveExpenses(expense:Expense[]):void{
    writeFileSync(FILE_PATH,JSON.stringify(expense,null,2))

}

