"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import Game from "@/components/Game";

export interface GameProps {
  startingLife: number;
  players: string[];
}

function Page() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [startingLife, setStartingLife] = useState<number>();
  const [playerNames, setPlayerNames] = useState<string[]>();

  const startGame = ({ startingLife, players }: GameProps) => {
    setStartingLife(startingLife);
    setPlayerNames(players);
    setIsStarted(true);
  };

  if (!isStarted) {
    return <Menu startGame={startGame} />;
  } else {
    return <Game startingLife={startingLife} players={playerNames} />;
  }
}

export default Page;
