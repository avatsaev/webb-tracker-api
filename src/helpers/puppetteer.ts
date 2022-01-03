import Puppeteer, { Browser, Page } from "puppeteer";

const DEFAULT_BROWSER_OPTIONS = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
};

export const getBrowser = (): Promise<Browser> =>
    Puppeteer.launch(DEFAULT_BROWSER_OPTIONS);

const DEFAULT_WEBB_PAGE_OPTIONS = {
    pageUrl: "https://webb.nasa.gov/content/webbLaunch/whereIsWebb.html"
};

export const getWebbPage = (browser: Browser): Promise<Page> =>
    browser.newPage().then(async page => {
        await page.goto(DEFAULT_WEBB_PAGE_OPTIONS.pageUrl, {
            waitUntil: "domcontentloaded"
        });
        return page;
    });
