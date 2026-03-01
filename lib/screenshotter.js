import puppeteer from "puppeteer";

/**
 * Visits a URL with a headless browser and returns a base64 screenshot.
 * Waits for the page to be visually stable before capturing.
 */
export async function captureScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--window-size=1440,900",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Block heavy assets to keep it fast
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const type = req.resourceType();
      if (["font", "media"].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Let any animations settle
    await new Promise((r) => setTimeout(r, 1500));

    const screenshotBuffer = await page.screenshot({
      type: "jpeg",
      quality: 85,
      fullPage: false, // above-the-fold only — captures the hero/branding
    });

    return {
      base64: screenshotBuffer.toString("base64"),
      mimeType: "image/jpeg",
    };
  } finally {
    await browser.close();
  }
}
