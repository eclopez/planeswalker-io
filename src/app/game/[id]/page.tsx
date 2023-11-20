"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import Player from "@/components/Player";

interface GameParams {
  params: {
    id: string;
  };
}

function Page({ params }: GameParams) {
  const [game, setGame] = useState([]);
  const { id } = params;
  const { retrieveGame } = useLocalStorage();

  useEffect(() => {
    setGame(retrieveGame(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {game.map((player) => (
        <Player
          key={player.name}
          gameId={id}
          name={player.name}
          life={player.life}
        />
      ))}
    </>
  );
}

export default Page;
