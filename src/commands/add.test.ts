import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { handleAdd } from "./add.js";
import { addExpense } from "../services/expenseService.js";

vi.mock("../services/expenseService.js", () => ({
  addExpense: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleAdd", () => {
  it("should add an expense successfully", () => {
    vi.mocked(addExpense).mockReturnValue({
      id: 1,
      date: "2026-08-14",
      description: "Lunch",
      amount: 20,
    });

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleAdd({
      description: "Lunch",
      amount: "20",
    });

    expect(addExpense).toHaveBeenCalledTimes(1);

    expect(addExpense).toHaveBeenCalledWith(
      "Lunch",
      20,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Expense added successfully (ID: 1)",
    );

    consoleSpy.mockRestore();
  });

  it("should reject a negative amount", () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleAdd({
        description: "Lunch",
        amount: "-10",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "Amount must be a positive number.",
    );

    expect(addExpense).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should reject an invalid amount", () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleAdd({
        description: "Lunch",
        amount: "abc",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "Amount must be a positive number.",
    );

    expect(addExpense).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});