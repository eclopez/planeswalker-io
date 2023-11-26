import {
  PlayerCounterTypes,
  GameTypes,
  PlayerGameTypes,
  PlayerCounterTypesRecord,
} from "@/types/GameTypes";

const saveGame = (game: GameTypes) => {
  const gameId = Object.keys(game)[0];
  localStorage.setItem(gameId, JSON.stringify(game[gameId]));
};

const loadGame = (gameId: string): GameTypes => {
  return { [gameId]: JSON.parse(localStorage.getItem(gameId)) };
};

const loadGameList = (): string[] => {
  let gameIds = [];

  for (const gameId in { ...localStorage }) {
    if (gameId.match(/plw-*/)) {
      gameIds.push(gameId);
    }
  }

  return gameIds.sort();
};

const removeGame = (gameId: string) => {
  localStorage.removeItem(gameId);
};

const removeAllGames = () => {
  const games = loadGameList();
  games.forEach((game) => {
    removeGame(game);
  });
};

const updatePlayerCounters = (
  gameId: string,
  id: number,
  counters: PlayerCounterTypesRecord
) => {
  const game = loadGame(gameId);
  game[gameId][id].counters = counters;
  saveGame(game);
};

export {
  saveGame,
  loadGame,
  loadGameList,
  removeGame,
  removeAllGames,
  updatePlayerCounters,
};
