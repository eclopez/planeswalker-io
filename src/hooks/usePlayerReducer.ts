import { updatePlayerCounters } from "@/helpers/localStorageHelper";
import { PlayerCounterTypes, PlayerGameTypes } from "@/types/GameTypes";

export enum PLAYER_ACTION {
  "UPDATE_COUNTERS",
}

interface PlayerActionType {
  type: PLAYER_ACTION;
  payload?: {
    gameId?: string;
    counters?: Record<PlayerCounterTypes, number>;
  };
}

function playerReducer(state: PlayerGameTypes, action: PlayerActionType) {
  switch (action.type) {
    case PLAYER_ACTION.UPDATE_COUNTERS: {
      const { gameId, counters } = action.payload;
      const newState = { ...state, counters };
      updatePlayerCounters(gameId, newState.id, newState.counters);
      return newState;
    }
  }
}

export default playerReducer;
