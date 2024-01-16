import type { Meta, StoryObj } from "@storybook/react";
import NewGame from "@/components/NewGame";

const meta = {
  title: "Planeswalker.io/New Game",
  component: NewGame,
  parameters: {
    tags: ["autodocs"],
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/game",
        query: {
          gameId: "1234",
        },
      },
    },
  },
} satisfies Meta<typeof NewGame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
