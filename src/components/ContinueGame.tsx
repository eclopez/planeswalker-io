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
  ScrollArea,
  TableRoot,
  TableBody,
  TableCell,
  TableRow,
} from "@radix-ui/themes";
import Link from "next/link";

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
        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{
            height: "30dvh",
          }}
        >
          {games.map((game) => (
            <Box key={game} p="2">
              <Button variant="ghost" onClick={() => continueGame(game)}>
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
        </ScrollArea>
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
