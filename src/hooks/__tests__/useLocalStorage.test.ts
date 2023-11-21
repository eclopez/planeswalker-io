import useLocalStorage from "@/hooks/useLocalStorage";
import {
  TwoPlayerGame,
  ThreePlayerGame,
  FourPlayerGame,
} from "../__mocks__/GameMocks";

import { info } from "console";

describe("useLocalStorage", () => {
  describe("initGame", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should save a two player game in localStorage", () => {
      const { initGame } = useLocalStorage();
      const { gameId, players, startingLife } = TwoPlayerGame;

      initGame(gameId, players, startingLife);

      const game = JSON.parse(localStorage.getItem(gameId));
      expect(game.length).toBe(2);
      expect(game[0].name).toBe("Erik");
      expect(game[0].life).toBe(40);
      expect(game[1].name).toBe("Erica");
      expect(game[1].life).toBe(40);
    });
  });
  describe("retrieveGame", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("should retrieve a game from localStorage", () => {
      const { retrieveGame } = useLocalStorage();
      const { gameId, players, startingLife } = TwoPlayerGame;

      const twoPlayers = players.map((player, index) => {
        return { id: index, name: player, life: startingLife };
      });
      localStorage.setItem(gameId, JSON.stringify(twoPlayers));

      const game = retrieveGame(gameId);

      expect(game.length).toBe(2);
      expect(game[0].name).toBe("Erik");
      expect(game[0].life).toBe(40);
      expect(game[1].name).toBe("Erica");
      expect(game[1].life).toBe(40);
    });
  });
  describe("retrieveGameList", () => {
    it("should retrieve a list of games from localStorage", () => {
      const { retrieveGameList } = useLocalStorage();
      const {
        gameId: gameId2,
        players: players2,
        startingLife: startingLife2,
      } = TwoPlayerGame;
      const {
        gameId: gameId3,
        players: players3,
        startingLife: startingLife3,
      } = ThreePlayerGame;
      const {
        gameId: gameId4,
        players: players4,
        startingLife: startingLife4,
      } = FourPlayerGame;

      const twoPlayers = players2.map((player, index) => {
        return { id: index, name: player, life: startingLife2 };
      });
      const threePlayers = players3.map((player, index) => {
        return { id: index, name: player, life: startingLife3 };
      });
      const fourPlayers = players4.map((player, index) => {
        return { id: index, name: player, life: startingLife4 };
      });

      localStorage.setItem(gameId2, JSON.stringify(twoPlayers));
      localStorage.setItem(gameId3, JSON.stringify(threePlayers));
      localStorage.setItem(gameId4, JSON.stringify(fourPlayers));

      const game = retrieveGameList();

      expect(game.length).toBe(3);
    });
  });
  describe("updateGame", () => {
    it("should update an existing game from localStorage", () => {
      const { updateGame } = useLocalStorage();
      const { gameId, players, startingLife } = TwoPlayerGame;

      const twoPlayers = players.map((player, index) => {
        return { id: index, name: player, life: startingLife };
      });
      localStorage.setItem(gameId, JSON.stringify(twoPlayers));

      updateGame(gameId, 1, 56);

      const game = JSON.parse(localStorage.getItem(gameId));
      expect(game.length).toBe(2);
      expect(game[0].name).toBe("Erik");
      expect(game[0].life).toBe(40);
      expect(game[1].name).toBe("Erica");
      expect(game[1].life).toBe(56);
    });
  });
  describe("removeGame", () => {
    it("should remove a game from localStorage", () => {
      const { removeGame } = useLocalStorage();
      const { gameId, players, startingLife } = TwoPlayerGame;

      const twoPlayers = players.map((player, index) => {
        return { id: index, name: player, life: startingLife };
      });
      localStorage.setItem(gameId, JSON.stringify(twoPlayers));

      expect(localStorage.getItem(gameId)).not.toBeNull();

      removeGame(gameId);

      expect(localStorage.getItem(gameId)).toBeNull();
    });
  });
});
