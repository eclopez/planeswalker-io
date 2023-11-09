"use client";

import { useState } from "react";
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

const NUMBER_OF_PLAYERS = [1, 2, 3, 4, 5, 6] as const;

interface NewGameProps {
  triggerWidth?: number;
}

function NewGame() {
  const [players, setPlayers] = useState<(typeof NUMBER_OF_PLAYERS)[number]>(2);
  const [life, setLife] = useState<number>(40);

  const updatePlayers = (value) => {
    setPlayers(parseInt(value) as (typeof NUMBER_OF_PLAYERS)[number]);
  };

  const startGame = () => {};

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size="3">New Game</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle mb="5">New Game</DialogTitle>
        <Box mb="5">
          <label>
            <Text as="div" size="2" weight="medium" mb="2">
              Number of players
            </Text>
            <SelectRoot
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
            <Text as="div" size="2" weight="medium" mb="2">
              Starting life total
            </Text>
            <TextFieldInput
              type="number"
              placeholder="Enter a starting life total"
              defaultValue={life.toString()}
              data-1p-ignore
            />
          </label>
        </Box>
        <Box mb="5">
          <label>
            <Text as="div" size="2" weight="medium">
              Player names
            </Text>
            <TextFieldInput mt="2" placeholder="Enter a name" data-1p-ignore />
          </label>
          {Array.from({ length: players - 1 }, (_, i) => (
            <label key={i}>
              <TextFieldInput
                mt="3"
                placeholder="Enter a name"
                data-1p-ignore
              />
            </label>
          ))}
        </Box>
        <Flex gap="4">
          <Button onClick={startGame}>Start</Button>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
}

export default NewGame;
