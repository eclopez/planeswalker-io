import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  Flex,
} from "@radix-ui/themes";

interface ContinueGameProps {
  games: string[];
}

function ContinueGame({ games }: ContinueGameProps) {
  const router = useRouter();

  const continueGame = (game) => {
    router.push(`/game/${game}`);
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <Button size="3" disabled={games.length === 0}>
          Continue Game
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle mb="5">Continue Game</DialogTitle>
        {games.map((game) => (
          <Box key={game} mb="4">
            <Button size="3" onClick={() => continueGame(game)}>
              {new Date(parseInt(game.substring(4))).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </Button>
          </Box>
        ))}
        <Flex gap="4">
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
}

export default ContinueGame;
