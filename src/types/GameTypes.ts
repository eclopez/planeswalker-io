export type PlayerCounterTypes = "life" | "poison";

export type PlayerCounterTypesRecord = Record<PlayerCounterTypes, number>;

export type CommanderDamageType = Map<string, number>;

export interface PlayerGameTypes {
  id: number;
  name: string;
  commanderImage: string;
  counters: PlayerCounterTypesRecord;
  commanderDamage?: CommanderDamageType;
}

export type GameTypes = Record<string, PlayerGameTypes[]>;
