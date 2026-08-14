import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { handleDelete } from "./delete.js";
import { deleteExpense } from "../services/expenseService.js";

vi.mock("../services/expenseService.js", () => ({
  deleteExpense: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleDelete", () => {
  it("should delete an expense successfully", () => {
    vi.mocked(deleteExpense).mockReturnValue(true);

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleDelete({
      id: "1",
    });

    expect(deleteExpense).toHaveBeenCalledTimes(1);

    expect(deleteExpense).toHaveBeenCalledWith(1);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Expense deleted successfully",
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
      handleDelete({
        id: "abc",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "ID must be a positive integer.",
    );

    expect(deleteExpense).not.toHaveBeenCalled();

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should return an error when the expense does not exist", () => {
    vi.mocked(deleteExpense).mockReturnValue(false);

    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleDelete({
        id: "999",
      });
    }).toThrow("process.exit");

    expect(deleteExpense).toHaveBeenCalledWith(999);

    expect(errorSpy).toHaveBeenCalledWith(
      "Expense with ID 999 not found.",
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
});