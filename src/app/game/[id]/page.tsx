"use client";

import { useReducer, useEffect } from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { PlayerGameTypes } from "@/types/GameTypes";
import gameReducer, { GAME_ACTION } from "@/hooks/useGameReducer";
import Player from "@/components/Player";

interface GameParams {
  params: {
    id: string;
  };
}

function Page({ params }: GameParams) {
  const [state, dispatch] = useReducer(gameReducer, {});
  const { id } = params;

  useEffect(() => {
    dispatch({ type: GAME_ACTION.LOAD_GAME, payload: { id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state[id]) {
    return (
      <>
        {state[id].map((player: PlayerGameTypes, index: number) => (
          <Player
            key={player.name}
            gameId={id}
            player={player}
            solo={state[id].length === 1}
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
