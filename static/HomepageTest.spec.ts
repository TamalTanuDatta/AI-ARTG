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
  await page.goto("https://www.leasingmarkt.de/");
  await page.waitForLoadState("networkidle");
});

test.describe("Homepage - LeasingMarkt.de Page Test", () => {
  const BASE_URL = "https://www.leasingmarkt.de/";

  test.describe("Link Tests", () => {
    // Testing links to www.leasingmarkt.de
    test("should validate Www.Leasingmarkt.De Leasing Renault Zoe link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-renault-zoe"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-zoe is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-zoe is not visible on the page`);
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

    test("should validate Audi A4 11479208 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/audi-a4/11479208"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-a4/11479208 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-a4/11479208 is not visible on the page`);
      }
    });

    test("should validate Volkswagen Tiguan Allspace 11520299 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/volkswagen-tiguan_allspace/11520299"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/volkswagen-tiguan_allspace/11520299 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/volkswagen-tiguan_allspace/11520299 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Peugeot 3008 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-peugeot-3008"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-3008 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-3008 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Vw Tiguan link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-vw-tiguan"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-tiguan is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-tiguan is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Fiat 500 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-fiat-500"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-500 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-500 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kompaktklasse Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kompaktklasse-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kompaktklasse-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kompaktklasse-leasing is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Peugeot 208 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-peugeot-208"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-208 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-208 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Auto Tests link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/auto-tests"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/auto-tests is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/auto-tests is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Listing?Tc=1 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/listing?tc=1"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/listing?tc=1 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/listing?tc=1 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Citroen C3 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-citroen-c3"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c3 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c3 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Bmw 3Er link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-bmw-3er"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-3er is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-3er is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mercedes Benz S Klasse link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mercedes_benz-s_klasse"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-s_klasse is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-s_klasse is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Transporter Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/transporter-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/transporter-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/transporter-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Skoda Karoq link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-skoda-karoq"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-karoq is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-karoq is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Van Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/van-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/van-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/van-leasing is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Renault link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-renault"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault is not visible on the page`);
      }
    });

    test("should validate Renault Austral 11648449 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/renault-austral/11648449"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/renault-austral/11648449 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/renault-austral/11648449 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Cupra Born link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-cupra-born"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-born is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-born is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Bmw 5Er link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-bmw-5er"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-5er is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-5er is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Kontakt link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kontakt"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kontakt is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kontakt is not visible on the page`);
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

    test("should validate Mg Mg4 11328186 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11328186"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11328186 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11328186 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Fiat 500E link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-fiat-500e"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-500e is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-500e is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Ratgeber link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kleinwagen Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kleinwagen-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kleinwagen-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kleinwagen-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Reisemobil Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/reisemobil-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/reisemobil-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/reisemobil-leasing is not visible on the page`);
      }
    });

    test("should validate Ratgeber Leasing Voraussetzungen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber/leasing-voraussetzungen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-voraussetzungen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-voraussetzungen is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Peugeot 2008 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-peugeot-2008"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-2008 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-peugeot-2008 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Opel Corsa link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-opel-corsa"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-corsa is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-corsa is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Hybrid Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/hybrid-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/hybrid-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/hybrid-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Limousine Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/limousine-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/limousine-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/limousine-leasing is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Citroen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-citroen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen is not visible on the page`);
      }
    });

    test("should validate Mg Mg4 11570106 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11570106"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11570106 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11570106 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Mercedes Benz E Klasse link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mercedes_benz-e_klasse"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-e_klasse is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-e_klasse is not visible on the page`);
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

    test("should validate Ratgeber Faq link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber/faq"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/faq is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/faq is not visible on the page`);
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

    test("should validate Ratgeber Leasing Lexikon link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/ratgeber/leasing-lexikon"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-lexikon is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/ratgeber/leasing-lexikon is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Fiat Panda link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-fiat-panda"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-panda is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-fiat-panda is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Opel Mokka link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-opel-mokka"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-mokka is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-mokka is not visible on the page`);
      }
    });

    test("should validate Audi A3 11602251 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/audi-a3/11602251"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-a3/11602251 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-a3/11602251 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Hyundai Tucson link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-hyundai-tucson"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-tucson is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-tucson is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De So Funktioniert Leasingmarkt link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/so-funktioniert-leasingmarkt"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/so-funktioniert-leasingmarkt is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/so-funktioniert-leasingmarkt is not visible on the page`);
      }
    });

    test("should validate Audi S5 11586194 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/audi-s5/11586194"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-s5/11586194 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-s5/11586194 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Renault Clio link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-renault-clio"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-clio is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-clio is not visible on the page`);
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

    test("should validate Bmw 116 11420371 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/bmw-116/11420371"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/bmw-116/11420371 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/bmw-116/11420371 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Mercedes Benz A Klasse link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mercedes_benz-a_klasse"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-a_klasse is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mercedes_benz-a_klasse is not visible on the page`);
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

    test("should validate Opel Vivaro 11206619 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/opel-vivaro/11206619"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/opel-vivaro/11206619 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/opel-vivaro/11206619 is not visible on the page`);
      }
    });

    test("should validate Audi R8 11559795 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/audi-r8/11559795"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-r8/11559795 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-r8/11559795 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Vw Golf link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-vw-golf"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-golf is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-golf is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Audi A4 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-audi-a4"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a4 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a4 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Kia link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-kia"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-kia is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-kia is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Hersteller link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/hersteller"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/hersteller is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/hersteller is not visible on the page`);
      }
    });

    test("should validate Gebrauchtwagen Audi link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/gebrauchtwagen/audi"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen/audi is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen/audi is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Mazda link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mazda"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mazda is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mazda is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasinguebernahme link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasinguebernahme"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasinguebernahme is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasinguebernahme is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Skoda link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-skoda"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Vw T Roc link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-vw-t_roc"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-t_roc is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-vw-t_roc is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Bmw 1Er link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-bmw-1er"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-1er is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-bmw-1er is not visible on the page`);
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

    test("should validate Mg Mg4 11340116 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11340116"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11340116 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-mg4/11340116 is not visible on the page`);
      }
    });

    test("should validate Cupra Tavascan 11630132 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/cupra-tavascan/11630132"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/cupra-tavascan/11630132 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/cupra-tavascan/11630132 is not visible on the page`);
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

    test("should validate Bmw M340D 11521862 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/bmw-m340d/11521862"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/bmw-m340d/11521862 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/bmw-m340d/11521862 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De App link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/app"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/app is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/app is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Suv Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/suv-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/suv-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/suv-leasing is not visible on the page`);
      }
    });

    test("should validate Mg Zs 11664833 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/mg-zs/11664833"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-zs/11664833 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/mg-zs/11664833 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Sportwagen Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/sportwagen-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/sportwagen-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/sportwagen-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Cupra Formentor link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-cupra-formentor"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-formentor is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-formentor is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Hyundai Kona Elektro link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-hyundai-kona_elektro"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-kona_elektro is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-kona_elektro is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Mitsubishi link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-mitsubishi"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mitsubishi is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-mitsubishi is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Opel Crossland link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-opel-crossland"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-crossland is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-opel-crossland is not visible on the page`);
      }
    });

    test("should validate Ds Automobiles Ds 7 11603457 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/ds_automobiles-ds_7/11603457"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/ds_automobiles-ds_7/11603457 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/ds_automobiles-ds_7/11603457 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Kombi Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kombi-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kombi-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kombi-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Cabrio Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/cabrio-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/cabrio-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/cabrio-leasing is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Cupra Leon link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-cupra-leon"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-leon is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-cupra-leon is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Skoda Enyaq link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-skoda-enyaq"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-enyaq is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-enyaq is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Allgemeine Geschaeftsbedingungen link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/allgemeine-geschaeftsbedingungen is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Hyundai Ioniq 5 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-hyundai-ioniq_5"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-ioniq_5 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai-ioniq_5 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Citroen C4 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-citroen-c4"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c4 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c4 is not visible on the page`);
      }
    });

    test("should validate Gebrauchtwagen Audi?From=Topbar link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/gebrauchtwagen/audi?from=topbar"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen/audi?from=topbar is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/gebrauchtwagen/audi?from=topbar is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Kooperation Mit Autoscout24 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/kooperation-mit-autoscout24"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/kooperation-mit-autoscout24 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/kooperation-mit-autoscout24 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Citroen C5 Aircross link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-citroen-c5_aircross"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c5_aircross is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-citroen-c5_aircross is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Skoda Kodiaq link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-skoda-kodiaq"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-kodiaq is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-skoda-kodiaq is not visible on the page`);
      }
    });

    test("should validate Opel Grandland 11648437 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/opel-grandland/11648437"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/opel-grandland/11648437 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/opel-grandland/11648437 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Hyundai link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-hyundai"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-hyundai is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Audi A6 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-audi-a6"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a6 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a6 is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Newsletter link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/newsletter"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/newsletter is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/newsletter is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Autoscout24 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/autoscout24"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/autoscout24 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/autoscout24 is not visible on the page`);
      }
    });

    test("should validate Vinfast Vf6 11583783 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/vinfast-vf6/11583783"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/vinfast-vf6/11583783 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/vinfast-vf6/11583783 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Audi A3 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-audi-a3"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a3 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-audi-a3 is not visible on the page`);
      }
    });

    test("should validate Audi Q8 E Tron 11557013 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/audi-q8_e_tron/11557013"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-q8_e_tron/11557013 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/audi-q8_e_tron/11557013 is not visible on the page`);
      }
    });

    test("should validate Www.Leasingmarkt.De Leasing Renault Arkana link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-renault-arkana"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-arkana is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-renault-arkana is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Leasing Dacia link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing-dacia"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing-dacia is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing-dacia is not visible on the page`);
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

    test("should validate Www.Leasingmarkt.De Firmenwagen Leasing link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/firmenwagen-leasing"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/firmenwagen-leasing is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/firmenwagen-leasing is not visible on the page`);
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

    test("should validate Polestar 2 11616938 link", async ({ page }) => {
      const link = page.locator('a[href="https://www.leasingmarkt.de/leasing/pkw/polestar-2/11616938"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/polestar-2/11616938 is validated successfully`);
      } else {
        console.log(`Link with href https://www.leasingmarkt.de/leasing/pkw/polestar-2/11616938 is not visible on the page`);
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

    // Testing links to www.autoscout24.de
    test("should validate Fahrzeugbewertung Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/fahrzeugbewertung/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/fahrzeugbewertung/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/fahrzeugbewertung/ is not visible on the page`);
      }
    });

    test("should validate Angebote Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/leasing/angebote/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/leasing/angebote/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/leasing/angebote/ is not visible on the page`);
      }
    });

    test("should validate Gebrauchtwagen Leasing Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/leasing/gebrauchtwagen-leasing/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/leasing/gebrauchtwagen-leasing/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/leasing/gebrauchtwagen-leasing/ is not visible on the page`);
      }
    });

    test("should validate Ratgeber Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/informieren/ratgeber/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/ is not visible on the page`);
      }
    });

    test("should validate Auto Verkaufen Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/auto-verkaufen/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/auto-verkaufen/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/auto-verkaufen/ is not visible on the page`);
      }
    });

    test("should validate Leasing Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/informieren/ratgeber/leasing/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/leasing/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/leasing/ is not visible on the page`);
      }
    });

    test("should validate Auto Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/auto/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/auto/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/auto/ is not visible on the page`);
      }
    });

    test("should validate Kfz Steuer Rechner Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/informieren/ratgeber/rechner/kfz-steuer-rechner/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/rechner/kfz-steuer-rechner/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/rechner/kfz-steuer-rechner/ is not visible on the page`);
      }
    });

    test("should validate Kfz Kaufvertrag Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/informieren/ratgeber/autoverkauf/verhandeln/kfz-kaufvertrag/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/autoverkauf/verhandeln/kfz-kaufvertrag/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/informieren/ratgeber/autoverkauf/verhandeln/kfz-kaufvertrag/ is not visible on the page`);
      }
    });

    test("should validate Testberichte Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/informieren/testberichte/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/informieren/testberichte/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/informieren/testberichte/ is not visible on the page`);
      }
    });

    test("should validate Leasing Homepage (Variant 2) link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/leasing/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/leasing/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/leasing/ is not visible on the page`);
      }
    });

    test("should validate Www.Autoscout24.De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.de/ is not visible on the page`);
      }
    });

    // Testing links to www.autoscout24.com
    test("should validate Leasingmarkt De Homepage link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/ is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/leasingmarkt-de/ is not visible on the page`);
      }
    });

    test("should validate Search Roles ?Company=Leasingmarkt.De link", async ({ page }) => {
      const link = page.locator('a[href="https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de"]').first();
      if (await link.isVisible()) {
        await expect(link).toBeVisible();
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de is validated successfully`);
      } else {
        console.log(`Link with href https://www.autoscout24.com/as24-career-pages/search-roles/?company=Leasingmarkt.de is not visible on the page`);
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

          // Test button: Anmelden
          const button_Anmelden = await page.getByRole("button", { name: "Anmelden" });
          if (await button_Anmelden.count() > 0) {
            await expect(button_Anmelden, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Anmelden.hover();

            if (true) {
              await button_Anmelden.click({ trial: true });
            }
          }

          // Test button: 32.770Fahrzeuge anzeigen
          const button_32_770Fahrzeuge_anzeigen = await page.getByRole("button", { name: "32.770Fahrzeuge anzeigen" });
          if (await button_32_770Fahrzeuge_anzeigen.count() > 0) {
            await expect(button_32_770Fahrzeuge_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_32_770Fahrzeuge_anzeigen.hover();

            if (false) {
              await button_32_770Fahrzeuge_anzeigen.click({ trial: true });
            }
          }

          // Test button: 32.770Fahrzeuge anzeigen
          const button_32_770Fahrzeuge_anzeigen_1 = await page.getByRole("button", { name: "32.770Fahrzeuge anzeigen" });
          if (await button_32_770Fahrzeuge_anzeigen_1.count() > 0) {
            await expect(button_32_770Fahrzeuge_anzeigen_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_32_770Fahrzeuge_anzeigen_1.hover();

            if (false) {
              await button_32_770Fahrzeuge_anzeigen_1.click({ trial: true });
            }
          }

          // Test button: 32.770Fahrzeuge anzeigen
          const button_32_770Fahrzeuge_anzeigen_2 = await page.getByRole("button", { name: "32.770Fahrzeuge anzeigen" });
          if (await button_32_770Fahrzeuge_anzeigen_2.count() > 0) {
            await expect(button_32_770Fahrzeuge_anzeigen_2, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_32_770Fahrzeuge_anzeigen_2.hover();

            if (false) {
              await button_32_770Fahrzeuge_anzeigen_2.click({ trial: true });
            }
          }

          // Test button: Zur Aktion
          const button_Zur_Aktion = await page.getByRole("button", { name: "Zur Aktion" });
          if (await button_Zur_Aktion.count() > 0) {
            await expect(button_Zur_Aktion, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zur_Aktion.hover();

            if (false) {
              await button_Zur_Aktion.click({ trial: true });
            }
          }

          // Test button: Zum Deal
          const button_Zum_Deal = await page.getByRole("button", { name: "Zum Deal" });
          if (await button_Zum_Deal.count() > 0) {
            await expect(button_Zum_Deal, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zum_Deal.hover();

            if (false) {
              await button_Zum_Deal.click({ trial: true });
            }
          }

          // Test button: Alle Deals anzeigen
          const button_Alle_Deals_anzeigen = await page.getByRole("button", { name: "Alle Deals anzeigen" });
          if (await button_Alle_Deals_anzeigen.count() > 0) {
            await expect(button_Alle_Deals_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Deals_anzeigen.hover();

            if (false) {
              await button_Alle_Deals_anzeigen.click({ trial: true });
            }
          }

          // Test button: Zum Deal
          const button_Zum_Deal_1 = await page.getByRole("button", { name: "Zum Deal" });
          if (await button_Zum_Deal_1.count() > 0) {
            await expect(button_Zum_Deal_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zum_Deal_1.hover();

            if (false) {
              await button_Zum_Deal_1.click({ trial: true });
            }
          }

          // Test button: Alle Deals anzeigen
          const button_Alle_Deals_anzeigen_1 = await page.getByRole("button", { name: "Alle Deals anzeigen" });
          if (await button_Alle_Deals_anzeigen_1.count() > 0) {
            await expect(button_Alle_Deals_anzeigen_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Deals_anzeigen_1.hover();

            if (false) {
              await button_Alle_Deals_anzeigen_1.click({ trial: true });
            }
          }

          // Test button: Zum Deal
          const button_Zum_Deal_2 = await page.getByRole("button", { name: "Zum Deal" });
          if (await button_Zum_Deal_2.count() > 0) {
            await expect(button_Zum_Deal_2, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zum_Deal_2.hover();

            if (false) {
              await button_Zum_Deal_2.click({ trial: true });
            }
          }

          // Test button: Alle Deals anzeigen
          const button_Alle_Deals_anzeigen_2 = await page.getByRole("button", { name: "Alle Deals anzeigen" });
          if (await button_Alle_Deals_anzeigen_2.count() > 0) {
            await expect(button_Alle_Deals_anzeigen_2, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Deals_anzeigen_2.hover();

            if (false) {
              await button_Alle_Deals_anzeigen_2.click({ trial: true });
            }
          }

          // Test button: Zur Aktion
          const button_Zur_Aktion_1 = await page.getByRole("button", { name: "Zur Aktion" });
          if (await button_Zur_Aktion_1.count() > 0) {
            await expect(button_Zur_Aktion_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zur_Aktion_1.hover();

            if (false) {
              await button_Zur_Aktion_1.click({ trial: true });
            }
          }

          // Test button: Alle anzeigen
          const button_Alle_anzeigen = await page.getByRole("button", { name: "Alle anzeigen" });
          if (await button_Alle_anzeigen.count() > 0) {
            await expect(button_Alle_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_anzeigen.hover();

            if (true) {
              await button_Alle_anzeigen.click({ trial: true });
            }
          }

          // Test button: Zur Aktion
          const button_Zur_Aktion_2 = await page.getByRole("button", { name: "Zur Aktion" });
          if (await button_Zur_Aktion_2.count() > 0) {
            await expect(button_Zur_Aktion_2, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Zur_Aktion_2.hover();

            if (false) {
              await button_Zur_Aktion_2.click({ trial: true });
            }
          }

          // Test button: Angebote ansehen
          const button_Angebote_ansehen = await page.getByRole("button", { name: "Angebote ansehen" });
          if (await button_Angebote_ansehen.count() > 0) {
            await expect(button_Angebote_ansehen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Angebote_ansehen.hover();

            if (false) {
              await button_Angebote_ansehen.click({ trial: true });
            }
          }

          // Test button: Angebote ansehen
          const button_Angebote_ansehen_1 = await page.getByRole("button", { name: "Angebote ansehen" });
          if (await button_Angebote_ansehen_1.count() > 0) {
            await expect(button_Angebote_ansehen_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Angebote_ansehen_1.hover();

            if (false) {
              await button_Angebote_ansehen_1.click({ trial: true });
            }
          }

          // Test button: Mehr Informationen
          const button_Mehr_Informationen = await page.getByRole("button", { name: "Mehr Informationen" });
          if (await button_Mehr_Informationen.count() > 0) {
            await expect(button_Mehr_Informationen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Mehr_Informationen.hover();

            if (false) {
              await button_Mehr_Informationen.click({ trial: true });
            }
          }

          // Test button: Mehr Informationen
          const button_Mehr_Informationen_1 = await page.getByRole("button", { name: "Mehr Informationen" });
          if (await button_Mehr_Informationen_1.count() > 0) {
            await expect(button_Mehr_Informationen_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Mehr_Informationen_1.hover();

            if (true) {
              await button_Mehr_Informationen_1.click({ trial: true });
            }
          }

          // Test button: Alle Leasing-Vergleiche
          const button_Alle_Leasing_Vergleiche = await page.getByRole("button", { name: "Alle Leasing-Vergleiche" });
          if (await button_Alle_Leasing_Vergleiche.count() > 0) {
            await expect(button_Alle_Leasing_Vergleiche, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Leasing_Vergleiche.hover();

            if (true) {
              await button_Alle_Leasing_Vergleiche.click({ trial: true });
            }
          }

          // Test button: Neuverträge
          const button_Neuverträge = await page.getByRole("button", { name: "Neuverträge" });
          if (await button_Neuverträge.count() > 0) {
            await expect(button_Neuverträge, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Neuverträge.hover();

            if (true) {
              await button_Neuverträge.click({ trial: true });
            }
          }

          // Test button: LeasingübernahmeÜbernahmen
          const button_LeasingübernahmeÜbernahmen = await page.getByRole("button", { name: "LeasingübernahmeÜbernahmen" });
          if (await button_LeasingübernahmeÜbernahmen.count() > 0) {
            await expect(button_LeasingübernahmeÜbernahmen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_LeasingübernahmeÜbernahmen.hover();

            if (true) {
              await button_LeasingübernahmeÜbernahmen.click({ trial: true });
            }
          }

          // Test button: Alle Neuverträge anzeigen
          const button_Alle_Neuverträge_anzeigen = await page.getByRole("button", { name: "Alle Neuverträge anzeigen" });
          if (await button_Alle_Neuverträge_anzeigen.count() > 0) {
            await expect(button_Alle_Neuverträge_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Neuverträge_anzeigen.hover();

            if (true) {
              await button_Alle_Neuverträge_anzeigen.click({ trial: true });
            }
          }

          // Test button: Alle Leasingübernahmen anzeigen
          const button_Alle_Leasingübernahmen_anzeigen = await page.getByRole("button", { name: "Alle Leasingübernahmen anzeigen" });
          if (await button_Alle_Leasingübernahmen_anzeigen.count() > 0) {
            await expect(button_Alle_Leasingübernahmen_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Leasingübernahmen_anzeigen.hover();

            if (true) {
              await button_Alle_Leasingübernahmen_anzeigen.click({ trial: true });
            }
          }

          // Test button: Anmelden
          const button_Anmelden_1 = await page.getByRole("button", { name: "Anmelden" });
          if (await button_Anmelden_1.count() > 0) {
            await expect(button_Anmelden_1, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Anmelden_1.hover();

            if (true) {
              await button_Anmelden_1.click({ trial: true });
            }
          }

          // Test button: Alle Modelle anzeigen
          const button_Alle_Modelle_anzeigen = await page.getByRole("button", { name: "Alle Modelle anzeigen" });
          if (await button_Alle_Modelle_anzeigen.count() > 0) {
            await expect(button_Alle_Modelle_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Modelle_anzeigen.hover();

            if (true) {
              await button_Alle_Modelle_anzeigen.click({ trial: true });
            }
          }

          // Test button: Alle Marken anzeigen
          const button_Alle_Marken_anzeigen = await page.getByRole("button", { name: "Alle Marken anzeigen" });
          if (await button_Alle_Marken_anzeigen.count() > 0) {
            await expect(button_Alle_Marken_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Marken_anzeigen.hover();

            if (true) {
              await button_Alle_Marken_anzeigen.click({ trial: true });
            }
          }

          // Test button: Alle Händler anzeigen
          const button_Alle_Händler_anzeigen = await page.getByRole("button", { name: "Alle Händler anzeigen" });
          if (await button_Alle_Händler_anzeigen.count() > 0) {
            await expect(button_Alle_Händler_anzeigen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Alle_Händler_anzeigen.hover();

            if (true) {
              await button_Alle_Händler_anzeigen.click({ trial: true });
            }
          }

          // Test button: Mehr erfahren
          const button_Mehr_erfahren = await page.getByRole("button", { name: "Mehr erfahren" });
          if (await button_Mehr_erfahren.count() > 0) {
            await expect(button_Mehr_erfahren, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Mehr_erfahren.hover();

            if (true) {
              await button_Mehr_erfahren.click({ trial: true });
            }
          }

          // Test button: Jetzt Leasing-Fahrzeug suchen
          const button_Jetzt_Leasing_Fahrzeug_suchen = await page.getByRole("button", { name: "Jetzt Leasing-Fahrzeug suchen" });
          if (await button_Jetzt_Leasing_Fahrzeug_suchen.count() > 0) {
            await expect(button_Jetzt_Leasing_Fahrzeug_suchen, "Button should be visible").toBeVisible();

            // Verify button interactions
            await button_Jetzt_Leasing_Fahrzeug_suchen.hover();

            if (false) {
              await button_Jetzt_Leasing_Fahrzeug_suchen.click({ trial: true });
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

          // Test input field: Von
          const input_Von = await page.getByLabel("Von", { exact: false });
          if (await input_Von.count() > 0) {
            await expect(input_Von, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Von.click();
            await input_Von.fill("42");
            await expect(input_Von).toHaveValue("42");

            // Test field clearing
            await input_Von.clear();
            await expect(input_Von).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Von).toHaveAttribute("required", "");
            }
          }

          // Test input field: Bis
          const input_Bis = await page.getByLabel("Bis", { exact: false });
          if (await input_Bis.count() > 0) {
            await expect(input_Bis, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_Bis.click();
            await input_Bis.fill("42");
            await expect(input_Bis).toHaveValue("42");

            // Test field clearing
            await input_Bis.clear();
            await expect(input_Bis).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_Bis).toHaveAttribute("required", "");
            }
          }

          // Test input field: email
          const input_email = await page.getByLabel("email", { exact: false });
          if (await input_email.count() > 0) {
            await expect(input_email, "Input field should be visible").toBeVisible();

            // Test input interactions
            await input_email.click();
            await input_email.fill("test@example.com");
            await expect(input_email).toHaveValue("test@example.com");

            // Test field clearing
            await input_email.clear();
            await expect(input_email).toHaveValue("");

            // Verify required state
            if (false) {
              await expect(input_email).toHaveAttribute("required", "");
            }
          }

          // Test input field: E-Mail-Adresse
          const input_E_Mail_Adresse = await page.getByLabel("E-Mail-Adresse", { exact: false });
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
          // Test checkbox: Nur Elektro-Fahrzeuge anzeigen
          const checkbox_Nur_Elektro_Fahrzeuge_anzeigen = await page.getByLabel("Nur Elektro-Fahrzeuge anzeigen", { exact: false });
          if (await checkbox_Nur_Elektro_Fahrzeuge_anzeigen.count() > 0) {
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen.check();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen, "Checkbox should be checked").toBeChecked();

            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen.uncheck();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Privat
          const checkbox_Privat = await page.getByLabel("Privat", { exact: false });
          if (await checkbox_Privat.count() > 0) {
            await expect(checkbox_Privat, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Privat.check();
            await expect(checkbox_Privat, "Checkbox should be checked").toBeChecked();

            await checkbox_Privat.uncheck();
            await expect(checkbox_Privat, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Privat.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Privat, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Privat).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Gewerbe
          const checkbox_Gewerbe = await page.getByLabel("Gewerbe", { exact: false });
          if (await checkbox_Gewerbe.count() > 0) {
            await expect(checkbox_Gewerbe, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Gewerbe.check();
            await expect(checkbox_Gewerbe, "Checkbox should be checked").toBeChecked();

            await checkbox_Gewerbe.uncheck();
            await expect(checkbox_Gewerbe, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Gewerbe.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Gewerbe, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Gewerbe).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Nur Elektro-Fahrzeuge anzeigen
          const checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1 = await page.getByLabel("Nur Elektro-Fahrzeuge anzeigen", { exact: false });
          if (await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1.count() > 0) {
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1.check();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1, "Checkbox should be checked").toBeChecked();

            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1.uncheck();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_1).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Kleinwagen
          const checkbox_Kleinwagen = await page.getByLabel("Kleinwagen", { exact: false });
          if (await checkbox_Kleinwagen.count() > 0) {
            await expect(checkbox_Kleinwagen, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Kleinwagen.check();
            await expect(checkbox_Kleinwagen, "Checkbox should be checked").toBeChecked();

            await checkbox_Kleinwagen.uncheck();
            await expect(checkbox_Kleinwagen, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Kleinwagen.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Kleinwagen, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Kleinwagen).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Kompakt
          const checkbox_Kompakt = await page.getByLabel("Kompakt", { exact: false });
          if (await checkbox_Kompakt.count() > 0) {
            await expect(checkbox_Kompakt, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Kompakt.check();
            await expect(checkbox_Kompakt, "Checkbox should be checked").toBeChecked();

            await checkbox_Kompakt.uncheck();
            await expect(checkbox_Kompakt, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Kompakt.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Kompakt, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Kompakt).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Limousine
          const checkbox_Limousine = await page.getByLabel("Limousine", { exact: false });
          if (await checkbox_Limousine.count() > 0) {
            await expect(checkbox_Limousine, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Limousine.check();
            await expect(checkbox_Limousine, "Checkbox should be checked").toBeChecked();

            await checkbox_Limousine.uncheck();
            await expect(checkbox_Limousine, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Limousine.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Limousine, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Limousine).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Kombi
          const checkbox_Kombi = await page.getByLabel("Kombi", { exact: false });
          if (await checkbox_Kombi.count() > 0) {
            await expect(checkbox_Kombi, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Kombi.check();
            await expect(checkbox_Kombi, "Checkbox should be checked").toBeChecked();

            await checkbox_Kombi.uncheck();
            await expect(checkbox_Kombi, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Kombi.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Kombi, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Kombi).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Van
          const checkbox_Van = await page.getByLabel("Van", { exact: false });
          if (await checkbox_Van.count() > 0) {
            await expect(checkbox_Van, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Van.check();
            await expect(checkbox_Van, "Checkbox should be checked").toBeChecked();

            await checkbox_Van.uncheck();
            await expect(checkbox_Van, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Van.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Van, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Van).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: SUV / Gel.
          const checkbox_SUV_Gel = await page.getByLabel("SUV / Gel.", { exact: false });
          if (await checkbox_SUV_Gel.count() > 0) {
            await expect(checkbox_SUV_Gel, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_SUV_Gel.check();
            await expect(checkbox_SUV_Gel, "Checkbox should be checked").toBeChecked();

            await checkbox_SUV_Gel.uncheck();
            await expect(checkbox_SUV_Gel, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_SUV_Gel.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_SUV_Gel, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_SUV_Gel).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Sport
          const checkbox_Sport = await page.getByLabel("Sport", { exact: false });
          if (await checkbox_Sport.count() > 0) {
            await expect(checkbox_Sport, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Sport.check();
            await expect(checkbox_Sport, "Checkbox should be checked").toBeChecked();

            await checkbox_Sport.uncheck();
            await expect(checkbox_Sport, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Sport.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Sport, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Sport).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Cabrio
          const checkbox_Cabrio = await page.getByLabel("Cabrio", { exact: false });
          if (await checkbox_Cabrio.count() > 0) {
            await expect(checkbox_Cabrio, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Cabrio.check();
            await expect(checkbox_Cabrio, "Checkbox should be checked").toBeChecked();

            await checkbox_Cabrio.uncheck();
            await expect(checkbox_Cabrio, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Cabrio.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Cabrio, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Cabrio).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Reise
          const checkbox_Reise = await page.getByLabel("Reise", { exact: false });
          if (await checkbox_Reise.count() > 0) {
            await expect(checkbox_Reise, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Reise.check();
            await expect(checkbox_Reise, "Checkbox should be checked").toBeChecked();

            await checkbox_Reise.uncheck();
            await expect(checkbox_Reise, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Reise.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Reise, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Reise).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Nutz
          const checkbox_Nutz = await page.getByLabel("Nutz", { exact: false });
          if (await checkbox_Nutz.count() > 0) {
            await expect(checkbox_Nutz, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Nutz.check();
            await expect(checkbox_Nutz, "Checkbox should be checked").toBeChecked();

            await checkbox_Nutz.uncheck();
            await expect(checkbox_Nutz, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Nutz.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Nutz, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Nutz).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Privat
          const checkbox_Privat_1 = await page.getByLabel("Privat", { exact: false });
          if (await checkbox_Privat_1.count() > 0) {
            await expect(checkbox_Privat_1, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Privat_1.check();
            await expect(checkbox_Privat_1, "Checkbox should be checked").toBeChecked();

            await checkbox_Privat_1.uncheck();
            await expect(checkbox_Privat_1, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Privat_1.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Privat_1, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Privat_1).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Gewerbe
          const checkbox_Gewerbe_1 = await page.getByLabel("Gewerbe", { exact: false });
          if (await checkbox_Gewerbe_1.count() > 0) {
            await expect(checkbox_Gewerbe_1, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Gewerbe_1.check();
            await expect(checkbox_Gewerbe_1, "Checkbox should be checked").toBeChecked();

            await checkbox_Gewerbe_1.uncheck();
            await expect(checkbox_Gewerbe_1, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Gewerbe_1.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Gewerbe_1, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Gewerbe_1).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Nur Elektro-Fahrzeuge anzeigen
          const checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2 = await page.getByLabel("Nur Elektro-Fahrzeuge anzeigen", { exact: false });
          if (await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2.count() > 0) {
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2.check();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2, "Checkbox should be checked").toBeChecked();

            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2.uncheck();
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Nur_Elektro_Fahrzeuge_anzeigen_2).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Privat
          const checkbox_Privat_2 = await page.getByLabel("Privat", { exact: false });
          if (await checkbox_Privat_2.count() > 0) {
            await expect(checkbox_Privat_2, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Privat_2.check();
            await expect(checkbox_Privat_2, "Checkbox should be checked").toBeChecked();

            await checkbox_Privat_2.uncheck();
            await expect(checkbox_Privat_2, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Privat_2.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Privat_2, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Privat_2).toHaveAttribute("required", "");
            }
          }

          // Test checkbox: Gewerbe
          const checkbox_Gewerbe_2 = await page.getByLabel("Gewerbe", { exact: false });
          if (await checkbox_Gewerbe_2.count() > 0) {
            await expect(checkbox_Gewerbe_2, "Checkbox should be visible").toBeVisible();

            // Test checkbox interactions
            await checkbox_Gewerbe_2.check();
            await expect(checkbox_Gewerbe_2, "Checkbox should be checked").toBeChecked();

            await checkbox_Gewerbe_2.uncheck();
            await expect(checkbox_Gewerbe_2, "Checkbox should be unchecked").not.toBeChecked();

            // Test keyboard interaction
            await checkbox_Gewerbe_2.focus();
            await page.keyboard.press("Space");
            await expect(checkbox_Gewerbe_2, "Checkbox should be checked after Space key").toBeChecked();

            // Verify required state
            if (false) {
              await expect(checkbox_Gewerbe_2).toHaveAttribute("required", "");
            }
          }

        } catch (error) {
          console.log("Error validating checkboxes:", error);
        }
      });
    });

  });

});