import React from "react";
import { Preview } from "@storybook/react";
import { Theme, colorProp } from "@radix-ui/themes";
import "@/styles/globalStyles.css";

const preview: Preview = {
  globalTypes: {
    brightness: {
      description: "Global Radix UI brightness theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "lightning",
        items: ["dark", "light"],
        dynamicTitle: true,
      },
    },
    color: {
      name: "Color",
      description: "Global Radix UI color theme",
      defaultValue: "violet",
      toolbar: {
        icon: "paintbrush",
        items: colorProp.values,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <html lang="en" className={context.globals.brightness}>
        <Theme accentColor={context.globals.color}>
          <Story />
        </Theme>
      </html>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
