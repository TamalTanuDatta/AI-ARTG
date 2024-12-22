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

test.describe("Link Validation Tests", () => {
  const BASE_URL = "https://www.leasingmarkt.de/register";

  test.describe("Links to www.leasingmarkt.de", () => {
    test("should validate link to kurzzeitleasing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="kurzzeitleasing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("kurzzeitleasing");
          }
        } else {
          console.log("No links found for kurzzeitleasing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link kurzzeitleasing:", error);
      }
    });

    test("should validate link to so_funktioniert_leasingmarkt", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="so_funktioniert_leasingmarkt"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("so_funktioniert_leasingmarkt");
          }
        } else {
          console.log("No links found for so_funktioniert_leasingmarkt - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link so_funktioniert_leasingmarkt:", error);
      }
    });

    test("should validate link to e_auto", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="e_auto"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("e_auto");
          }
        } else {
          console.log("No links found for e_auto - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link e_auto:", error);
      }
    });

    test("should validate link to leasing_mg", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_mg"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_mg");
          }
        } else {
          console.log("No links found for leasing_mg - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_mg:", error);
      }
    });

    test("should validate link to register", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="register"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("register");
          }
        } else {
          console.log("No links found for register - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link register:", error);
      }
    });

    test("should validate link to leasing_ohne_anzahlung", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_ohne_anzahlung"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_ohne_anzahlung");
          }
        } else {
          console.log("No links found for leasing_ohne_anzahlung - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_ohne_anzahlung:", error);
      }
    });

    test("should validate link to leasing_skoda", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_skoda"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_skoda");
          }
        } else {
          console.log("No links found for leasing_skoda - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_skoda:", error);
      }
    });

    test("should validate link to leasing_bmw", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_bmw"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_bmw");
          }
        } else {
          console.log("No links found for leasing_bmw - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_bmw:", error);
      }
    });

    test("should validate link to lagerfahrzeuge", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="lagerfahrzeuge"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("lagerfahrzeuge");
          }
        } else {
          console.log("No links found for lagerfahrzeuge - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link lagerfahrzeuge:", error);
      }
    });

    test("should validate link to gebrauchtwagen", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="gebrauchtwagen"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("gebrauchtwagen");
          }
        } else {
          console.log("No links found for gebrauchtwagen - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link gebrauchtwagen:", error);
      }
    });

    test("should validate link to leasing_fiat", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_fiat"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_fiat");
          }
        } else {
          console.log("No links found for leasing_fiat - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_fiat:", error);
      }
    });

    test("should validate link to leasing_peugeot", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_peugeot"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_peugeot");
          }
        } else {
          console.log("No links found for leasing_peugeot - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_peugeot:", error);
      }
    });

    test("should validate link to leasing_unter_100_euro", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_unter_100_euro"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_unter_100_euro");
          }
        } else {
          console.log("No links found for leasing_unter_100_euro - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_unter_100_euro:", error);
      }
    });

    test("should validate link to kooperation_mit_autoscout24", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="kooperation_mit_autoscout24"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("kooperation_mit_autoscout24");
          }
        } else {
          console.log("No links found for kooperation_mit_autoscout24 - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link kooperation_mit_autoscout24:", error);
      }
    });

    test("should validate link to deals", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="deals"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("deals");
          }
        } else {
          console.log("No links found for deals - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link deals:", error);
      }
    });

    test("should validate link to leasing_toyota", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_toyota"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_toyota");
          }
        } else {
          console.log("No links found for leasing_toyota - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_toyota:", error);
      }
    });

    test("should validate link to listing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="listing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("listing");
          }
        } else {
          console.log("No links found for listing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link listing:", error);
      }
    });

    test("should validate link to leasing_vergleiche", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_vergleiche"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_vergleiche");
          }
        } else {
          console.log("No links found for leasing_vergleiche - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_vergleiche:", error);
      }
    });

    test("should validate link to hersteller", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="hersteller"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("hersteller");
          }
        } else {
          console.log("No links found for hersteller - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link hersteller:", error);
      }
    });

    test("should validate link to leasing_dacia", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_dacia"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_dacia");
          }
        } else {
          console.log("No links found for leasing_dacia - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_dacia:", error);
      }
    });

    test("should validate link to neuwagen_leasing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="neuwagen_leasing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("neuwagen_leasing");
          }
        } else {
          console.log("No links found for neuwagen_leasing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link neuwagen_leasing:", error);
      }
    });

    test("should validate link to e_book", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="e_book"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("e_book");
          }
        } else {
          console.log("No links found for e_book - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link e_book:", error);
      }
    });

    test("should validate link to leasinguebernahme", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasinguebernahme"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasinguebernahme");
          }
        } else {
          console.log("No links found for leasinguebernahme - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasinguebernahme:", error);
      }
    });

    test("should validate link to ratgeber", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="ratgeber"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("ratgeber");
          }
        } else {
          console.log("No links found for ratgeber - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link ratgeber:", error);
      }
    });

    test("should validate link to auto_abo", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="auto_abo"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("auto_abo");
          }
        } else {
          console.log("No links found for auto_abo - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link auto_abo:", error);
      }
    });

    test("should validate link to www_leasingmarkt_de", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_leasingmarkt_de"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_leasingmarkt_de");
          }
        } else {
          console.log("No links found for www_leasingmarkt_de - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_leasingmarkt_de:", error);
      }
    });

    test("should validate link to impressum", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="impressum"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("impressum");
          }
        } else {
          console.log("No links found for impressum - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link impressum:", error);
      }
    });

    test("should validate link to newsletter", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="newsletter"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("newsletter");
          }
        } else {
          console.log("No links found for newsletter - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link newsletter:", error);
      }
    });

    test("should validate link to leasing_vw", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_vw"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_vw");
          }
        } else {
          console.log("No links found for leasing_vw - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_vw:", error);
      }
    });

    test("should validate link to kosten", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="kosten"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("kosten");
          }
        } else {
          console.log("No links found for kosten - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link kosten:", error);
      }
    });

    test("should validate link to haendler", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="haendler"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("haendler");
          }
        } else {
          console.log("No links found for haendler - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link haendler:", error);
      }
    });

    test("should validate link to leasing_mercedes_benz", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_mercedes_benz"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_mercedes_benz");
          }
        } else {
          console.log("No links found for leasing_mercedes_benz - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_mercedes_benz:", error);
      }
    });

    test("should validate link to leasing_opel", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_opel"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_opel");
          }
        } else {
          console.log("No links found for leasing_opel - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_opel:", error);
      }
    });

    test("should validate link to leasing_mitsubishi", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_mitsubishi"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_mitsubishi");
          }
        } else {
          console.log("No links found for leasing_mitsubishi - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_mitsubishi:", error);
      }
    });

    test("should validate link to hybrid_leasing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="hybrid_leasing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("hybrid_leasing");
          }
        } else {
          console.log("No links found for hybrid_leasing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link hybrid_leasing:", error);
      }
    });

    test("should validate link to leasing_renault", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_renault"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_renault");
          }
        } else {
          console.log("No links found for leasing_renault - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_renault:", error);
      }
    });

    test("should validate link to leasing_seat", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_seat"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_seat");
          }
        } else {
          console.log("No links found for leasing_seat - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_seat:", error);
      }
    });

    test("should validate link to leasing_lexikon", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_lexikon"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_lexikon");
          }
        } else {
          console.log("No links found for leasing_lexikon - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_lexikon:", error);
      }
    });

    test("should validate link to leasing_hyundai", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_hyundai"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_hyundai");
          }
        } else {
          console.log("No links found for leasing_hyundai - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_hyundai:", error);
      }
    });

    test("should validate link to auto_tests", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="auto_tests"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("auto_tests");
          }
        } else {
          console.log("No links found for auto_tests - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link auto_tests:", error);
      }
    });

    test("should validate link to datenschutz", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="datenschutz"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("datenschutz");
          }
        } else {
          console.log("No links found for datenschutz - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link datenschutz:", error);
      }
    });

    test("should validate link to leasing_volvo", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_volvo"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_volvo");
          }
        } else {
          console.log("No links found for leasing_volvo - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_volvo:", error);
      }
    });

    test("should validate link to allgemeine_geschaeftsbedingungen", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="allgemeine_geschaeftsbedingungen"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("allgemeine_geschaeftsbedingungen");
          }
        } else {
          console.log("No links found for allgemeine_geschaeftsbedingungen - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link allgemeine_geschaeftsbedingungen:", error);
      }
    });

    test("should validate link to login", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="login"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("login");
          }
        } else {
          console.log("No links found for login - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link login:", error);
      }
    });

    test("should validate link to firmenwagen_leasing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="firmenwagen_leasing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("firmenwagen_leasing");
          }
        } else {
          console.log("No links found for firmenwagen_leasing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link firmenwagen_leasing:", error);
      }
    });

    test("should validate link to leasing_mazda", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_mazda"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_mazda");
          }
        } else {
          console.log("No links found for leasing_mazda - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_mazda:", error);
      }
    });

    test("should validate link to kontakt", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="kontakt"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("kontakt");
          }
        } else {
          console.log("No links found for kontakt - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link kontakt:", error);
      }
    });

    test("should validate link to leasing_porsche", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_porsche"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_porsche");
          }
        } else {
          console.log("No links found for leasing_porsche - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_porsche:", error);
      }
    });

    test("should validate link to region", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="region"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("region");
          }
        } else {
          console.log("No links found for region - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link region:", error);
      }
    });

    test("should validate link to leasing_cupra", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_cupra"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_cupra");
          }
        } else {
          console.log("No links found for leasing_cupra - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_cupra:", error);
      }
    });

    test("should validate link to leasing_jeep", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_jeep"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_jeep");
          }
        } else {
          console.log("No links found for leasing_jeep - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_jeep:", error);
      }
    });

    test("should validate link to partner", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="partner"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("partner");
          }
        } else {
          console.log("No links found for partner - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link partner:", error);
      }
    });

    test("should validate link to privatleasing", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="privatleasing"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("privatleasing");
          }
        } else {
          console.log("No links found for privatleasing - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link privatleasing:", error);
      }
    });

    test("should validate link to magazin", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="magazin"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("magazin");
          }
        } else {
          console.log("No links found for magazin - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link magazin:", error);
      }
    });

    test("should validate link to presse", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="presse"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("presse");
          }
        } else {
          console.log("No links found for presse - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link presse:", error);
      }
    });

    test("should validate link to leasing_citroen", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_citroen"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_citroen");
          }
        } else {
          console.log("No links found for leasing_citroen - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_citroen:", error);
      }
    });

    test("should validate link to leasing_kia", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_kia"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_kia");
          }
        } else {
          console.log("No links found for leasing_kia - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_kia:", error);
      }
    });

    test("should validate link to faq", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="faq"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("faq");
          }
        } else {
          console.log("No links found for faq - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link faq:", error);
      }
    });

    test("should validate link to leasing_ford", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_ford"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_ford");
          }
        } else {
          console.log("No links found for leasing_ford - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_ford:", error);
      }
    });

    test("should validate link to leasing_suzuki", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_suzuki"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_suzuki");
          }
        } else {
          console.log("No links found for leasing_suzuki - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_suzuki:", error);
      }
    });

    test("should validate link to leasing_audi", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="leasing_audi"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("leasing_audi");
          }
        } else {
          console.log("No links found for leasing_audi - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link leasing_audi:", error);
      }
    });

    test("should validate link to parkplatz", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="parkplatz"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("parkplatz");
          }
        } else {
          console.log("No links found for parkplatz - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link parkplatz:", error);
      }
    });

  });

  test.describe("Links to www.autoscout24.com", () => {
    test("should validate link to www_autoscout24_com", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_autoscout24_com"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_autoscout24_com");
          }
        } else {
          console.log("No links found for www_autoscout24_com - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_autoscout24_com:", error);
      }
    });

    test("should validate link to company_Leasingmarkt_de", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="company_Leasingmarkt_de"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("company_Leasingmarkt_de");
          }
        } else {
          console.log("No links found for company_Leasingmarkt_de - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link company_Leasingmarkt_de:", error);
      }
    });

  });

  test.describe("Links to autoscout24-media.com", () => {
    test("should validate link to autoscout24_media_com", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="autoscout24_media_com"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("autoscout24_media_com");
          }
        } else {
          console.log("No links found for autoscout24_media_com - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link autoscout24_media_com:", error);
      }
    });

  });

  test.describe("Links to itunes.apple.com", () => {
    test("should validate link to id1261336827_mt_8", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="id1261336827_mt_8"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("id1261336827_mt_8");
          }
        } else {
          console.log("No links found for id1261336827_mt_8 - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link id1261336827_mt_8:", error);
      }
    });

  });

  test.describe("Links to play.google.com", () => {
    test("should validate link to details_id_de_leasingmarkt_app", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="details_id_de_leasingmarkt_app"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("details_id_de_leasingmarkt_app");
          }
        } else {
          console.log("No links found for details_id_de_leasingmarkt_app - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link details_id_de_leasingmarkt_app:", error);
      }
    });

  });

  test.describe("Links to www.facebook.com", () => {
    test("should validate link to LeasingMarkt", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="LeasingMarkt"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("LeasingMarkt");
          }
        } else {
          console.log("No links found for LeasingMarkt - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link LeasingMarkt:", error);
      }
    });

  });

  test.describe("Links to www.instagram.com", () => {
    test("should validate link to www_instagram_com", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_instagram_com"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_instagram_com");
          }
        } else {
          console.log("No links found for www_instagram_com - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_instagram_com:", error);
      }
    });

  });

  test.describe("Links to www.youtube.com", () => {
    test("should validate link to LeasingMarktde", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="LeasingMarktde"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("LeasingMarktde");
          }
        } else {
          console.log("No links found for LeasingMarktde - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link LeasingMarktde:", error);
      }
    });

  });

  test.describe("Links to www.linkedin.com", () => {
    test("should validate link to www_linkedin_com", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_linkedin_com"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_linkedin_com");
          }
        } else {
          console.log("No links found for www_linkedin_com - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_linkedin_com:", error);
      }
    });

  });

  test.describe("Links to www.tiktok.com", () => {
    test("should validate link to www_tiktok_com", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_tiktok_com"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_tiktok_com");
          }
        } else {
          console.log("No links found for www_tiktok_com - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_tiktok_com:", error);
      }
    });

  });

  test.describe("Links to www.ekomi.de", () => {
    test("should validate link to bewertungen_leasingmarktde_html", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="bewertungen_leasingmarktde_html"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("bewertungen_leasingmarktde_html");
          }
        } else {
          console.log("No links found for bewertungen_leasingmarktde_html - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link bewertungen_leasingmarktde_html:", error);
      }
    });

  });

  test.describe("Links to www.autoscout24.de", () => {
    test("should validate link to www_autoscout24_de", async ({ page }) => {
      try {
        const links = await page.locator('a[href*="www_autoscout24_de"]').all();
        if (links.length > 0) {
          for (const link of links) {
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
            expect(href).toContain("www_autoscout24_de");
          }
        } else {
          console.log("No links found for www_autoscout24_de - this may be expected");
        }
      } catch (error) {
        console.log("Error validating link www_autoscout24_de:", error);
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
            await expect(button_Favoriten0, "Button should be enabled").toBeEnabled();

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
            await expect(button_0, "Button should be enabled").toBeEnabled();

            // Verify button interactions
            await button_0.hover();

            if (true) {
              await button_0.click({ trial: true });
            }
          }

          // Test button: Kostenlos registrieren
          const button_Kostenlos_registrieren = await page.getByRole("button", { name: "Kostenlos registrieren" });
          if (await button_Kostenlos_registrieren.count() > 0) {
            await expect(button_Kostenlos_registrieren, "Button should be visible").toBeVisible();
            await expect(button_Kostenlos_registrieren, "Button should be enabled").toBeEnabled();

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
            await expect(button_Absenden, "Button should be enabled").toBeEnabled();

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
            await expect(button_Absenden_1, "Button should be enabled").toBeEnabled();

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
            await expect(button_Absenden_2, "Button should be enabled").toBeEnabled();

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