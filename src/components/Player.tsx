import { useEffect, useState } from "react";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import useDebounce from "@/hooks/useDebounce";
import useLocalStorage from "@/hooks/useLocalStorage";

interface PlayerProps {
  gameId: string;
  playerId: number;
  name: string;
  readonly life: number;
}

function Player({ gameId, playerId, name, life }: PlayerProps) {
  const [currentLife, setCurrentLife] = useState<number>(life);
  const { updateGame } = useLocalStorage();
  const debouncedLifeTotal = useDebounce<number>(currentLife, 700);

  const handleLifeChange = (delta: number) => {
    setCurrentLife((life) => life + delta);
  };

  useEffect(() => {
    updateGame(gameId, playerId, currentLife);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLifeTotal]);

  return (
    <Card>
      <Flex gap="1" justify={"between"}>
        <Text size="7">{name}</Text>
        <Flex>
          <Button
            data-testid="incrementLife"
            onClick={() => handleLifeChange(1)}
          >
            <PlusIcon />
          </Button>
          <Text size="7">{currentLife}</Text>
          <Button
            data-testid="decrementLife"
            onClick={() => handleLifeChange(-1)}
          >
            <MinusIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default Player;
