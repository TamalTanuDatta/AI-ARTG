import { test, expect } from "@playwright/test";

test.describe("Registration Form Tests", () => {
  const BASE_URL = "https://www.leasingmarkt.de/register";

  test.describe("Button Interactions Tests", () => {

    test("Button Interactions 1: Test button interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("button:has-text(\"\"Kostenlos registrieren\"\")")).toBeVisible()
      await page.click("button:has-text(\"\"Kostenlos registrieren\"\")")
    });

    test("Button Interactions 2: Check visibility of subscribe fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("button[name=\"subscribe\"]")).toBeVisible()
      await page.click("button[name=\"subscribe\"]")
    });

    test("Button Interactions 3: Test button interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("button:has-text(\"\"Favoriten 0\"\")")).toBeVisible()
      await page.click("button:has-text(\"\"Favoriten 0\"\")")
    });

    test("Button Interactions 4: Test button interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("button:has-text(\"\"0\"\")")).toBeVisible()
      await page.click("button:has-text(\"\"0\"\")")
    });

    test("Button Interactions 5: Test button interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("[aria-label=\"Close\"]")).toBeVisible()
      await page.click("[aria-label=\"Close\"]")
    });

  });

  test.describe("Element Visibility Tests", () => {

    test("Element Visibility 1: Check visibility of _token fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"_token\"]")).toBeVisible()
    });

    test("Element Visibility 2: Check visibility of gender fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"gender\"]")).toBeVisible()
    });

    test("Element Visibility 3: Test form element interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input")).toBeVisible()
    });

    test("Element Visibility 4: Check visibility of name fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"name\"]")).toBeVisible()
    });

    test("Element Visibility 5: Check visibility of surname fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"surname\"]")).toBeVisible()
    });

    test("Element Visibility 6: Check visibility of email fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"email\"]")).toBeVisible()
    });

    test("Element Visibility 7: Check visibility of password fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"password\"]")).toBeVisible()
    });

    test("Element Visibility 8: Test form element interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("#agb_datenschutz")).toBeVisible()
    });

    test("Element Visibility 9: Test form element interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("#newsletter")).toBeVisible()
    });

    test("Element Visibility 10: Check visibility of show-as24-cmp fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"show-as24-cmp\"]")).toBeVisible()
    });

    test("Element Visibility 11: Check visibility of source fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator("input[name=\"source\"]")).toBeVisible()
    });

  });

  test.describe("Form Submission Tests", () => {

    test("Form Submission 1: Submit form with email, name, password, surname fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input", "Test Input")
      await page.fill("input[name=\"name\"]", "Test Input")
      await page.fill("input[name=\"surname\"]", "Test Input")
      await page.fill("input[name=\"email\"]", "test@example.com")
      await page.fill("input[name=\"password\"]", "ValidP@ssw0rd")
      await page.locator("#register-form").click()
      await expect(page.locator("#register-form")).toBeVisible()
      const formValid = await page.$eval("#register-form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeTruthy()
      await page.waitForTimeout(500)
    });

    test("Form Submission 2: Test button interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.click("button:has-text(\"\"Kostenlos registrieren\"\")")
      await expect(page.locator("#register-form")).toBeVisible()
      const formValid = await page.$eval("#register-form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeTruthy()
      await page.waitForTimeout(500)
    });

    test("Form Submission 3: Submit form with email fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"email\"]", "test@example.com")
      await page.locator("form").click()
      await expect(page.locator("form")).toBeVisible()
      const formValid = await page.$eval("form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeTruthy()
      await page.waitForTimeout(500)
    });

    test("Form Submission 4: Submit form with _token fields", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"_token\"]", "Test Input")
      await page.locator("form").click()
      await expect(page.locator("form")).toBeVisible()
      const formValid = await page.$eval("form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeTruthy()
      await page.waitForTimeout(500)
    });

  });

  test.describe("Form Validation Tests", () => {

    test("Form Validation 1: Test form element interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator("#register-form").click()
      const formValid = await page.$eval("form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeFalsy()
    });

    test("Form Validation 2: Test form element interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator("form").click()
      const formValid = await page.$eval("form", (form: HTMLFormElement) => form.checkValidity())
      expect(formValid).toBeFalsy()
    });

  });

  test.describe("Input Interactions Tests", () => {

    test("Input Interactions 1: Test email field interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"email\"]", "test@example.com")
      await expect(page.locator("input[name=\"email\"]")).toHaveValue("test@example.com")
    });

    test("Input Interactions 2: Test email field interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"email\"]", "invalid-email")
      await expect(page.locator("input[name=\"email\"]")).toBeVisible()
      const isInvalid = await page.$eval("input[name=\"email\"]", (el: HTMLFormElement) => !el.checkValidity())
      expect(isInvalid).toBeTruthy()
    });

    test("Input Interactions 3: Test password field interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"password\"]", "ValidP@ssw0rd")
      await expect(page.locator("input[name=\"password\"]")).toHaveValue("ValidP@ssw0rd")
    });

    test("Input Interactions 4: Test password field interactions", async ({ page }) => {
      await page.goto(BASE_URL);
      await page.fill("input[name=\"password\"]", "short")
      await expect(page.locator("input[name=\"password\"]")).toBeVisible()
      const isInvalid = await page.$eval("input[name=\"password\"]", (el: HTMLFormElement) => !el.checkValidity())
      expect(isInvalid).toBeTruthy()
    });

  });

});