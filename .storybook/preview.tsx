import React from "react";
import { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Theme, colorProp } from "@radix-ui/themes";
import "the-new-css-reset/css/reset.css";
import "@radix-ui/themes/styles.css";
import "../src/styles/styles.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "lightning",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
    color: {
      name: "Color",
      description: "Color theme for components",
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
      <html lang="en" className={context.globals.theme}>
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
