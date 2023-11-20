function useLocalStorage() {
  const initGame = (gameId, players, startingLife) => {
    const game = [];

    players.forEach((player) => {
      game.push({
        name: player,
        life: startingLife,
      });
    });

    localStorage.setItem(gameId, JSON.stringify(game));
  };

  const retrieveGame = (gameId) => {
    return JSON.parse(localStorage.getItem(gameId));
  };

  const retrieveGameList = () => {
    const storedGames = { ...localStorage };
    let games = [];

    for (const game in storedGames) {
      if (game.startsWith("plw-")) {
        games.push(game);
      }
    }

    return games;
  };

  const updateGame = (gameId, player, updatedLife) => {
    let game = JSON.parse(localStorage.getItem(gameId));
    for (let i = 0; i < game.length; i++) {
      if (game[i].name === player) {
        game[i].life = updatedLife;
      }
    }
    localStorage.setItem(gameId, JSON.stringify(game));
  };

  const removeGame = (gameId) => {
    localStorage.removeItem(gameId);
  };

  return { initGame, retrieveGame, retrieveGameList, updateGame, removeGame };
}

export default useLocalStorage;
