import { Page } from "puppeteer";

export const scrapWebbTrackingData = async (page: Page) => {
    return await page.evaluate(() => {
        const distanceEarthKm =
            document.querySelector("#kmsEarth")?.textContent;
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
		const tempWarmSide1C = document.querySelector("#tempWarmSide1C")?.textContent;
		const tempWarmSide2C = document.querySelector("#tempWarmSide2C")?.textContent;
		const tempCoolSide1C = document.querySelector("#tempCoolSide1C")?.textContent;
		const tempCoolSide2C = document.querySelector("#tempCoolSide2C")?.textContent;

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
                currentDeploymentStep?.trim() +
                " - " +
                deploymentDetails?.trim(),
			tempC: {tempWarmSide1C, tempWarmSide2C, tempCoolSide1C, tempCoolSide2C},
            timestamp: new Date().toISOString()
        };
    });
};
