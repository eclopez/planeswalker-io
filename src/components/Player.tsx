import { useState } from "react";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";

interface PlayerProps {
  name: string;
  readonly startingLife: number;
}

function Player({ name, startingLife }: PlayerProps) {
  const [life, setLife] = useState(startingLife);

  return (
    <Card>
      <Flex gap="1" justify={"between"}>
        <Text size="7">{name}</Text>
        <Flex>
          <Button onClick={() => setLife(life + 1)}>
            <PlusIcon />
          </Button>
          <Text size="7">{life}</Text>
          <Button onClick={() => setLife(life - 1)}>
            <MinusIcon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default Player;
