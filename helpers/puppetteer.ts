import { Browser, launch, Page } from "puppeteer";

const DEFAULT_BROWSER_OPTIONS = {
  headless: true,
  args: [
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--no-sandbox",
  ],
};

export const getBrowser = (): Promise<Browser> =>
  launch(DEFAULT_BROWSER_OPTIONS);

const DEFAULT_WEBB_PAGE_OPTIONS = {
  pageUrl: "https://webb.nasa.gov/content/webbLaunch/whereIsWebb.html",
};

export const getWebbPage = (browser: Browser): Promise<Page> =>
  browser.newPage().then(async (page) => {
    await page.goto(DEFAULT_WEBB_PAGE_OPTIONS.pageUrl, {
      waitUntil: "domcontentloaded",
    });
    return page;
  });
