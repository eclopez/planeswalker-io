import { useState } from "react";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import useLocalStorage from "hooks/useLocalStorage";

interface PlayerProps {
  gameId: string;
  playerId: number;
  name: string;
  readonly life: number;
}

function Player({ gameId, playerId, name, life }: PlayerProps) {
  const [currentLife, setCurrentLife] = useState<number>(life);
  const { updateGame } = useLocalStorage();

  // TODO: use a debounce here
  const updateLife = (updatedLife: number) => {
    setCurrentLife((l) => {
      let newLife = l + updatedLife;
      updateGame(gameId, playerId, newLife);
      return newLife;
    });
  };

  return (
    <Card>
      <Flex gap="1" justify={"between"}>
        <Text size="7">{name}</Text>
        <Flex>
          <Button onClick={() => updateLife(1)}>
            <PlusIcon />
          </Button>
          <Text size="7">{currentLife}</Text>
          <Button onClick={() => updateLife(-1)}>
            <MinusIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default Player;
