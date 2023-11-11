import { Viewport } from "next";
import { Theme, Grid } from "@radix-ui/themes";
import Header from "@/components/Header";
import "the-new-css-reset/css/reset.css";
import "@radix-ui/themes/styles.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="violet">
          <Grid
            asChild
            columns={{ initial: "1", xs: "2" }}
            style={{
              height: "100dvh",
              gridTemplateRows: "auto",
              gridAutoRows: "1fr",
              gridAutoColumns: "1fr",
            }}
          >
            <main>
              <Header />
              {children}
            </main>
          </Grid>
        </Theme>
      </body>
    </html>
  );
}

export default RootLayout;
