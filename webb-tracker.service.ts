import { Page } from "puppeteer";

export const scrapWebbTrackingData = async (page: Page) => {
  const trackingData = await page.evaluate(() => {
    const distanceEarthKm = document.querySelector("#kmsEarth")?.textContent;
    const launchElapsedTime =
      document.querySelector("#launchElapsedTime")?.textContent;
    const distanceL2Km = document.querySelector("#kmsToL2")?.textContent;
    const percentageCompleted = document.querySelector(
      "#percentageCompleted"
    )?.textContent;
    const speedKmS = document.querySelector("#speedKm")?.textContent;
    const currentDeploymentStep = document.querySelector(
      "#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > h1"
    )?.textContent;
    const deploymentDetails = document.querySelector(
      "#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > p.oneLiner"
    )?.textContent;

    const deploymentImgURL =
      "https://webb.nasa.gov" +
      document
        .querySelector("#ssdItemDetailPanelImageWrap > img")
        ?.getAttribute("src");

    return {
      distanceEarthKm,
      launchElapsedTime,
      distanceL2Km,
      percentageCompleted,
      speedKmS,
      deploymentImgURL,
      currentDeploymentStep:
        currentDeploymentStep?.trim() + " - " + deploymentDetails?.trim(),
      timestamp: new Date().toISOString(),
    };
  });

  return trackingData;
};
