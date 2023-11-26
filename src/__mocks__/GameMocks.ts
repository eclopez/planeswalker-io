import { PlayerGameTypes, GameTypes } from "@/types/GameTypes";

export const Players: PlayerGameTypes[] = [
  {
    id: 0,
    name: "Erik",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
  {
    id: 1,
    name: "Erica",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
  {
    id: 2,
    name: "Trevin",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
  {
    id: 3,
    name: "Jonas",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
  {
    id: 4,
    name: "Amelia",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
  {
    id: 5,
    name: "Lila",
    commanderImage: null,
    counters: {
      life: 40,
      poison: 0,
    },
  },
];

export const OnePlayerGame: GameTypes = {
  "plw-1700522030902": [...Players.slice(0, 2)],
};

export const TwoPlayerGame: GameTypes = {
  "plw-1700522030703": [...Players.slice(0, 2)],
};

export const ThreePlayerGame: GameTypes = {
  "plw-1700522320524": [...Players.slice(0, 3)],
};

export const FourPlayerGame: GameTypes = {
  "plw-1700541650402": [...Players.slice(0, 4)],
};

export const FivePlayerGame: GameTypes = {
  "plw-1700541651018": [...Players.slice(0, 5)],
};

export const SixPlayerGame: GameTypes = {
  "plw-1700541650608": Players,
};
