"use client";

import { useEffect, useReducer, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Flex,
  Text,
  TextFieldInput,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Switch,
} from "@radix-ui/themes";
import gameReducer, { GAME_ACTION } from "@/hooks/useGameReducer";
import { CommanderDamageType, PlayerGameTypes } from "types/GameTypes";

const NUMBER_OF_PLAYERS = [1, 2, 3, 4, 5, 6] as const;
const DEFAULT_STARTING_LIFE: number = 40;

function NewGame() {
  const router = useRouter();
  const [state, dispatch] = useReducer(gameReducer, {});
  const [players, setPlayers] = useState<(typeof NUMBER_OF_PLAYERS)[number]>(2);

  const startButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (Object.keys(state).length === 1) {
      const gameId = Object.keys(state)[0];
      router.push(`/game/${gameId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const updatePlayers = (value: string) => {
    setPlayers(parseInt(value) as (typeof NUMBER_OF_PLAYERS)[number]);
  };

  const startGame = (formData: FormData) => {
    // Disables start and cancel button without the need for a re-render
    startButtonRef.current.setAttribute("disabled", "");
    startButtonRef.current.setAttribute("data-disabled", "true");
    cancelButtonRef.current.setAttribute("disabled", "");
    cancelButtonRef.current.setAttribute("data-disabled", "true");

    const gameId = `plw-${Date.now()}`;
    const startingLife: number = +formData.get("startingLife") || 0;
    const commanderGame: boolean = formData.get("commanderGame") === "on";
    const numberOfPlayers: number = +formData.get("numberOfPlayers");

    const playerNames: string[] = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      playerNames.push(
        (formData.get(`playerName${i}`) || `Player ${i}`) as string
      );
    }

    const players: PlayerGameTypes[] = [];
    playerNames.forEach((player, index) => {
      const opponents: string[] = playerNames.filter((name) => player !== name);
      let commanderDamage: CommanderDamageType | null = null;
      if (commanderGame && opponents.length > 0) {
        commanderDamage = new Map();
        opponents.forEach((opponent) => {
          commanderDamage.set(opponent, 0);
        });
      }

      players.push({
        id: index,
        name: player,
        commanderImage: null,
        counters: {
          life: startingLife,
          poison: 0,
        },
        commanderDamage,
      });
    });

    dispatch({
      type: GAME_ACTION.CREATE_GAME,
      payload: {
        id: gameId,
        players,
      },
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size="3">New Game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle mb="5">New Game</DialogTitle>
        <form action={startGame}>
          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                Starting life total
              </Text>
              <TextFieldInput
                name="startingLife"
                type="number"
                placeholder="Enter a starting life total"
                defaultValue={DEFAULT_STARTING_LIFE}
                data-1p-ignore
              />
            </label>
          </Box>
          <Flex mb="5" direction="row" asChild gap="5">
            <Text as="div" size="2" weight="medium" mb="2">
              Commander game?
              <Switch name="commanderGame" />
            </Text>
          </Flex>
          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium" mb="2">
                Number of players
              </Text>
              <SelectRoot
                name="numberOfPlayers"
                size="2"
                defaultValue={players.toString()}
                onValueChange={updatePlayers}
              >
                <SelectTrigger>
                  <Button>
                    Number of players <CaretDownIcon width="12" height="12" />
                  </Button>
                </SelectTrigger>
                <SelectContent>
                  {NUMBER_OF_PLAYERS.map((number) => (
                    <SelectItem key={number} value={number.toString()}>
                      {number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </label>
          </Box>
          <Box mb="5">
            <label>
              <Text as="div" size="2" weight="medium">
                Player names
              </Text>
              <TextFieldInput
                name="playerName1"
                mt="2"
                placeholder="Enter a name"
                data-1p-ignore
              />
            </label>
            {Array.from({ length: players - 1 }, (_, i) => (
              <label key={i}>
                <TextFieldInput
                  name={`playerName${i + 2}`}
                  mt="3"
                  placeholder="Enter a name"
                  data-1p-ignore
                />
              </label>
            ))}
          </Box>
          <Flex gap="4">
            <Button type="submit" ref={startButtonRef}>
              Start
            </Button>
            <DialogClose>
              <Button variant="outline" ref={cancelButtonRef}>
                Cancel
              </Button>
            </DialogClose>
          </Flex>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default NewGame;
