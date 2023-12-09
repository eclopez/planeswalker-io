import {
  updatePlayerCounters,
  updatePlayerCommanderDamage,
} from "@/helpers/localStorageHelper";
import {
  PlayerCounterTypes,
  PlayerGameTypes,
  CommanderDamageType,
} from "@/types/GameTypes";

export enum PLAYER_ACTION {
  "UPDATE_COUNTERS",
  "UPDATE_COMMANDER_DAMAGE",
}

export interface PlayerActionType {
  type: PLAYER_ACTION;
  payload?: {
    gameId?: string;
    counters?: Record<PlayerCounterTypes, number>;
    commanderDamage?: CommanderDamageType;
  };
}

function playerReducer(
  state: PlayerGameTypes,
  action: PlayerActionType
): PlayerGameTypes {
  switch (action.type) {
    case PLAYER_ACTION.UPDATE_COUNTERS: {
      const { gameId, counters } = action.payload;
      const newState = { ...state, counters };
      updatePlayerCounters(gameId, newState.id, newState.counters);
      return newState;
    }
    case PLAYER_ACTION.UPDATE_COMMANDER_DAMAGE: {
      const { gameId, commanderDamage } = action.payload;
      const newState = { ...state, commanderDamage };
      updatePlayerCommanderDamage(
        gameId,
        newState.id,
        newState.commanderDamage
      );
      return newState;
    }
  }
}

export default playerReducer;
