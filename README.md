Absolutely. Since this is one of your portfolio projects, I'd make the README **much more detailed**, explaining the architecture, design decisions, installation, every command, validation, testing, and examples.

Replace your current `README.md` with this:

````markdown
# 💰 Expense Tracker CLI

A simple and lightweight **Command-Line Expense Tracker** built with **TypeScript** and **Node.js**.

The application allows users to manage their personal expenses directly from the terminal. Users can add, list, update, delete, and summarize expenses. The application stores data locally in a JSON file, so no external database is required.

This project was built as part of the [roadmap.sh Expense Tracker project](https://roadmap.sh/projects/expense-tracker).

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies](#-technologies)
- [Project Requirements](#-project-requirements)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Building the Project](#-building-the-project)
- [CLI Usage](#-cli-usage)
  - [Add Expense](#1-add-expense)
  - [List Expenses](#2-list-expenses)
  - [View Summary](#3-view-summary)
  - [Monthly Summary](#4-monthly-summary)
  - [Update Expense](#5-update-expense)
  - [Delete Expense](#6-delete-expense)
  - [Help](#7-help)
  - [Version](#8-version)
- [Validation and Error Handling](#-validation-and-error-handling)
- [Data Storage](#-data-storage)
- [Application Flow](#-application-flow)
- [ID Generation](#-id-generation)
- [Testing](#-testing)
- [Test Coverage](#-test-coverage)
- [NPM Scripts](#-npm-scripts)
- [Design Decisions](#-design-decisions)
- [Why TypeScript](#-why-typescript)
- [Why Commander](#-why-commander)
- [Why JSON Storage](#-why-json-storage)
- [Separation of Concerns](#-separation-of-concerns)
- [Error Handling Strategy](#-error-handling-strategy)
- [Example Workflow](#-example-workflow)
- [Possible Future Improvements](#-possible-future-improvements)
- [What I Learned](#-what-i-learned)
- [Roadmap.sh](#-roadmapsh)
- [License](#-license)

---

# 📖 Overview

Expense Tracker is a command-line application designed to help users keep track of their expenses.

Instead of using a database or a graphical interface, the application provides a simple terminal-based interface.

For example:

```bash
expense-tracker add --description "Lunch" --amount 20
````

The application creates an expense and stores it locally.

Users can then view their expenses:

```bash
expense-tracker list
```

Or calculate the total:

```bash
expense-tracker summary
```

The goal of this project is not only to build an expense tracker, but also to practice important backend and CLI development concepts such as:

* Command-line applications
* TypeScript
* Node.js
* File system operations
* JSON persistence
* Input validation
* Error handling
* Modular architecture
* Separation of concerns
* Unit testing

---

# ✨ Features

The application currently supports the following features:

### Expense Management

* ✅ Add an expense
* ✅ List all expenses
* ✅ Update an expense
* ✅ Delete an expense
* ✅ View total expenses
* ✅ View expenses for a specific month

### Validation

* ✅ Validate expense amounts
* ✅ Reject negative amounts
* ✅ Reject zero amounts
* ✅ Reject invalid numeric values
* ✅ Validate expense IDs
* ✅ Reject non-positive IDs
* ✅ Handle non-existent expenses
* ✅ Validate month numbers
* ✅ Reject months outside `1-12`

### Storage

* ✅ Local JSON file storage
* ✅ Automatic file creation through the storage layer
* ✅ Read expenses from disk
* ✅ Save expenses to disk

### Development

* ✅ TypeScript
* ✅ Commander CLI parser
* ✅ Vitest unit tests
* ✅ Modular architecture
* ✅ Service layer
* ✅ Storage layer

---

# 🛠 Technologies

The project uses the following technologies:

| Technology              | Purpose                  |
| ----------------------- | ------------------------ |
| TypeScript              | Application development  |
| Node.js                 | JavaScript runtime       |
| Commander               | CLI argument parsing     |
| Vitest                  | Unit testing             |
| JSON                    | Local data persistence   |
| Node.js File System API | Reading and writing data |

---

# 📌 Project Requirements

The original project requires a command-line application that allows users to:

* Add expenses
* Update expenses
* Delete expenses
* List expenses
* View an expense summary
* View a monthly expense summary

The application should also:

* Store data in a simple file
* Handle invalid inputs
* Handle edge cases
* Use modular functions
* Be easy to test and maintain

This implementation satisfies those requirements using TypeScript, Commander, JSON storage, and Vitest.

---

# 🏗 Architecture

The application follows a simple layered architecture.

```text
                    ┌────────────────────┐
                    │      CLI User      │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │     Commander      │
                    │   CLI Parser       │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │      Commands      │
                    │ add/list/update... │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │      Services      │
                    │  Business Logic    │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │      Storage       │
                    │  Read / Write JSON │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ expenses.json      │
                    │ Local Persistence  │
                    └────────────────────┘
```

The main idea is to avoid putting all application logic inside `index.ts`.

Instead, each part of the application has a specific responsibility.

---

# 📁 Project Structure

```text
expense-tracker/
│
├── data/
│   └── expenses.json
│
├── src/
│   │
│   ├── commands/
│   │   ├── add.ts
│   │   ├── delete.ts
│   │   ├── list.ts
│   │   ├── summary.ts
│   │   └── update.ts
│   │
│   ├── services/
│   │   └── expenseService.ts
│   │
│   ├── storage/
│   │   └── expenseStorage.ts
│   │
│   ├── types/
│   │   └── expense.ts
│   │
│   └── index.ts
│
├── dist/
│
├── node_modules/
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# 🧩 Directory Responsibilities

## `src/index.ts`

This is the application's entry point.

It creates the Commander program and registers all CLI commands.

The entry point is responsible for defining commands such as:

```text
add
list
summary
delete
update
```

It should not contain the actual business logic.

---

## `src/commands/`

The `commands` directory contains the logic responsible for handling user input.

Files:

```text
add.ts
delete.ts
list.ts
summary.ts
update.ts
```

For example:

```text
User
 ↓
expense-tracker add
 ↓
add.ts
 ↓
expenseService.ts
```

The command layer handles things such as:

* Reading CLI options
* Converting strings to numbers
* Validating user input
* Calling the appropriate service
* Printing success/error messages

---

## `src/services/`

The service layer contains the application's business logic.

Currently:

```text
expenseService.ts
```

It contains functions such as:

```text
addExpense()
deleteExpense()
updateExpense()
```

The service layer does not need to know how the user entered the data.

It simply receives values and performs the required operation.

For example:

```text
addExpense("Lunch", 20)
```

The service:

1. Reads existing expenses
2. Generates a new ID
3. Creates the expense
4. Adds it to the array
5. Saves the updated array
6. Returns the created expense

---

## `src/storage/`

The storage layer is responsible for persistence.

Currently:

```text
expenseStorage.ts
```

It provides functions such as:

```text
readExpenses()
saveExpenses()
```

The rest of the application does not need to know how the JSON file works.

For example:

```text
Service
   ↓
readExpenses()
   ↓
expenses.json
```

This separation also makes it easier to replace JSON storage with a database in the future.

---

## `src/types/`

This directory contains TypeScript types.

The main type is:

```typescript
type Expense = {
  id: number;
  date: string;
  description: string;
  amount: number;
};
```

This ensures that expenses follow a consistent structure throughout the application.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

---

## 2. Enter the project directory

```bash
cd expense-tracker
```

---

## 3. Install dependencies

```bash
npm install
```

This installs the required packages including:

* Commander
* TypeScript
* Node.js type definitions
* Vitest

---

# 🔨 Building the Project

The project is written in TypeScript, so it must be compiled before running the compiled CLI.

Run:

```bash
npm run build
```

The TypeScript compiler generates JavaScript files inside:

```text
dist/
```

For example:

```text
src/index.ts
```

becomes:

```text
dist/index.js
```

---

# 💻 CLI Usage

The CLI executable is:

```bash
expense-tracker
```

---

# 1. Add Expense

To add an expense:

```bash
expense-tracker add --description "Lunch" --amount 20
```

Output:

```text
Expense added successfully (ID: 1)
```

Short options are also available:

```bash
expense-tracker add -d "Lunch" -a 20
```

### Arguments

| Option          | Description                |
| --------------- | -------------------------- |
| `--description` | Description of the expense |
| `--amount`      | Amount of the expense      |
| `-d`            | Short form of description  |
| `-a`            | Short form of amount       |

---

# 2. List Expenses

To display all expenses:

```bash
expense-tracker list
```

Example:

```text
ID  Date         Description     Amount
1   2026-08-14   Breakfast       $15
2   2026-08-14   Lunch           $20
3   2026-08-14   Dinner          $10
```

If there are no expenses:

```text
No expenses found.
```

---

# 3. View Summary

To calculate the total of all expenses:

```bash
expense-tracker summary
```

Example:

```text
Total expenses: $45
```

The application calculates the total by adding the amount of every stored expense.

---

# 4. Monthly Summary

To view expenses for a specific month:

```bash
expense-tracker summary --month 8
```

Output:

```text
Total expenses for August: $35
```

Short option:

```bash
expense-tracker summary -m 8
```

The month must be between:

```text
1
```

and:

```text
12
```

Invalid example:

```bash
expense-tracker summary --month 13
```

Output:

```text
Month must be a number between 1 and 12.
```

---

# 5. Update Expense

To update an existing expense:

```bash
expense-tracker update \
  --id 1 \
  --description "Big Lunch" \
  --amount 25
```

Output:

```text
Expense updated successfully
```

Short options:

```bash
expense-tracker update \
  -i 1 \
  -d "Big Lunch" \
  -a 25
```

The update operation changes:

* Description
* Amount

The original ID remains unchanged.

The original date also remains unchanged.

---

# 6. Delete Expense

To delete an expense:

```bash
expense-tracker delete --id 2
```

Output:

```text
Expense deleted successfully
```

Short option:

```bash
expense-tracker delete -i 2
```

If the ID does not exist:

```text
Expense with ID 999 not found.
```

---

# 7. Help

Commander automatically provides help information.

Run:

```bash
expense-tracker --help
```

You can also get help for a specific command:

```bash
expense-tracker add --help
```

Example:

```text
Usage: expense-tracker add [options]

Add a new expense

Options:
  -d, --description <description>  Expense description
  -a, --amount <amount>            Expense amount
  -h, --help                       display help for command
```

---

# 8. Version

To display the application version:

```bash
expense-tracker --version
```

Example:

```text
1.0.0
```

---

# 🛡 Validation and Error Handling

The application validates user input before performing operations.

This prevents invalid data from being stored.

---

## Negative Amount

Invalid:

```bash
expense-tracker add --description "Test" --amount -10
```

Output:

```text
Amount must be a positive number.
```

---

## Zero Amount

Invalid:

```bash
expense-tracker add --description "Test" --amount 0
```

Output:

```text
Amount must be a positive number.
```

---

## Invalid Amount

Invalid:

```bash
expense-tracker add --description "Test" --amount abc
```

Output:

```text
Amount must be a positive number.
```

---

## Invalid ID

Invalid:

```bash
expense-tracker delete --id abc
```

Output:

```text
ID must be a positive integer.
```

---

## Negative ID

Invalid:

```bash
expense-tracker delete --id -5
```

Output:

```text
ID must be a positive integer.
```

---

## Non-existent Expense

Invalid:

```bash
expense-tracker update \
  --id 999 \
  --description "Test" \
  --amount 10
```

Output:

```text
Expense with ID 999 not found.
```

---

## Invalid Month

Invalid:

```bash
expense-tracker summary --month 13
```

Output:

```text
Month must be a number between 1 and 12.
```

---

# 💾 Data Storage

The application uses a simple JSON file for persistence.

The file is:

```text
data/expenses.json
```

Example:

```json
[
  {
    "id": 1,
    "date": "2026-08-14",
    "description": "Breakfast",
    "amount": 15
  },
  {
    "id": 2,
    "date": "2026-08-14",
    "description": "Lunch",
    "amount": 20
  }
]
```

Each expense contains:

| Property      | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| `id`          | number | Unique expense identifier    |
| `date`        | string | Date the expense was created |
| `description` | string | Expense description          |
| `amount`      | number | Expense amount               |

---

# 🔄 Application Flow

When a user executes:

```bash
expense-tracker add --description "Lunch" --amount 20
```

the application follows this flow:

```text
Terminal
   │
   ▼
Commander
   │
   ▼
handleAdd()
   │
   ├── Validate amount
   │
   ▼
addExpense()
   │
   ├── readExpenses()
   │
   ├── Generate ID
   │
   ├── Create Expense
   │
   ├── Add to array
   │
   └── saveExpenses()
   │
   ▼
expenses.json
   │
   ▼
Success message
```

This keeps the application organized and easier to maintain.

---

# 🔢 ID Generation

Each expense receives a unique numeric ID.

When there are no expenses:

```text
Next ID = 1
```

If the existing expenses are:

```text
ID 1
ID 2
ID 3
```

the next ID will be:

```text
4
```

The service calculates the largest existing ID and adds `1`.

Conceptually:

```text
nextId = maximum existing ID + 1
```

This prevents duplicate IDs when adding new expenses.

---

# 🧪 Testing

The project uses **Vitest** for automated testing.

Run the tests in watch mode:

```bash
npm run test
```

For a single test run:

```bash
npm run test -- --run
```

---

# 📊 Test Coverage

The project currently contains **20 unit tests** across **5 test files**.

```text
Test Files  5 passed (5)
Tests       20 passed (20)
```

Test files:

```text
src/services/expenseService.test.ts
src/commands/add.test.ts
src/commands/delete.test.ts
src/commands/update.test.ts
src/commands/summary.test.ts
```

---

## Service Tests

The service layer tests cover:

* Adding an expense
* Generating IDs
* Deleting existing expenses
* Handling non-existent expenses
* Updating existing expenses
* Handling non-existent expenses during updates

---

## Add Command Tests

The add command tests cover:

* Successfully adding an expense
* Rejecting negative amounts
* Rejecting invalid amounts

---

## Delete Command Tests

The delete command tests cover:

* Successfully deleting an expense
* Rejecting invalid IDs
* Handling non-existent IDs

---

## Update Command Tests

The update command tests cover:

* Successfully updating an expense
* Rejecting invalid IDs
* Rejecting invalid amounts
* Handling non-existent expenses

---

## Summary Command Tests

The summary command tests cover:

* Calculating total expenses
* Handling empty expense lists
* Calculating monthly totals
* Rejecting invalid months

---

# 📜 NPM Scripts

The project defines the following scripts.

## Build

```bash
npm run build
```

Compiles TypeScript into JavaScript.

---

## Start

```bash
npm run start
```

Runs the compiled application.

---

## Test

```bash
npm run test
```

Starts Vitest in watch mode.

---

## Single Test Run

```bash
npm run test -- --run
```

Runs the complete test suite once.

---

# 🧠 Design Decisions

Several design decisions were made to keep the application simple while maintaining clean code.

---

# Why TypeScript?

TypeScript provides static typing on top of JavaScript.

For example, the `Expense` type defines the structure of an expense:

```typescript
type Expense = {
  id: number;
  date: string;
  description: string;
  amount: number;
};
```

This helps catch mistakes during development.

For example, assigning a string to `amount` would produce a TypeScript error.

TypeScript also makes function contracts clearer.

For example:

```typescript
function deleteExpense(id: number): boolean
```

immediately communicates that:

* The function expects a number
* The function returns a boolean

---

# Why Commander?

Command-line argument parsing can become complicated when handling:

```text
commands
options
flags
required arguments
help
version
```

Commander provides a clean way to define the CLI.

For example:

```typescript
program
  .command("add")
  .description("Add a new expense")
  .requiredOption(
    "-d, --description <description>",
    "Expense description",
  )
  .requiredOption(
    "-a, --amount <amount>",
    "Expense amount",
  );
```

This is much cleaner than manually parsing:

```typescript
process.argv
```

throughout the application.

---

# Why JSON Storage?

The original project allows using a simple file such as:

* JSON
* CSV
* Text file

JSON was selected because it is:

* Easy to read
* Easy to write
* Native to JavaScript
* Easy to debug
* Simple for a small CLI project

For example:

```json
[
  {
    "id": 1,
    "description": "Lunch",
    "amount": 20
  }
]
```

For this project, a database would add unnecessary complexity.

---

# 🔀 Separation of Concerns

The application separates responsibilities between different layers.

Without separation of concerns, everything could be placed inside:

```text
index.ts
```

This would quickly become difficult to maintain.

Instead:

```text
index.ts
    ↓
commands
    ↓
services
    ↓
storage
```

Each layer has a specific responsibility.

This makes the code easier to:

* Understand
* Test
* Debug
* Modify
* Extend

---

# 🧱 Service Layer

The service layer contains the business logic.

For example:

```typescript
addExpense(
  description: string,
  amount: number,
): Expense
```

The command layer does not need to know how the expense is stored.

It simply calls:

```typescript
addExpense("Lunch", 20);
```

The service handles:

```text
Read
 ↓
Generate ID
 ↓
Create object
 ↓
Add object
 ↓
Save
```

This makes the service functions reusable and testable.

---

# 💾 Storage Layer

The storage layer hides the file system implementation.

The rest of the application can simply use:

```typescript
readExpenses();
```

and:

```typescript
saveExpenses(expenses);
```

It does not need to know whether the data is stored in:

```text
JSON
```

or eventually:

```text
PostgreSQL
```

or another storage system.

This makes future changes easier.

---

# ⚠️ Error Handling Strategy

Errors are handled as early as possible.

For example:

```text
User input
    ↓
Validation
    ↓
Business logic
    ↓
Storage
```

If the amount is invalid:

```text
Amount must be a positive number.
```

the application stops before modifying the data.

Similarly, if an expense does not exist:

```text
Expense with ID 999 not found.
```

the application does not modify the JSON file.

This prevents invalid state changes.

---

# 🔍 Example Workflow

A complete example:

## Step 1 — Add Breakfast

```bash
expense-tracker add \
  --description "Breakfast" \
  --amount 15
```

Output:

```text
Expense added successfully (ID: 1)
```

---

## Step 2 — Add Lunch

```bash
expense-tracker add \
  --description "Lunch" \
  --amount 20
```

Output:

```text
Expense added successfully (ID: 2)
```

---

## Step 3 — Add Dinner

```bash
expense-tracker add \
  --description "Dinner" \
  --amount 10
```

Output:

```text
Expense added successfully (ID: 3)
```

---

## Step 4 — List Expenses

```bash
expense-tracker list
```

Output:

```text
ID  Date         Description     Amount
1   2026-08-14   Breakfast       $15
2   2026-08-14   Lunch           $20
3   2026-08-14   Dinner          $10
```

---

## Step 5 — View Summary

```bash
expense-tracker summary
```

Output:

```text
Total expenses: $45
```

---

## Step 6 — Update Breakfast

```bash
expense-tracker update \
  --id 1 \
  --description "Big Breakfast" \
  --amount 25
```

Output:

```text
Expense updated successfully
```

---

## Step 7 — Delete Dinner

```bash
expense-tracker delete --id 3
```

Output:

```text
Expense deleted successfully
```

---

## Step 8 — View Summary Again

```bash
expense-tracker summary
```

Output:

```text
Total expenses: $45
```

The final expenses are:

```text
Big Breakfast = $25
Lunch         = $20
```

Total:

```text
$45
```

---

## Step 9 — Monthly Summary

```bash
expense-tracker summary --month 8
```

Output:

```text
Total expenses for August: $45
```

---

# 🧪 Development Workflow

A typical development workflow for this project is:

```text
1. Write TypeScript code
        ↓
2. Build the project
        ↓
3. Run unit tests
        ↓
4. Test the CLI manually
        ↓
5. Fix issues
        ↓
6. Run tests again
        ↓
7. Commit changes
```

Commands:

```bash
npm run build
```

Then:

```bash
npm run test -- --run
```

Then manually test:

```bash
expense-tracker add --description "Lunch" --amount 20
expense-tracker list
expense-tracker summary
```

---

# 🔮 Possible Future Improvements

The current implementation satisfies the required project features, but several improvements could be added.

## Expense Categories

Expenses could support categories:

```json
{
  "id": 1,
  "date": "2026-08-14",
  "description": "Lunch",
  "amount": 20,
  "category": "Food"
}
```

Then users could filter:

```bash
expense-tracker list --category Food
```

---

## Monthly Budgets

Users could define monthly budgets:

```bash
expense-tracker budget --month 8 --amount 500
```

The application could then warn when the user exceeds the budget.

Example:

```text
Warning: You have exceeded your August budget.
Budget: $500
Expenses: $525
```

---

## CSV Export

Expenses could be exported:

```bash
expense-tracker export --format csv
```

Example output:

```csv
id,date,description,amount
1,2026-08-14,Lunch,20
2,2026-08-14,Dinner,10
```

---

## Database Storage

For a larger application, the JSON storage layer could be replaced with a database such as:

```text
PostgreSQL
```

The command and service layers could remain mostly unchanged because storage is already separated.

---

## Better Table Formatting

The list command could use a table formatting library to make output easier to read:

```text
┌────┬────────────┬─────────────┬────────┐
│ ID │ Date       │ Description  │ Amount │
├────┼────────────┼─────────────┼────────┤
│ 1  │ 2026-08-14 │ Lunch        │ $20    │
│ 2  │ 2026-08-14 │ Dinner       │ $10    │
└────┴────────────┴─────────────┴────────┘
```

---

## More Automated Testing

Additional tests could be added for:

* Storage failures
* Corrupted JSON
* Missing directories
* Empty descriptions
* Extremely large amounts
* Duplicate data
* File permissions

---

# 📚 What I Learned

Building this project helped practice several important concepts.

### Command-Line Applications

Learned how CLI applications receive and process user input.

---

### Commander

Learned how to define:

* Commands
* Options
* Required options
* Help messages
* Version information

---

### File System

Learned how to use Node.js file system functions to:

* Read files
* Write files
* Check if files exist

---

### JSON Persistence

Learned how to convert JavaScript objects into JSON and restore them later.

```text
Object
 ↓
JSON.stringify()
 ↓
File
```

and:

```text
File
 ↓
JSON.parse()
 ↓
Object
```

---

### Service Architecture

Learned why business logic should be separated from CLI handling.

---

### Input Validation

Learned how to protect the application from invalid user input.

---

### Unit Testing

Learned how to test individual functions independently using Vitest.

---

### Mocking

Tests use mocks to isolate the code being tested from the file system and other dependencies.

This makes tests:

* Faster
* More predictable
* Easier to debug

---

# 📈 Project Status

The current implementation includes all required functionality from the roadmap.sh specification.

```text
Feature                         Status
──────────────────────────────────────
Add expense                    ✅
Update expense                 ✅
Delete expense                 ✅
List expenses                  ✅
Total summary                  ✅
Monthly summary                ✅
JSON persistence               ✅
Input validation               ✅
Error handling                 ✅
CLI argument parsing           ✅
Unit testing                   ✅
```

Current test suite:

```text
5 test files
20 tests
20 passing
```

---

# 🌐 Roadmap.sh

This project was created based on the **Expense Tracker** project from roadmap.sh.

Project specification:

[https://roadmap.sh/projects/expense-tracker](https://roadmap.sh/projects/expense-tracker)

The project is designed to practice:

* CLI development
* Filesystem interaction
* Logic building
* Data management
* Error handling
* Modular code

---

# 👩‍💻 Author

**Israa Elhalby**

GitHub:

[https://github.com/Israa-e](https://github.com/Israa-e)

---

# 📄 License

This project is licensed under the ISC License.

---

# ⭐ Acknowledgements

This project was created as part of the learning projects provided by [roadmap.sh](https://roadmap.sh/projects/expense-tracker).

The goal was to build a practical CLI application while practicing clean code, modular architecture, validation, persistence, and automated testing.

````

### One important thing

قبل ما تعملي commit، بما إن عندك `dist/` و `node_modules/` ظاهرين في المشروع، تأكدي إن `.gitignore` عندك يحتوي:

```gitignore
node_modules/
dist/
coverage/
*.log
.env
````

وبعدين:

```bash
npm run build
npm run test -- --run
git status
```

المفروض آخر test يعطي:

```text
Test Files  5 passed (5)
Tests       20 passed (20)
```

وبعدها يكون الـ README هذا مناسب جدًا كـ **portfolio/project submission** وليس مجرد README قصير.
