import Player from "@/components/Player";
import { GameProps } from "app/page";

function Game({ startingLife, players }: GameProps) {
  return players.map((player) => (
    <Player key={player} name={player} startingLife={startingLife} />
  ));
}

export default Game;
