# 💰 Expense Tracker CLI

A simple and lightweight **Command-Line Expense Tracker** built with **TypeScript** and **Node.js**.

The application allows users to manage their personal expenses directly from the terminal. Users can add, list, update, delete, and summarize expenses. Data is stored locally in a JSON file, so no external database is required.

This project was built as part of the [roadmap.sh Expense Tracker project](https://roadmap.sh/projects/expense-tracker).

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Technologies](#-technologies)
* [Project Structure](#-project-structure)
* [Installation](#-installation)
* [Building the Project](#-building-the-project)
* [CLI Usage](#-cli-usage)

  * [Add an Expense](#1-add-an-expense)
  * [List Expenses](#2-list-expenses)
  * [View Summary](#3-view-summary)
  * [Monthly Summary](#4-monthly-summary)
  * [Update an Expense](#5-update-an-expense)
  * [Delete an Expense](#6-delete-an-expense)
  * [Help](#7-help)
  * [Version](#8-version)
* [Data Storage](#-data-storage)
* [Validation](#-validation)
* [Application Flow](#-application-flow)
* [ID Generation](#-id-generation)
* [Testing](#-testing)
* [NPM Scripts](#-npm-scripts)
* [Architecture](#-architecture)
* [Design Decisions](#-design-decisions)
* [Future Improvements](#-future-improvements)
* [What I Learned](#-what-i-learned)
* [Roadmap.sh](#-roadmapsh)
* [Author](#-author)
* [License](#-license)

---

## 📖 Overview

Expense Tracker CLI is a terminal-based application for managing personal expenses.

Instead of using a graphical interface or a remote database, the application provides a simple command-line interface and stores expense data locally.

For example:

```bash
expense-tracker add --description "Lunch" --amount 20
```

After adding expenses, users can list them:

```bash
expense-tracker list
```

Or calculate the total:

```bash
expense-tracker summary
```

The project focuses on practicing:

* TypeScript
* Node.js
* CLI application development
* Command-line argument parsing
* File system operations
* JSON persistence
* Input validation
* Error handling
* Separation of concerns
* Service-layer design
* Automated testing

---

## ✨ Features

### Expense Management

* ✅ Add expenses
* ✅ List all expenses
* ✅ Update existing expenses
* ✅ Delete expenses
* ✅ Calculate total expenses
* ✅ Calculate expenses for a specific month

### Validation

* ✅ Validate expense amounts
* ✅ Reject zero or negative amounts
* ✅ Reject invalid numeric values
* ✅ Validate expense IDs
* ✅ Reject invalid IDs
* ✅ Handle non-existent expenses
* ✅ Validate month numbers
* ✅ Reject months outside the range `1-12`

### Storage

* ✅ Local JSON file persistence
* ✅ Read expenses from disk
* ✅ Write expenses to disk
* ✅ Automatic persistence after modifications

### Development

* ✅ TypeScript
* ✅ Node.js
* ✅ Commander
* ✅ Vitest
* ✅ Modular project structure

---

## 🛠 Technologies

| Technology              | Purpose                          |
| ----------------------- | -------------------------------- |
| TypeScript              | Main programming language        |
| Node.js                 | JavaScript runtime               |
| Commander               | CLI command and option parsing   |
| Vitest                  | Automated testing                |
| JSON                    | Local data persistence           |
| Node.js File System API | Reading and writing expense data |

---

## 📁 Project Structure

```text
Expense-Tracker-CLI/
│
├── data/
│   └── expenses.json
│
├── src/
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
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

> The exact structure may vary slightly depending on the current implementation, but the application separates CLI commands, business logic, storage, and types.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/Israa-e/Expense-Tracker-CLI.git
```

## 2. Navigate to the project

```bash
cd Expense-Tracker-CLI
```

## 3. Install dependencies

```bash
npm install
```

---

# 🔨 Building the Project

Because the application is written in TypeScript, compile the source code before running the production build:

```bash
npm run build
```

The TypeScript compiler generates the JavaScript output according to the project's `tsconfig.json`.

---

# 💻 CLI Usage

The application provides the following commands:

```text
add
list
summary
update
delete
```

---

## 1. Add an Expense

Add a new expense using:

```bash
expense-tracker add --description "Lunch" --amount 20
```

Short options can also be used:

```bash
expense-tracker add -d "Lunch" -a 20
```

Example output:

```text
Expense added successfully (ID: 1)
```

### Options

| Option          | Short | Description                |
| --------------- | ----- | -------------------------- |
| `--description` | `-d`  | Description of the expense |
| `--amount`      | `-a`  | Amount of the expense      |

Example:

```bash
expense-tracker add \
  --description "Dinner" \
  --amount 10
```

---

## 2. List Expenses

Display all stored expenses:

```bash
expense-tracker list
```

Example:

```text
ID  Date        Description  Amount
1   2026-08-14  Lunch        $20
2   2026-08-14  Dinner       $10
```

If there are no expenses:

```text
No expenses found.
```

---

## 3. View Summary

Calculate the total amount of all expenses:

```bash
expense-tracker summary
```

Example:

```text
Total expenses: $30
```

The application calculates the total by adding the amount of every stored expense.

---

## 4. Monthly Summary

Calculate expenses for a specific month:

```bash
expense-tracker summary --month 8
```

Short option:

```bash
expense-tracker summary -m 8
```

Example:

```text
Total expenses for August: $30
```

The month must be between:

```text
1 - January
2 - February
...
12 - December
```

Invalid example:

```bash
expense-tracker summary --month 13
```

Expected behavior:

```text
Month must be a number between 1 and 12.
```

---

## 5. Update an Expense

Update an existing expense using its ID:

```bash
expense-tracker update \
  --id 1 \
  --description "Big Lunch" \
  --amount 25
```

Short options:

```bash
expense-tracker update \
  -i 1 \
  -d "Big Lunch" \
  -a 25
```

Example output:

```text
Expense updated successfully
```

The update operation modifies the expense's:

* Description
* Amount

The expense ID remains unchanged.

---

## 6. Delete an Expense

Delete an expense by its ID:

```bash
expense-tracker delete --id 2
```

Short option:

```bash
expense-tracker delete -i 2
```

Example output:

```text
Expense deleted successfully
```

If the expense does not exist:

```text
Expense with ID 999 not found.
```

---

## 7. Help

Display general CLI help:

```bash
expense-tracker --help
```

You can also display help for an individual command:

```bash
expense-tracker add --help
```

Commander provides information about available options and commands.

---

## 8. Version

Display the application version:

```bash
expense-tracker --version
```

---

# 💾 Data Storage

Expenses are stored locally in a JSON file:

```text
data/expenses.json
```

Example:

```json
[
  {
    "id": 1,
    "date": "2026-08-14",
    "description": "Lunch",
    "amount": 20
  },
  {
    "id": 2,
    "date": "2026-08-14",
    "description": "Dinner",
    "amount": 10
  }
]
```

Each expense contains the following properties:

| Property      | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| `id`          | number | Unique expense identifier    |
| `date`        | string | Date the expense was created |
| `description` | string | Description of the expense   |
| `amount`      | number | Expense amount               |

### Why JSON?

JSON was chosen because it is:

* Simple
* Human-readable
* Easy to debug
* Native to JavaScript and TypeScript
* Suitable for a small CLI application
* Does not require an external database

For this project, a database would add unnecessary complexity.

---

# 🛡 Validation

The application validates input before modifying stored data.

## Invalid Amount

Amounts must be positive numbers.

Invalid:

```bash
expense-tracker add --description "Test" --amount -10
```

Invalid:

```bash
expense-tracker add --description "Test" --amount 0
```

Invalid:

```bash
expense-tracker add --description "Test" --amount abc
```

The application rejects these values instead of storing invalid expense data.

---

## Invalid ID

Expense IDs must be valid positive integers.

Invalid:

```bash
expense-tracker delete --id abc
```

Invalid:

```bash
expense-tracker delete --id -5
```

---

## Non-existent Expense

Trying to update or delete an expense that does not exist should return an appropriate error instead of modifying the data.

Example:

```bash
expense-tracker delete --id 999
```

Expected behavior:

```text
Expense with ID 999 not found.
```

---

## Invalid Month

Monthly summaries only accept months from `1` through `12`.

Invalid:

```bash
expense-tracker summary --month 0
```

Invalid:

```bash
expense-tracker summary --month 13
```

---

# 🔄 Application Flow

When a user runs:

```bash
expense-tracker add --description "Lunch" --amount 20
```

the application follows this general flow:

```text
User
 │
 ▼
CLI
 │
 ▼
Command Handler
 │
 ▼
Validation
 │
 ▼
Expense Service
 │
 ├── Read existing expenses
 │
 ├── Generate ID
 │
 ├── Create expense
 │
 ├── Add expense
 │
 └── Save expenses
 │
 ▼
JSON File
 │
 ▼
Success Message
```

This separation keeps the application easier to understand, test, and maintain.

---

# 🔢 ID Generation

Every expense receives a numeric ID.

If the current expenses are:

```text
ID 1
ID 2
ID 3
```

the next expense receives:

```text
ID 4
```

The next ID can be determined from the highest existing ID:

```text
next ID = highest existing ID + 1
```

This prevents duplicate IDs when adding new expenses.

---

# 🧪 Testing

The project uses **Vitest** for automated testing.

Run the test suite with:

```bash
npm run test -- --run
```

For watch mode:

```bash
npm run test
```

Testing helps verify that the application's business logic and CLI behavior work correctly.

---

# 📜 NPM Scripts

The project provides scripts for common development tasks.

## Build

```bash
npm run build
```

Compiles the TypeScript source code.

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

Runs Vitest in watch mode.

---

## Run Tests Once

```bash
npm run test -- --run
```

Runs the test suite once and exits.

---

# 🏗 Architecture

The project follows a simple layered structure:

```text
                ┌──────────────────┐
                │      CLI User    │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │    Commands      │
                │ add/list/update  │
                │ delete/summary   │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     Services     │
                │  Business Logic  │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │     Storage      │
                │   JSON File      │
                └────────┬─────────┘
                         │
                         ▼
                ┌──────────────────┐
                │ expenses.json    │
                └──────────────────┘
```

### Commands Layer

Responsible for:

* Receiving CLI input
* Reading options
* Calling services
* Displaying results

### Service Layer

Responsible for:

* Business logic
* Creating expenses
* Updating expenses
* Deleting expenses
* Calculating summaries

### Storage Layer

Responsible for:

* Reading JSON data
* Writing JSON data
* Persisting expenses

### Types

Responsible for defining the structure of an expense.

---

# 🧠 Design Decisions

## Separation of Concerns

The application avoids putting all logic into one file.

Instead, responsibilities are separated:

```text
Commands
   ↓
Services
   ↓
Storage
```

This makes the code:

* Easier to understand
* Easier to test
* Easier to debug
* Easier to extend

---

## Why TypeScript?

TypeScript provides static typing and better development-time safety.

For example, an expense can be represented using a type:

```typescript
type Expense = {
  id: number;
  date: string;
  description: string;
  amount: number;
};
```

This ensures that different parts of the application use a consistent data structure.

---

## Why Commander?

Commander simplifies command-line argument parsing.

Instead of manually processing:

```typescript
process.argv
```

the application can define structured commands and options.

For example:

```bash
expense-tracker add --description "Lunch" --amount 20
```

Commander handles the parsing and makes the CLI easier to maintain.

---

## Why a Service Layer?

Business logic is kept separate from CLI code.

For example, the command layer can call:

```typescript
addExpense("Lunch", 20);
```

without needing to know how the expense is stored.

This also makes the business logic easier to test independently.

---

## Why File-Based Storage?

A JSON file is sufficient for a small command-line application.

Using PostgreSQL or another database would introduce additional infrastructure without being necessary for the project's requirements.

However, because storage is separated from business logic, the JSON implementation could later be replaced with a database.

---

# 🔮 Future Improvements

Possible improvements include:

### Categories

Add categories such as:

```text
Food
Transport
Shopping
Bills
Entertainment
Other
```

Example:

```bash
expense-tracker add \
  --description "Lunch" \
  --amount 20 \
  --category "Food"
```

---

### Expense Filtering

Allow users to filter expenses:

```bash
expense-tracker list --category Food
```

---

### Budget Tracking

Add monthly budgets:

```bash
expense-tracker budget --month 8 --amount 500
```

The application could then warn users when their expenses exceed the budget.

---

### CSV Export

Allow users to export expenses:

```bash
expense-tracker export --format csv
```

---

### Database Support

The storage layer could eventually be replaced with:

```text
PostgreSQL
```

while keeping most of the command and service layers unchanged.

---

### Improved CLI Formatting

The list command could eventually use a formatted table:

```text
┌────┬────────────┬──────────────┬────────┐
│ ID │ Date       │ Description  │ Amount │
├────┼────────────┼──────────────┼────────┤
│ 1  │ 2026-08-14 │ Lunch        │ $20    │
│ 2  │ 2026-08-14 │ Dinner       │ $10    │
└────┴────────────┴──────────────┴────────┘
```

---

# 📚 What I Learned

Building this project provided practical experience with several concepts.

### TypeScript

* Static typing
* Interfaces and types
* Function type definitions
* Compiling TypeScript

### Node.js

* Running TypeScript/JavaScript applications
* File system operations
* Package management

### CLI Development

* Commands
* Options
* Flags
* Help messages
* Version information
* User input validation

### JSON Persistence

The application converts data between JavaScript objects and JSON:

```text
JavaScript Object
       │
       ▼
JSON.stringify()
       │
       ▼
JSON File
```

And when reading:

```text
JSON File
       │
       ▼
JSON.parse()
       │
       ▼
JavaScript Object
```

### Testing

Vitest was used to test application behavior and business logic.

### Software Architecture

The project demonstrates how separating:

```text
CLI
 ↓
Commands
 ↓
Services
 ↓
Storage
```

can make a small application easier to maintain.

---

# 📊 Project Status

| Feature              | Status |
| -------------------- | ------ |
| Add expense          | ✅      |
| List expenses        | ✅      |
| Update expense       | ✅      |
| Delete expense       | ✅      |
| Total summary        | ✅      |
| Monthly summary      | ✅      |
| JSON persistence     | ✅      |
| Input validation     | ✅      |
| Error handling       | ✅      |
| CLI argument parsing | ✅      |
| Automated testing    | ✅      |

---

# 🌐 Roadmap.sh

This project was built based on the **Expense Tracker** project from [roadmap.sh](https://roadmap.sh/).

Project specification:

https://roadmap.sh/projects/expense-tracker

The project is designed to practice:

* CLI development
* File system interaction
* Data management
* Input validation
* Error handling
* Modular application design

---

# 👩‍💻 Author

**Israa Elhalby**

GitHub:

https://github.com/Israa-e

Repository:

https://github.com/Israa-e/Expense-Tracker-CLI

---

# 📄 License

This project is licensed under the **ISC License**.

---

⭐ If you found this project useful, feel free to explore the repository and check out the other projects.
