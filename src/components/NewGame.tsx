"use client";

import { useState } from "react";
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
} from "@radix-ui/themes";
import { initGame } from "@/helpers/localStorageHelper";

const NUMBER_OF_PLAYERS = [1, 2, 3, 4, 5, 6] as const;
const DEFAULT_STARTING_LIFE: number = 40;

function NewGame() {
  const router = useRouter();

  const [players, setPlayers] = useState<(typeof NUMBER_OF_PLAYERS)[number]>(2);

  const updatePlayers = (value: string) => {
    setPlayers(parseInt(value) as (typeof NUMBER_OF_PLAYERS)[number]);
  };

  const startGame = (formData: FormData) => {
    const gameId = `plw-${Date.now()}`;
    const startingLife: number = +formData.get("startingLife") || 0;
    const numberOfPlayers: number = +formData.get("numberOfPlayers");
    const names = [];

    for (let i = 1; i <= numberOfPlayers; i++) {
      names.push(formData.get(`playerName${i}`) || `Player ${i}`);
    }

    initGame(gameId, names, startingLife);
    router.push(`/game/${gameId}`);
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
            <Button type="submit">Start</Button>
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </Flex>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}

export default NewGame;
