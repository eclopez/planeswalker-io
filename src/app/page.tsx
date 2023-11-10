"use client";

import { useState } from "react";
import { Flex, Button, Text } from "@radix-ui/themes";
import NewGame from "@/components/NewGame";

export interface StartGameProps {
  startingLife: number;
  players: string[];
}

function Page() {
  const [started, setStarted] = useState<boolean>(false);
  const [life, setLife] = useState<number>();
  const [playerNames, setPlayerNames] = useState<string[]>();

  const startGame = ({ startingLife, players }: StartGameProps) => {
    console.log(startingLife, players);
    setLife(startingLife);
    setPlayerNames(players);
    setStarted(true);
  };

  return (
    <Flex align="center" justify="center">
      <Flex
        direction="column"
        gap="4"
        style={{ width: "180px", height: "fit-content" }}
      >
        {started && (
          <Text size="3">
            {life}
            {playerNames}
          </Text>
        )}
        {!started && (
          <>
            <NewGame startGame={startGame} />
            <Button size="3" disabled>
              Continue
            </Button>
            <Button size="3">About</Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Page;
