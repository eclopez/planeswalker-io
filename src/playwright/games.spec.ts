import { test, expect } from "@playwright/test";

test("should start a new game", async ({ page }) => {
  await page.goto("/");

  await page.click("text=New Game");

  await page.getByLabel("Starting life total").fill("54");

  await page.getByLabel("Number of players").click();
  await page.getByLabel("4", { exact: true }).getByText("4").click();

  await page.locator("[name='playerName1']").fill("Erik");
  await page.locator("[name='playerName2']").fill("Erica");
  await page.locator("[name='playerName3']").fill("Trevin");
  await page.locator("[name='playerName4']").fill("Jonas");

  await page.locator("[type='submit']").click();

  await expect(page).toHaveURL(/\/game\/plw-/);
  await expect(page.getByText("Erik")).toBeTruthy();
  await expect(page.getByText("Erica")).toBeTruthy();
  await expect(page.getByText("Trevin")).toBeTruthy();
  await expect(page.getByText("Jonas")).toBeTruthy();
  await expect(page.getByText("54")).toHaveCount(4);
});

test("should cancel starting a new game", async ({ page }) => {
  await page.goto("/");

  await page.click("text=New Game");

  await page.getByLabel("Starting life total").fill("20");

  await page.getByLabel("Number of players").click();
  await page.getByLabel("2", { exact: true }).getByText("2").click();

  await page.locator("[name='playerName1']").fill("Erik");
  await page.locator("[name='playerName2']").fill("Erica");

  await page.getByText("Cancel").click();
  await expect(page).toHaveURL("/");
});

test("should continue a game", async ({ page }) => {
  await page.goto("/");

  await page.click("text=New Game");

  await page.getByLabel("Starting life total").fill("54");

  await page.getByLabel("Number of players").click();
  await page.getByLabel("4", { exact: true }).getByText("4").click();

  await page.locator("[name='playerName1']").fill("Erik");
  await page.locator("[name='playerName2']").fill("Erica");
  await page.locator("[name='playerName3']").fill("Trevin");
  await page.locator("[name='playerName4']").fill("Jonas");

  await page.locator("[type='submit']").click();

  await page.getByText("Planeswalker.io").click();

  await page.click("text=Continue Game");

  await page.getByTestId("continueGameLink").click();

  await expect(page).toHaveURL(/\/game\/plw-/);
  await expect(page.getByText("Erik")).toBeTruthy();
  await expect(page.getByText("Erica")).toBeTruthy();
  await expect(page.getByText("Trevin")).toBeTruthy();
  await expect(page.getByText("Jonas")).toBeTruthy();
  await expect(page.getByText("54")).toHaveCount(4);
});

test("should cancel continuing a game", async ({ page }) => {
  await page.goto("/");

  await page.click("text=New Game");

  await page.getByLabel("Starting life total").fill("54");

  await page.getByLabel("Number of players").click();
  await page.getByLabel("4", { exact: true }).getByText("4").click();

  await page.locator("[name='playerName1']").fill("Erik");
  await page.locator("[name='playerName2']").fill("Erica");
  await page.locator("[name='playerName3']").fill("Trevin");
  await page.locator("[name='playerName4']").fill("Jonas");

  await page.locator("[type='submit']").click();

  await page.getByText("Planeswalker.io").click();

  await page.click("text=Continue Game");

  await page.getByText("Cancel").click();
  await expect(page).toHaveURL("/");
});

test("should add and remove life from a player during a game", async ({
  page,
}) => {
  await page.goto("/");

  await page.click("text=New Game");

  await page.getByLabel("Starting life total").fill("5");

  await page.getByLabel("Number of players").click();
  await page.getByLabel("1", { exact: true }).getByText("1").click();

  await page.locator("[name='playerName1']").fill("Erik");

  await page.locator("[type='submit']").click();

  await page.getByTestId("incrementLife").click({ clickCount: 3 });

  const lifeTotal = await page.getByTestId("lifeTotal");

  await expect(lifeTotal).toHaveText("8");

  await page.getByTestId("decrementLife").click({ clickCount: 9 });

  await expect(lifeTotal).toHaveText("-1");
});
