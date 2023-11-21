import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Player from "@/components/Player";

jest.mock("next/navigation", () => ({ useRouter: jest.fn }));

describe("Player", () => {
  it("should render the Player component with the correct props", () => {
    render(
      <Player gameId={"plw-24154324532"} playerId={0} name={"Erik"} life={32} />
    );

    expect(screen.getByText("Erik")).toBeInTheDocument();
    expect(screen.getByText("32")).toBeInTheDocument();
  });
});
