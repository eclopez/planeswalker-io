import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContinueGame from "@/components/ContinueGame";
import * as localStorageHelper from "../../helpers/localStorageHelper";

jest.mock("next/navigation", () => ({ useRouter: jest.fn }));
jest.mock("../../helpers/localStorageHelper", () => ({
  retrieveGameList: jest.fn(),
}));

describe("ContinueGame", () => {
  it("should render a disabled continue button when there are no games returned from localStorage", () => {
    jest.spyOn(localStorageHelper, "retrieveGameList").mockReturnValue([]);

    render(<ContinueGame />);

    expect(screen.getByRole("button")).toHaveTextContent("Continue Game");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render the continue button when there are games returned from localStorage", async () => {
    jest
      .spyOn(localStorageHelper, "retrieveGameList")
      .mockReturnValue(["plw-100064376284376"]);

    render(<ContinueGame />);

    expect(screen.getByRole("button")).toHaveTextContent("Continue Game");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
