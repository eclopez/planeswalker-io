import {
  loadGame,
  saveGame,
  loadGameList,
  removeGame,
  removeAllGames,
  updatePlayerCounters,
} from "../localStorageHelper";
import {
  OnePlayerGame,
  TwoPlayerGame,
  ThreePlayerGame,
  FourPlayerGame,
  FivePlayerGame,
  SixPlayerGame,
} from "@/mocks/GameMocks";

describe("localStorageHelper", () => {
  describe("saveGame", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should save a two player game in localStorage", () => {
      const gameId = Object.keys(TwoPlayerGame)[0];

      saveGame(TwoPlayerGame);

      const game = JSON.parse(localStorage.getItem(gameId));
      expect(game.length).toBe(2);
      expect(game[0].id).toBe(0);
      expect(game[0].name).toBe("Erik");
      expect(game[0].commanderImage).toBeNull;
      expect(game[0].counters.life).toBe(40);
      expect(game[0].counters.poison).toBe(0);
      expect(game[1].id).toBe(1);
      expect(game[1].name).toBe("Erica");
      expect(game[1].commanderImage).toBeNull;
      expect(game[1].counters.life).toBe(40);
      expect(game[1].counters.poison).toBe(0);
    });
  });

  describe("loadGame", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should load a game from localStorage", () => {
      const gameId = Object.keys(TwoPlayerGame)[0];
      localStorage.setItem(gameId, JSON.stringify(TwoPlayerGame[gameId]));

      const game = loadGame(gameId);
      const players = game[gameId];

      expect(players.length).toBe(2);
      expect(players[0].id).toBe(0);
      expect(players[0].name).toBe("Erik");
      expect(players[0].commanderImage).toBeNull;
      expect(players[0].counters.life).toBe(40);
      expect(players[0].counters.poison).toBe(0);
      expect(players[1].id).toBe(1);
      expect(players[1].name).toBe("Erica");
      expect(players[1].commanderImage).toBeNull;
      expect(players[1].counters.life).toBe(40);
      expect(players[1].counters.poison).toBe(0);
    });
  });

  describe("loadGameList", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should retrieve a list of games from localStorage", () => {
      const gameId1 = Object.keys(OnePlayerGame)[0];
      localStorage.setItem(gameId1, JSON.stringify(OnePlayerGame[gameId1]));

      const gameId2 = Object.keys(TwoPlayerGame)[0];
      localStorage.setItem(gameId2, JSON.stringify(TwoPlayerGame[gameId2]));

      const gameId3 = Object.keys(ThreePlayerGame)[0];
      localStorage.setItem(gameId3, JSON.stringify(ThreePlayerGame[gameId3]));

      const gameId4 = Object.keys(FourPlayerGame)[0];
      localStorage.setItem(gameId4, JSON.stringify(FourPlayerGame[gameId4]));

      const gameId5 = Object.keys(FivePlayerGame)[0];
      localStorage.setItem(gameId5, JSON.stringify(FivePlayerGame[gameId5]));

      const gameId6 = Object.keys(SixPlayerGame)[0];
      localStorage.setItem(gameId6, JSON.stringify(SixPlayerGame[gameId6]));

      const game = loadGameList();

      expect(game.length).toBe(6);
    });
  });

  describe("removeGame", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should remove a game from localStorage", () => {
      const gameId = Object.keys(TwoPlayerGame)[0];
      localStorage.setItem(gameId, JSON.stringify(TwoPlayerGame[gameId]));

      expect(localStorage.getItem(gameId)).not.toBeNull();

      removeGame(gameId);

      expect(localStorage.getItem(gameId)).toBeNull();
    });
  });

  describe("removeAllGames", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should remove all games from localStorage", () => {
      const gameId1 = Object.keys(OnePlayerGame)[0];
      localStorage.setItem(gameId1, JSON.stringify(OnePlayerGame[gameId1]));

      const gameId2 = Object.keys(TwoPlayerGame)[0];
      localStorage.setItem(gameId2, JSON.stringify(TwoPlayerGame[gameId2]));

      const gameId3 = Object.keys(ThreePlayerGame)[0];
      localStorage.setItem(gameId3, JSON.stringify(ThreePlayerGame[gameId3]));

      const gameId4 = Object.keys(FourPlayerGame)[0];
      localStorage.setItem(gameId4, JSON.stringify(FourPlayerGame[gameId4]));

      const gameId5 = Object.keys(FivePlayerGame)[0];
      localStorage.setItem(gameId5, JSON.stringify(FivePlayerGame[gameId5]));

      const gameId6 = Object.keys(SixPlayerGame)[0];
      localStorage.setItem(gameId6, JSON.stringify(SixPlayerGame[gameId6]));

      expect(localStorage.getItem(gameId1)).not.toBeNull();
      expect(localStorage.getItem(gameId2)).not.toBeNull();
      expect(localStorage.getItem(gameId3)).not.toBeNull();
      expect(localStorage.getItem(gameId4)).not.toBeNull();
      expect(localStorage.getItem(gameId5)).not.toBeNull();
      expect(localStorage.getItem(gameId6)).not.toBeNull();

      removeAllGames();

      expect(localStorage.getItem(gameId1)).toBeNull();
      expect(localStorage.getItem(gameId2)).toBeNull();
      expect(localStorage.getItem(gameId3)).toBeNull();
      expect(localStorage.getItem(gameId4)).toBeNull();
      expect(localStorage.getItem(gameId5)).toBeNull();
      expect(localStorage.getItem(gameId6)).toBeNull();
    });
  });

  describe("updatePlayerCounters", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should update a player in an existing game from localStorage", () => {
      const gameId = Object.keys(TwoPlayerGame)[0];
      localStorage.setItem(gameId, JSON.stringify(TwoPlayerGame[gameId]));

      updatePlayerCounters(gameId, 1, { life: 56, poison: 0 });

      const game = JSON.parse(localStorage.getItem(gameId));
      expect(game.length).toBe(2);
      expect(game[0].name).toBe("Erik");
      expect(game[0].counters.life).toBe(40);
      expect(game[0].counters.poison).toBe(0);
      expect(game[1].name).toBe("Erica");
      expect(game[1].counters.life).toBe(56);
      expect(game[1].counters.poison).toBe(0);
    });
  });
});
