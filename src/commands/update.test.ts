import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { handleUpdate } from "./update.js";
import { updateExpense } from "../services/expenseService.js";

vi.mock("../services/expenseService.js", () => ({
  updateExpense: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleUpdate", () => {
  it("should update an expense successfully", () => {
    vi.mocked(updateExpense).mockReturnValue(true);

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleUpdate({
      id: "1",
      description: "Dinner",
      amount: "30",
    });

    expect(updateExpense).toHaveBeenCalledTimes(1);

    expect(updateExpense).toHaveBeenCalledWith(
      1,
      "Dinner",
      30,
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "Expense updated successfully",
    );

    consoleSpy.mockRestore();
  });

  it("should reject an invalid ID", () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleUpdate({
        id: "abc",
        description: "Dinner",
        amount: "30",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "ID must be a positive integer.",
    );

    expect(updateExpense).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
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
      handleUpdate({
        id: "1",
        description: "Dinner",
        amount: "-10",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "Amount must be a positive number.",
    );

    expect(updateExpense).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should return an error when the expense does not exist", () => {
    vi.mocked(updateExpense).mockReturnValue(false);

    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleUpdate({
        id: "999",
        description: "Dinner",
        amount: "30",
      });
    }).toThrow("process.exit");

    expect(updateExpense).toHaveBeenCalledWith(
      999,
      "Dinner",
      30,
    );

    expect(errorSpy).toHaveBeenCalledWith(
      "Expense with ID 999 not found.",
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});