import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Players } from "@/mocks/GameMocks";
import Player from "@/components/Player";

jest.mock("../../helpers/localStorageHelper", () => ({
  updatePlayerCounters: jest.fn,
}));

describe("Player", () => {
  it("should render the Player component with the correct props", () => {
    render(<Player gameId={"plw-24154324532"} player={Players[0]} />);

    expect(screen.getByText("Erik")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });

  it("should increment the Player's life when the increment life button is pressed", () => {
    render(<Player gameId={"plw-24154324532"} player={Players[0]} />);

    expect(screen.getByText("Erik")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();

    const incrementLifeButton = screen.getByTestId("incrementLife");
    fireEvent.click(incrementLifeButton);

    expect(screen.getByText("41")).toBeInTheDocument();
  });

  it("should decrement the Player's life when the increment life button is pressed", () => {
    render(<Player gameId={"plw-24154324532"} player={Players[0]} />);

    expect(screen.getByText("Erik")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();

    const decrementLifeButton = screen.getByTestId("decrementLife");
    fireEvent.click(decrementLifeButton);

    expect(screen.getByText("39")).toBeInTheDocument();
  });
});
