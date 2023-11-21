"use client";

import { useState, useEffect } from "react";
import { Flex, Button } from "@radix-ui/themes";
import NewGame from "@/components/NewGame";
import ContinueGame from "@/components/ContinueGame";

function Menu() {
  return (
    <Flex align="center" justify="center" style={{ gridColumn: "1 / 3" }}>
      <Flex
        direction="column"
        gap="4"
        style={{ width: "180px", height: "fit-content" }}
      >
        <NewGame />
        <ContinueGame />
        <Button size="3" disabled>
          About
        </Button>
      </Flex>
    </Flex>
  );
}

export default Menu;
