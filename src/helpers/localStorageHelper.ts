const initGame = (gameId: string, players: string[], startingLife: number) => {
  const game = [];

  players.forEach((player: string, index: number) => {
    game.push({
      playerId: index,
      name: player,
      life: startingLife,
    });
  });

  localStorage.setItem(gameId, JSON.stringify(game));
};

const retrieveGame = (gameId: string) => {
  return JSON.parse(localStorage.getItem(gameId));
};

const retrieveGameList = (): string[] => {
  const storedGames = { ...localStorage };
  let games = [];

  for (const game in storedGames) {
    if (game.startsWith("plw-")) {
      games.push(game);
    }
  }

  return games.sort();
};

const updateGame = (gameId: string, playerId: number, updatedLife: number) => {
  let game = JSON.parse(localStorage.getItem(gameId));
  game[playerId].life = updatedLife;
  localStorage.setItem(gameId, JSON.stringify(game));
};

const removeGame = (gameId: string) => {
  localStorage.removeItem(gameId);
};

const removeAllGames = () => {
  const games = retrieveGameList();
  games.forEach((game) => {
    removeGame(game);
  });
};

export {
  initGame,
  retrieveGame,
  retrieveGameList,
  updateGame,
  removeGame,
  removeAllGames,
};
