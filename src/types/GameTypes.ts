type PlayerCounterTypes = "life" | "poison";

type PlayerCounterTypesRecord = Record<PlayerCounterTypes, number>;

interface PlayerGameTypes {
  id: number;
  name: string;
  commanderImage: string;
  counters: PlayerCounterTypesRecord;
}

type GameTypes = Record<string, PlayerGameTypes[]>;

export {
  type PlayerCounterTypes,
  type PlayerCounterTypesRecord,
  type PlayerGameTypes,
  type GameTypes,
};
