import { useEffect, useState, useReducer } from "react";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import playerReducer, { PLAYER_ACTION } from "@/hooks/usePlayerReducer";
import useDebounce from "@/hooks/useDebounce";
import { CommanderDamageType, PlayerGameTypes } from "@/types/GameTypes";

interface PlayerProps {
  gameId: string;
  player: PlayerGameTypes;
  solo?: boolean;
}

function Player({ gameId, player, solo = false }: PlayerProps) {
  const [state, dispatch] = useReducer(playerReducer, player);
  const [currentLife, setCurrentLife] = useState<number>(player.counters.life);
  const [currentPoison] = useState<number>(player.counters.poison);
  const debouncedLifeTotal = useDebounce<number>(currentLife, 700);

  const handleLifeChange = (delta: number) => {
    setCurrentLife((life) => life + delta);
  };

  useEffect(() => {
    dispatch({
      type: PLAYER_ACTION.UPDATE_COUNTERS,
      payload: {
        gameId,
        counters: { life: currentLife, poison: currentPoison },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLifeTotal]);

  return (
    <Card style={{ gridColumn: solo ? "1 / 3" : "" }}>
      <Flex gap="1" justify={"between"}>
        <Text size="7">{state.name}</Text>
        <Flex>
          <Button
            data-testid="incrementLife"
            onClick={() => handleLifeChange(1)}
          >
            <PlusIcon />
          </Button>
          <Text size="7" data-testid="lifeTotal">
            {currentLife}
          </Text>
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
