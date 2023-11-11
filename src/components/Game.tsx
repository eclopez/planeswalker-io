import { GameProps } from "app/page";

function Game({ startingLife, players }: GameProps) {
  return (
    <>
      {players.map((player) => (
        <h2 key={player}>
          {player} - {startingLife}
        </h2>
      ))}
    </>
  );
}

export default Game;
