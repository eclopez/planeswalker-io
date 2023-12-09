import { useState } from "react";
import {
  CalloutRoot,
  CalloutIcon,
  CalloutText,
  DialogRoot,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogClose,
  Flex,
  Text,
  Box,
  Button,
} from "@radix-ui/themes";
import { MinusIcon, PlusIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { CommanderDamageType } from "@/types/GameTypes";

interface CommanderDamageProps {
  playerName: string;
  commanderDamage?: CommanderDamageType;
  handleChange: (commanderDamage: CommanderDamageType) => void;
}

function CommanderDamage({
  playerName,
  commanderDamage,
  handleChange,
}: CommanderDamageProps) {
  const [tempCommanderDamage, setTempCommanderDamage] =
    useState<CommanderDamageType>(new Map(commanderDamage));

  const handleDamageChange = (opponent: string, delta: number) => {
    setTempCommanderDamage((prevState) => {
      const newState = new Map(prevState);
      newState.set(opponent, newState.get(opponent) + delta);
      return newState;
    });
  };

  const handleCommanderDamageSave = (): void => {
    handleChange(tempCommanderDamage);
  };

  const cancelCommanderDamage = () => {
    setTempCommanderDamage(() => {
      return new Map(commanderDamage);
    });
  };

  return (
    <DialogRoot>
      <DialogTrigger style={{ width: "50%" }}>
        <Box display="inline-block">
          <CalloutRoot
            variant="surface"
            color="blue"
            style={{ padding: "8px", columnGap: "8px" }}
          >
            <CalloutIcon>
              <StarFilledIcon />
            </CalloutIcon>
            <CalloutText>
              <Flex direction="column" gap="1" asChild>
                <span>
                  {Array.from(commanderDamage.keys()).map((opponent) => (
                    <Flex key={opponent} justify="between" asChild>
                      <span>
                        <Text>{opponent}</Text>
                        <Text style={{ marginLeft: "20px" }}>
                          {commanderDamage.get(opponent)}
                        </Text>
                      </span>
                    </Flex>
                  ))}
                </span>
              </Flex>
            </CalloutText>
          </CalloutRoot>
        </Box>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Commander Damage for {playerName}</DialogTitle>
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2" asChild>
            <span>
              {[...tempCommanderDamage.keys()].map((opponent) => (
                <Flex
                  key={opponent}
                  justify="between"
                  style={{ borderBottom: "solid 1px var(--gray-5)" }}
                  pb="2"
                  asChild
                >
                  <span>
                    <Text size="6">{opponent}</Text>
                    <Flex gap="2">
                      <Button onClick={() => handleDamageChange(opponent, 1)}>
                        <PlusIcon />
                      </Button>
                      <Text size="6">{tempCommanderDamage.get(opponent)}</Text>
                      <Button onClick={() => handleDamageChange(opponent, -1)}>
                        <MinusIcon />
                      </Button>
                    </Flex>
                  </span>
                </Flex>
              ))}
            </span>
          </Flex>
          <Flex gap="4">
            <DialogClose>
              <Button
                type="submit"
                onClick={(e) => handleCommanderDamageSave()}
              >
                Save
              </Button>
            </DialogClose>
            <Button variant="surface" onClick={cancelCommanderDamage}>
              Reset
            </Button>
            <DialogClose>
              <Button variant="outline" onClick={cancelCommanderDamage}>
                Cancel
              </Button>
            </DialogClose>
          </Flex>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
}

export default CommanderDamage;
