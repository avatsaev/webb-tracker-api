import puppeteer  from "puppeteer";

const TRACK_PAGE_URI = process.env.TRACK_PAGE_URI ?? "https://webb.nasa.gov/content/webbLaunch/whereIsWebb.html"

export const scapWebbTrackingData = async () => {
    const browser = await puppeteer.launch({headless: true,
        args: [
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox",
            "--no-sandbox",
        ]});

    const page = await browser.newPage();
    
    await page.goto(TRACK_PAGE_URI);
    
    await page.waitForTimeout(400);
    
    const trackingData = await page.evaluate(() => {
        
        const distanceEarthKm = document.querySelector("#kmsEarth")?.textContent;
        const launchElapsedTime = document.querySelector("#launchElapsedTime")?.textContent;
        const distanceL2Km = document.querySelector("#kmsToL2")?.textContent;
        const percentageCompleted = document.querySelector("#percentageCompleted")?.textContent;
        const speedKmS = document.querySelector("#speedKm")?.textContent;
        const currentDeploymentStep = document.querySelector("#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > h1")?.textContent;
        const deploymentDetails = document.querySelector("#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > p.oneLiner")?.textContent;

        return {
            distanceEarthKm,
            launchElapsedTime,
            distanceL2Km,
            percentageCompleted,
            speedKmS,
            currentDeploymentStep: currentDeploymentStep?.trim() + " - " + deploymentDetails?.trim(),
        }
    });

    page.close();

    return trackingData;

}