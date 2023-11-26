import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  Flex,
  IconButton,
  ScrollArea,
} from "@radix-ui/themes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  loadGameList,
  removeGame,
  removeAllGames,
} from "../helpers/localStorageHelper";
import ConfirmDialog from "./ConfirmDialog";

function ContinueGame() {
  const [open, setOpen] = useState<boolean>(false);
  const [games, setGames] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setGames(() => loadGameList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (games.length === 0) {
      setOpen(() => false);
    }
  }, [games]);

  const gameTextName = (game) => {
    return new Date(parseInt(game.substring(4))).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const continueGame = (game) => {
    router.push(`/game/${game}`);
  };

  const deleteGame = (game) => {
    setGames(() => {
      removeGame(game);
      return loadGameList();
    });
  };

  const deleteAllGames = () => {
    setGames(() => {
      removeAllGames();
      return loadGameList();
    });
  };

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="3" disabled={games.length === 0}>
          Continue Game
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle mb="5">Continue Game</DialogTitle>
        <ScrollArea
          scrollbars="vertical"
          style={{
            height: "30dvh",
          }}
        >
          {games.map((game) => (
            <Flex
              key={game}
              p="2"
              mr="5"
              direction="row"
              gap="3"
              justify="between"
              align="center"
              style={{ borderBottom: "solid 1px var(--gray-5)" }}
            >
              <Button
                variant="ghost"
                data-testid="continueGameLink"
                onClick={() => continueGame(game)}
              >
                {gameTextName(game)}
              </Button>
              <ConfirmDialog
                title="Confirm delete"
                description={`Are you sure you want to delete the game from ${gameTextName(
                  game
                )}?`}
                actionButton="Delete"
                cancelButton="Cancel"
                action={() => deleteGame(game)}
                danger
              >
                <IconButton variant="ghost" color="ruby" size="1">
                  <CrossCircledIcon width="18" height="18" />
                </IconButton>
              </ConfirmDialog>
            </Flex>
          ))}
        </ScrollArea>
        <Flex gap="4">
          <Flex direction="row" justify="between" style={{ width: "100%" }}>
            <DialogClose>
              <Button>Cancel</Button>
            </DialogClose>
            <ConfirmDialog
              title="Confirm delete"
              description="Are you sure you want to delete all of your games?"
              actionButton="Delete all games"
              cancelButton="Cancel"
              action={() => deleteAllGames()}
              danger
            >
              <Button variant="outline" color="ruby">
                Delete all games
              </Button>
            </ConfirmDialog>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
}

export default ContinueGame;
