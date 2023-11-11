import { Flex, Button } from "@radix-ui/themes";
import NewGame from "@/components/NewGame";
import { GameProps } from "app/page";

export interface MenuProps {
  startGame: (args: GameProps) => void;
}

function Menu({ startGame }: MenuProps) {
  return (
    <Flex align="center" justify="center" style={{ gridColumn: "1 / 3" }}>
      <Flex
        direction="column"
        gap="4"
        style={{ width: "180px", height: "fit-content" }}
      >
        <NewGame startGame={startGame} />
        <Button size="3" disabled>
          Continue
        </Button>
        <Button size="3">About</Button>
      </Flex>
    </Flex>
  );
}

export default Menu;
