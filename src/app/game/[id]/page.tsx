"use client";

import { useState, useEffect } from "react";
import { retrieveGame } from "@/helpers/localStorageHelper";
import Player from "@/components/Player";

interface GameParams {
  params: {
    id: string;
  };
}

function Page({ params }: GameParams) {
  const [game, setGame] = useState([]);
  const { id } = params;

  useEffect(() => {
    setGame(retrieveGame(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {game.map((player, index) => (
        <Player
          key={player.name}
          gameId={id}
          playerId={index}
          name={player.name}
          life={player.life}
        />
      ))}
    </>
  );
}

export default Page;
