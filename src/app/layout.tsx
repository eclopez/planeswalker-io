import { Theme } from "@radix-ui/themes";
import "the-new-css-reset/css/reset.css";
import "@radix-ui/themes/styles.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="violet">
          {children}
        </Theme>
      </body>
    </html>
  );
}

export default RootLayout;
