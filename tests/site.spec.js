import { test, expect } from "@playwright/test";
test("catalogue, player and comparison work", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "uk");
  await expect(page.locator("main section")).toHaveCount(10);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Людина проти",
  );
  await page.getByRole("tab", { name: "Відео", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Runway", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("tab", { name: "Відео", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Текст і код", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Запустити", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Пауза", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Пауза", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Продовжити", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Пропустити до результату" }).click();
  await expect(
    page.getByText("Демонстрацію завершено", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".ai-participant").first().locator(".findings li"),
  ).toHaveCount(5);
  await page.getByRole("button", { name: "Повторити демонстрацію" }).click();
  await expect(
    page.getByRole("button", { name: "Пауза", exact: true }),
  ).toBeVisible();
  await page.locator("#criterion").selectOption("4");
  await expect(
    page.getByRole("img", { name: /Демонстраційні бали: Швидкість/ }),
  ).toBeVisible();
  await page.locator(".participant-selector button").first().click();
  await expect(page.locator(".result-details h3")).toHaveText("Людина");
  await expect(
    page.locator(".result-details summary").filter({ hasText: "Пропущено" }),
  ).toHaveCount(2);
  await page.locator(".result-details summary").first().click();
  await expect(
    page
      .locator(".result-details details[open]")
      .getByText(/Використовувати параметризовані запити/),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("mobile navigation, viewport and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Відкрити меню" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Результати", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Відкрити меню" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Запустити", exact: true }).click();
  await expect(
    page.getByText("Демонстрацію завершено", { exact: true }),
  ).toBeVisible({ timeout: 5000 });
  await page.screenshot({ path: "/tmp/ai-code-mobile.png", fullPage: true });
});
test("desktop visual check", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "/tmp/ai-code-desktop.png", fullPage: true });
});
