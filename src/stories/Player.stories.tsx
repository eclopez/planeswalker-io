import type { Meta, StoryObj } from "@storybook/react";
import { Players } from "@/mocks/GameMocks";
import Player from "@/components/Player";

const meta = {
  title: "Planeswalker.io/Player",
  component: Player,
  parameters: {
    tags: ["autodocs"],
    layout: "fullscreen",
  },
} satisfies Meta<typeof Player>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      window.localStorage.setItem(
        "plw-1234",
        JSON.stringify([{ ...Players[0] }])
      );
      return <Story />;
    },
  ],
  args: {
    gameId: "plw-1234",
    player: Players[0],
  },
};
