import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { handleSummary } from "./summary.js";
import { readExpenses } from "../storage/expenseStorage.js";

vi.mock("../storage/expenseStorage.js", () => ({
  readExpenses: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("handleSummary", () => {
  it("should show the total expenses", () => {
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

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleSummary({});

    expect(consoleSpy).toHaveBeenCalledWith(
      "Total expenses: $30",
    );

    consoleSpy.mockRestore();
  });

  it("should show expenses for a specific month", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
      {
        id: 2,
        date: "2026-08-20",
        description: "Dinner",
        amount: 10,
      },
      {
        id: 3,
        date: "2026-09-01",
        description: "Coffee",
        amount: 5,
      },
    ]);

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleSummary({
      month: "8",
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      "Total expenses for August: $30",
    );

    consoleSpy.mockRestore();
  });

  it("should reject an invalid month", () => {
    vi.mocked(readExpenses).mockReturnValue([
      {
        id: 1,
        date: "2026-08-14",
        description: "Lunch",
        amount: 20,
      },
    ]);

    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((() => {
        throw new Error("process.exit");
      }) as never);

    expect(() => {
      handleSummary({
        month: "13",
      });
    }).toThrow("process.exit");

    expect(errorSpy).toHaveBeenCalledWith(
      "Month must be a number between 1 and 12.",
    );

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it("should show a message when there are no expenses", () => {
    vi.mocked(readExpenses).mockReturnValue([]);

    const consoleSpy = vi
      .spyOn(console, "log")
      .mockImplementation(() => {});

    handleSummary({});

    expect(consoleSpy).toHaveBeenCalledWith(
      "No expenses found.",
    );

    consoleSpy.mockRestore();
  });
});