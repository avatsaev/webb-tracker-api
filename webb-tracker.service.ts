import { Page } from "puppeteer";
import { toNumber } from "./helpers/to-number";

type TrackingPayload = {
    distanceEarthKm: number;
    launchElapsedTime: string;
    distanceL2Km: number;
    percentageCompleted: number;
    speedKmS: number;
    deploymentImgURL: string;
    currentDeploymentStep: string;
    tempC: {
        tempWarmSide1C: number;
        tempWarmSide2C: number;
        tempCoolSide1C: number;
        tempCoolSide2C: number;
    };
    timestamp: string;
};

export const scrapWebbTrackingData = async (
    page: Page
): Promise<TrackingPayload> => {
    const scrappedData = await page.evaluate(() => {
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
        const tempWarmSide1C =
            document.querySelector("#tempWarmSide1C")?.textContent;
        const tempWarmSide2C =
            document.querySelector("#tempWarmSide2C")?.textContent;
        const tempCoolSide1C =
            document.querySelector("#tempCoolSide1C")?.textContent;
        const tempCoolSide2C =
            document.querySelector("#tempCoolSide2C")?.textContent;

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
            tempC: {
                tempWarmSide1C,
                tempWarmSide2C,
                tempCoolSide1C,
                tempCoolSide2C
            },
            timestamp: new Date().toISOString()
        };
    });
    return {
        ...scrappedData,
        distanceEarthKm: toNumber(scrappedData.distanceEarthKm),
        distanceL2Km: toNumber(scrappedData.distanceL2Km),
        percentageCompleted: toNumber(scrappedData.percentageCompleted),
        speedKmS: toNumber(scrappedData.speedKmS),
        tempC: {
            tempWarmSide1C: toNumber(scrappedData.tempC.tempWarmSide1C),
            tempWarmSide2C: toNumber(scrappedData.tempC.tempWarmSide2C),
            tempCoolSide1C: toNumber(scrappedData.tempC.tempCoolSide1C),
            tempCoolSide2C: toNumber(scrappedData.tempC.tempCoolSide2C)
        },
        timestamp: new Date().toISOString()
    };
};
