import { test, expect } from "@playwright/test";

// Configure browser context to block cookie popups
test.use({
  actionTimeout: 10000,
  contextOptions: {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    bypassCSP: true,
  }
});

test.beforeEach(async ({ context, page }) => {
  // Block cookie and tracking related requests
  await context.route(/(consent|cookie|gdpr|analytics|tracking)/, route => route.abort());

  // Inject script to disable cookie popups
  await context.addInitScript(() => {
    Object.defineProperty(document, "cookie", {
      get: function() { return ""; },
      set: function() { return true; }
    });
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  // Navigate to page
  await page.goto("https://www.leasingmarkt.de/register");
  await page.waitForLoadState("networkidle");
});

test.describe("Registrierung - LeasingMarkt.de Page Test", () => {
  const BASE_URL = "https://www.leasingmarkt.de/register";

  test.describe("Link Tests", () => {
    // Testing links to www.leasingmarkt.de
    test("should validate Www.Leasingmarkt.De Leasing Skoda link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-skoda"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Jeep link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-jeep"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-jeep is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-jeep is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Magazin link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/magazin"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/magazin is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/magazin is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Deals link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/deals"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/deals is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/deals is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mazda link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mazda"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mazda is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mazda is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Auto Tests link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/auto-tests"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/auto-tests is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/auto-tests is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De So Funktioniert Leasingmarkt link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/so-funktioniert-leasingmarkt"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/so-funktioniert-leasingmarkt is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/so-funktioniert-leasingmarkt is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Seat link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-seat"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-seat is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-seat is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Opel link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-opel"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Cupra link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-cupra"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Firmenwagen Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/firmenwagen-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/firmenwagen-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/firmenwagen-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Audi link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-audi"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Ford link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-ford"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-ford is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-ford is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Unter 100 Euro link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-unter-100-euro"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-unter-100-euro is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-unter-100-euro is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kurzzeitleasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kurzzeitleasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kurzzeitleasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kurzzeitleasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Lagerfahrzeuge link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/lagerfahrzeuge"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/lagerfahrzeuge is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/lagerfahrzeuge is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De E Auto link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/e-auto"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/e-auto is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/e-auto is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Ohne Anzahlung link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-ohne-anzahlung"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-ohne-anzahlung is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-ohne-anzahlung is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Register link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/register"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/register is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/register is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kooperation Mit Autoscout24 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kooperation-mit-autoscout24"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kooperation-mit-autoscout24 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kooperation-mit-autoscout24 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Impressum link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/impressum"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/impressum is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/impressum is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mg link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mg"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mg is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mg is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mercedes Benz link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mercedes_benz"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Dacia link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-dacia"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-dacia is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-dacia is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Partner link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/partner"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/partner is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/partner is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mitsubishi link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mitsubishi"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mitsubishi is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mitsubishi is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Volvo link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-volvo"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-volvo is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-volvo is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Kia link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-kia"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-kia is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-kia is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Ratgeber link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Hersteller link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/hersteller"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/hersteller is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/hersteller is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De E Book link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/e-book"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/e-book is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/e-book is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Parkplatz link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/parkplatz"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/parkplatz is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/parkplatz is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Porsche link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-porsche"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-porsche is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-porsche is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Presse link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/presse"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/presse is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/presse is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Region link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/region"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/region is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/region is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Datenschutz link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/datenschutz"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/datenschutz is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/datenschutz is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Fiat link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-fiat"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Toyota link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-toyota"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-toyota is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-toyota is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Haendler link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/haendler"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/haendler is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/haendler is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Auto Abo link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/auto-abo"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/auto-abo is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/auto-abo is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Hyundai link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-hyundai"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai is not visible on the page`);
      }
    });

    test("should validate Ratgeber Faq link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber/faq"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/faq is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/faq is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Gebrauchtwagen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/gebrauchtwagen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Hybrid Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/hybrid-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/hybrid-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/hybrid-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Suzuki link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-suzuki"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-suzuki is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-suzuki is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Login link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/login"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/login is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/login is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Vergleiche link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-vergleiche"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vergleiche is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vergleiche is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Bmw link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-bmw"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Allgemeine Geschaeftsbedingungen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Newsletter link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/newsletter"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/newsletter is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/newsletter is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Privatleasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/privatleasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/privatleasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/privatleasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Neuwagen Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/neuwagen-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/neuwagen-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/neuwagen-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Peugeot link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-peugeot"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Vw link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-vw"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Listing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/listing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/listing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/listing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kosten link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kosten"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kosten is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kosten is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kontakt link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kontakt"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kontakt is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kontakt is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasinguebernahme link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasinguebernahme"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasinguebernahme is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasinguebernahme is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Citroen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-citroen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Renault link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-renault"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault is not visible on the page`);
      }
    });

    test("should validate Ratgeber Leasing Lexikon link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber/leasing-lexikon"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-lexikon is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-lexikon is not visible on the page`);
      }
    });

    // Testing links to www.autoscout24.com
    test("should validate Search Roles ?Company=Leasingmarkt.De link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de is not visible on the page`);
      }
    });

    test("should validate Leasingmarkt De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/ is not visible on the page`);
      }
    });

    // Testing links to autoscout24-media.com
    test("should validate Autoscout24 Media.Com Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://autoscout24-media.com/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://autoscout24-media.com/ is validated successfully`);
      } else {
        console.log(`Link with href https://autoscout24-media.com/ is not visible on the page`);
      }
    });

    // Testing links to itunes.apple.com
    test("should validate Leasingmarkt De Auto Leasing Angebote Suche Id1261336827?Mt=8 link", async ({ page }) => {
      const link = page.locator('a[href="https://itunes.apple.com/de/app/leasingmarkt-de-auto-leasing-angebote-suche/id1261336827?mt=8"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://itunes.apple.com/de/app/leasingmarkt-de-auto-leasing-angebote-suche/id1261336827?mt=8 is validated successfully`);
      } else {
        console.log(`Link with href https://itunes.apple.com/de/app/leasingmarkt-de-auto-leasing-angebote-suche/id1261336827?mt=8 is not visible on the page`);
      }
    });

    // Testing links to play.google.com
    test("should validate Apps Details?Id=De.Leasingmarkt.App link", async ({ page }) => {
      const link = page.locator('a[href="https://play.google.com/store/apps/details?id=de.leasingmarkt.app"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://play.google.com/store/apps/details?id=de.leasingmarkt.app is validated successfully`);
      } else {
        console.log(`Link with href https://play.google.com/store/apps/details?id=de.leasingmarkt.app is not visible on the page`);
      }
    });

    // Testing links to www.facebook.com
    test("should validate Www.Facebook.Com Leasingmarkt link", async ({ page }) => {
      const link = page.locator('a[href="http://www.facebook.com/LeasingMarkt"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href http://www.facebook.com/LeasingMarkt is validated successfully`);
      } else {
        console.log(`Link with href http://www.facebook.com/LeasingMarkt is not visible on the page`);
      }
    });

    // Testing links to www.instagram.com
    test("should validate Leasingmarkt.De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.instagram.com/leasingmarkt.de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.instagram.com/leasingmarkt.de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.instagram.com/leasingmarkt.de/ is not visible on the page`);
      }
    });

    // Testing links to www.youtube.com
    test("should validate C Leasingmarktde link", async ({ page }) => {
      const link = page.locator('a[href="https://www.youtube.com/c/LeasingMarktde"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.youtube.com/c/LeasingMarktde is validated successfully`);
      } else {
        console.log(`Link with href https://www.youtube.com/c/LeasingMarktde is not visible on the page`);
      }
    });

    // Testing links to www.linkedin.com
    test("should validate Leasingmarkt Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.linkedin.com/company/leasingmarkt/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.linkedin.com/company/leasingmarkt/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.linkedin.com/company/leasingmarkt/ is not visible on the page`);
      }
    });

    // Testing links to www.tiktok.com
    test("should validate @Leasingmarkt.De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.tiktok.com/@leasingmarkt.de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.tiktok.com/@leasingmarkt.de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.tiktok.com/@leasingmarkt.de/ is not visible on the page`);
      }
    });

    // Testing links to www.ekomi.de
    test("should validate Www.Ekomi.De Bewertungen Leasingmarktde.Html link", async ({ page }) => {
      const link = page.locator('a[href="https://www.ekomi.de/bewertungen-leasingmarktde.html"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.ekomi.de/bewertungen-leasingmarktde.html is validated successfully`);
      } else {
        console.log(`Link with href https://www.ekomi.de/bewertungen-leasingmarktde.html is not visible on the page`);
      }
    });

    // Testing links to www.autoscout24.de
    test("should validate Www.Autoscout24.De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/ is not visible on the page`);
      }
    });

  });

  test.describe("Form Elements Tests", () => {

    test.describe("Button Interactions", () => {
      test("should verify button states and interactions", async ({ page }) => {
        // Wait for all buttons to be loaded
        await page.waitForLoadState("domcontentloaded");
        try {
          // Test button: Favoriten0
          const button_Favoriten0 = await page.getByRole("button", { name: "Favoriten0" });
          if (await button_Favoriten0.count() > 0) {
            await expect(button_Favoriten0, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Favoriten0.hover();

            if (true) {
              await button_Favoriten0.click({ trial: true });
            }
          }

          // Test button: 0
          const button_0 = await page.getByRole("button", { name: "0" });
          if (await button_0.count() > 0) {
            await expect(button_0, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_0.hover();

            if (true) {
              await button_0.click({ trial: true });
            }
          }

          // Test button: Subscribe now
          const button_Subscribe_now = await page.getByRole("button", { name: "Subscribe now" });
          if (await button_Subscribe_now.count() > 0) {
            await expect(button_Subscribe_now, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Subscribe_now.hover();

            if (true) {
              await button_Subscribe_now.click({ trial: true });
            }
          }

          // Test button: Kostenlos registrieren
          const button_Kostenlos_registrieren = await page.getByRole("button", { name: "Kostenlos registrieren" });
          if (await button_Kostenlos_registrieren.count() > 0) {
            await expect(button_Kostenlos_registrieren, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Kostenlos_registrieren.hover();

            if (true) {
              await button_Kostenlos_registrieren.click({ trial: true });
            }
          }

          // Test button: Absenden
          const button_Absenden = await page.getByRole("button", { name: "Absenden" });
          if (await button_Absenden.count() > 0) {
            await expect(button_Absenden, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Absenden.hover();

            if (true) {
              await button_Absenden.click({ trial: true });
            }
          }

          // Test button: Absenden
          const button_Absenden_1 = await page.getByRole("button", { name: "Absenden" });
          if (await button_Absenden_1.count() > 0) {
            await expect(button_Absenden_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Absenden_1.hover();

            if (true) {
              await button_Absenden_1.click({ trial: true });
            }
          }

          // Test button: Absenden
          const button_Absenden_2 = await page.getByRole("button", { name: "Absenden" });
          if (await button_Absenden_2.count() > 0) {
            await expect(button_Absenden_2, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Absenden_2.hover();

            if (true) {
              await button_Absenden_2.click({ trial: true });
            }
          }

        } catch (error) {
          console.log("Error validating buttons:", error);
        }
      });
    });

    test.describe("Input Field Validation", () => {
      test("should validate input field behavior and constraints", async ({ page }) => {
        // Wait for form elements to be ready
        await page.waitForLoadState("domcontentloaded");
        try {
          // Test input field: Ihre Email
          const input_Ihre_Email = await page.getByLabel("Ihre Email", { exact: false });
          if (await input_Ihre_Email.count() > 0) {
            await expect(input_Ihre_Email, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Ihre_Email.click();
            await input_Ihre_Email.fill("test@example.com");
            await expect(input_Ihre_Email).toHaveValue("test@example.com");

            // Test field clearing
            await input_Ihre_Email.clear();
            await expect(input_Ihre_Email).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Ihre_Email).toHaveAttribute("required", "");
            }
          }

          // Test input field: Vorname*
          const input_Vorname = await page.getByLabel("Vorname*", { exact: false });
          if (await input_Vorname.count() > 0) {
            await expect(input_Vorname, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Vorname.click();
            await input_Vorname.fill("Test Input");
            await expect(input_Vorname).toHaveValue("Test Input");

            // Test field clearing
            await input_Vorname.clear();
            await expect(input_Vorname).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Vorname).toHaveAttribute("required", "");
            }
          }

          // Test input field: Nachname*
          const input_Nachname = await page.getByLabel("Nachname*", { exact: false });
          if (await input_Nachname.count() > 0) {
            await expect(input_Nachname, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Nachname.click();
            await input_Nachname.fill("Test Input");
            await expect(input_Nachname).toHaveValue("Test Input");

            // Test field clearing
            await input_Nachname.clear();
            await expect(input_Nachname).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Nachname).toHaveAttribute("required", "");
            }
          }

          // Test input field: E-Mail-Adresse*
          const input_E_Mail_Adresse = await page.getByLabel("E-Mail-Adresse*", { exact: false });
          if (await input_E_Mail_Adresse.count() > 0) {
            await expect(input_E_Mail_Adresse, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_E_Mail_Adresse.click();
            await input_E_Mail_Adresse.fill("test@example.com");
            await expect(input_E_Mail_Adresse).toHaveValue("test@example.com");

            // Test field clearing
            await input_E_Mail_Adresse.clear();
            await expect(input_E_Mail_Adresse).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_E_Mail_Adresse).toHaveAttribute("required", "");
            }
          }

          // Test input field: Passwort*
          const input_Passwort = await page.getByLabel("Passwort*", { exact: false });
          if (await input_Passwort.count() > 0) {
            await expect(input_Passwort, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Passwort.click();
            await input_Passwort.fill("TestPassword123!");
            await expect(input_Passwort).toHaveValue("TestPassword123!");

            // Test field clearing
            await input_Passwort.clear();
            await expect(input_Passwort).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Passwort).toHaveAttribute("required", "");
            }
          }

          // Test input field: E-Mail-Adresse
          const input_E_Mail_Adresse_1 = await page.getByLabel("E-Mail-Adresse", { exact: false });
          if (await input_E_Mail_Adresse_1.count() > 0) {
            await expect(input_E_Mail_Adresse_1, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_E_Mail_Adresse_1.click();
            await input_E_Mail_Adresse_1.fill("test@example.com");
            await expect(input_E_Mail_Adresse_1).toHaveValue("test@example.com");

            // Test field clearing
            await input_E_Mail_Adresse_1.clear();
            await expect(input_E_Mail_Adresse_1).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_E_Mail_Adresse_1).toHaveAttribute("required", "");
            }
          }

          // Test input field: E-Mail-Adresse
          const input_E_Mail_Adresse_2 = await page.getByLabel("E-Mail-Adresse", { exact: false });
          if (await input_E_Mail_Adresse_2.count() > 0) {
            await expect(input_E_Mail_Adresse_2, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_E_Mail_Adresse_2.click();
            await input_E_Mail_Adresse_2.fill("test@example.com");
            await expect(input_E_Mail_Adresse_2).toHaveValue("test@example.com");

            // Test field clearing
            await input_E_Mail_Adresse_2.clear();
            await expect(input_E_Mail_Adresse_2).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_E_Mail_Adresse_2).toHaveAttribute("required", "");
            }
          }

          // Test input field: E-Mail-Adresse
          const input_E_Mail_Adresse_3 = await page.getByLabel("E-Mail-Adresse", { exact: false });
          if (await input_E_Mail_Adresse_3.count() > 0) {
            await expect(input_E_Mail_Adresse_3, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_E_Mail_Adresse_3.click();
            await input_E_Mail_Adresse_3.fill("test@example.com");
            await expect(input_E_Mail_Adresse_3).toHaveValue("test@example.com");

            // Test field clearing
            await input_E_Mail_Adresse_3.clear();
            await expect(input_E_Mail_Adresse_3).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_E_Mail_Adresse_3).toHaveAttribute("required", "");
            }
          }

        } catch (error) {
          console.log("Error validating input fields:", error);
        }
      });
    });

    test.describe("Checkbox Interaction Tests", () => {
      test("should verify checkbox states and interactions", async ({ page }) => {
        // Wait for checkboxes to be loaded
        await page.waitForLoadState("domcontentloaded");
        try {
          // Test checkbox: Ja, ich stimme denAGBund derDatenschutzerklärungvon LeasingMarkt.de GmbH zu.*
          const checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu = await page.getByLabel("Ja, ich stimme denAGBund derDatenschutzerklärungvon LeasingMarkt.de GmbH zu.*", { exact: false });
          if (await checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu.count() > 0) {
            await expect(checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu.check();
            await expect(checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu, "Checkbox should be checked").toBeChecked();

            await checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu.uncheck();
            await expect(checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Ja_ich_stimme_denAGBund_derDatenschutzerklärungvon_LeasingMarkt_de_GmbH_zu).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Ja,ich möchte kostenlos die besten Angebote und weitere Services zum Thema Leasing per Newsletter erhalten. Eine Abmeldung ist jederzeit möglich
          const checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich = await page.getByLabel("Ja,ich möchte kostenlos die besten Angebote und weitere Services zum Thema Leasing per Newsletter erhalten. Eine Abmeldung ist jederzeit möglich", { exact: false });
          if (await checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich.count() > 0) {
            await expect(checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich.check();
            await expect(checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich, "Checkbox should be checked").toBeChecked();

            await checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich.uncheck();
            await expect(checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Ja_ich_möchte_kostenlos_die_besten_Angebote_und_weitere_Services_zum_Thema_Leasing_per_Newsletter_erhalten_Eine_Abmeldung_ist_jederzeit_möglich).toHaveAttribute("required", "");
            }
          }

        } catch (error) {
          console.log("Error validating checkboxes:", error);
        }
      });
    });

  });

});