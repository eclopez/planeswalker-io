"use client";

import { useState, useEffect } from "react";
import { Flex, Heading } from "@radix-ui/themes";
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

  if (game) {
    return (
      <>
        {game.map((player, index) => (
          <Player
            key={player.name}
            gameId={id}
            playerId={index}
            name={player.name}
            life={player.life}
            solo={game.length === 1}
          />
        ))}
      </>
    );
  } else {
    return (
      <Flex align="center" justify="center" style={{ gridColumn: "1 / 3" }}>
        <Heading as="h2">{`Game ${id} not found!`}</Heading>
      </Flex>
    );
  }
}

export default Page;
