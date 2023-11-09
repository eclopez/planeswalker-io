import { Theme, Grid } from "@radix-ui/themes";
import Header from "@/components/Header";
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
          <Grid
            asChild
            columns="1"
            style={{
              height: "100dvh",
              gridTemplateRows: "auto",
              gridAutoRows: "1fr",
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
