import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "./expenseService.js";

import {
  readExpenses,
  saveExpenses,
} from "../storage/expenseStorage.js";

vi.mock("../storage/expenseStorage.js", () => ({
  readExpenses: vi.fn(),
  saveExpenses: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("addExpense", () => {
  it("should add an expense when there are no existing expenses", () => {
    vi.mocked(readExpenses).mockReturnValue([]);

    const expense = addExpense("Lunch", 20);

    expect(expense).toEqual({
      id: 1,
      date: expect.any(String),
      description: "Lunch",
      amount: 20,
    });

    expect(saveExpenses).toHaveBeenCalledWith([expense]);
  });

  it("should generate the next ID", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
      {
        id: 2,
        date: "2026-08-14",
        description: "Dinner",
        amount: 10,
      },
    ]);

    const expense = addExpense("Coffee", 5);

    expect(expense).toEqual({
      id: 3,
      date: expect.any(String),
      description: "Coffee",
      amount: 5,
    });

    expect(saveExpenses).toHaveBeenCalledWith([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
      {
        id: 2,
        date: "2026-08-14",
        description: "Dinner",
        amount: 10,
      },
      {
        id: 3,
        date: expect.any(String),
        description: "Coffee",
        amount: 5,
      },
    ]);
  });
});

describe("deleteExpense", () => {
  it("should delete an existing expense", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
      {
        id: 2,
        date: "2026-08-14",
        description: "Dinner",
        amount: 10,
      },
    ]);

    const result = deleteExpense(1);

    expect(result).toBe(true);

    expect(saveExpenses).toHaveBeenCalledWith([
      {
        id: 2,
        date: "2026-08-14",
        description: "Dinner",
        amount: 10,
      },
    ]);
  });

  it("should return false when expense does not exist", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
    ]);

    const result = deleteExpense(999);

    expect(result).toBe(false);

    expect(saveExpenses).not.toHaveBeenCalled();
  });
});

describe("updateExpense", () => {
  it("should update an existing expense", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
    ]);

    const result = updateExpense(1, "Dinner", 30);

    expect(result).toBe(true);

    expect(saveExpenses).toHaveBeenCalledWith([
      {
        id: 1,
        date: "2026-08-14",
        description: "Dinner",
        amount: 30,
      },
    ]);
  });

  it("should return false when expense does not exist", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
    ]);

    const result = updateExpense(999, "Dinner", 30);

    expect(result).toBe(false);

    expect(saveExpenses).not.toHaveBeenCalled();
  });
});