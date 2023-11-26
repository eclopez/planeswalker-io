import { saveGame, loadGame } from "@/helpers/localStorageHelper";
import { PlayerGameTypes, GameTypes } from "types/GameTypes";

export enum GAME_ACTION {
  "CREATE_GAME",
  "LOAD_GAME",
  "UPDATE_PLAYER",
}

interface GameActionType {
  type: GAME_ACTION;
  payload?: {
    id?: string;
    players?: PlayerGameTypes[];
  };
}

function gameReducer(state: GameTypes, action: GameActionType) {
  switch (action.type) {
    case GAME_ACTION.CREATE_GAME: {
      const { id, players } = action.payload;
      const newState = { [id]: players };
      saveGame(newState);
      return newState;
    }
    case GAME_ACTION.LOAD_GAME: {
      const { id } = action.payload;
      return loadGame(id);
    }
  }
}

export default gameReducer;
