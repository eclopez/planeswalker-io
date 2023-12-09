import { useEffect, useState, useReducer } from "react";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import playerReducer, { PLAYER_ACTION } from "@/hooks/usePlayerReducer";
import useDebounce from "@/hooks/useDebounce";
import { CommanderDamageType, PlayerGameTypes } from "@/types/GameTypes";
import CommanderDamage from "@/components/CommanderDamage";

interface PlayerProps {
  gameId: string;
  player: PlayerGameTypes;
  solo?: boolean;
}

function Player({ gameId, player, solo = false }: PlayerProps) {
  const [state, dispatch] = useReducer(
    playerReducer,
    player as PlayerGameTypes
  );
  const [currentLife, setCurrentLife] = useState<number>(player.counters.life);
  const [currentPoison] = useState<number>(player.counters.poison);
  const debouncedLifeTotal = useDebounce<number>(currentLife, 700);

  const handleLifeChange = (delta: number) => {
    console.log(`changin' that life by ${delta}`);
    setCurrentLife((life) => life + delta);
  };

  const handleCommanderDamageChange = (
    commanderDamage: CommanderDamageType
  ) => {
    let previousAggregateCommanderDamage: number = 0;
    let newAggregateCommanderDamage: number = 0;

    state.commanderDamage?.forEach(
      (damage) => (previousAggregateCommanderDamage += damage)
    );
    commanderDamage?.forEach(
      (damage) => (newAggregateCommanderDamage += damage)
    );

    handleLifeChange(
      previousAggregateCommanderDamage - newAggregateCommanderDamage
    );

    dispatch({
      type: PLAYER_ACTION.UPDATE_COMMANDER_DAMAGE,
      payload: { gameId, commanderDamage },
    });
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
      <Flex direction="column" gap="2">
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
        {state.commanderDamage && (
          <CommanderDamage
            commanderDamage={state.commanderDamage}
            playerName={state.name}
            handleChange={handleCommanderDamageChange}
          />
        )}
      </Flex>
    </Card>
  );
}

export default Player;
