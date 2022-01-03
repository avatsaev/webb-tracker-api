import { Page } from "puppeteer";

type TrackingPayload = {
    distanceEarthKm: number | null;
    launchElapsedTime: string | null;
    distanceL2Km: number | null;
    percentageCompleted: number | null;
    speedKmS: number | null;
    deploymentImgURL: string | null;
    currentDeploymentStep: string | null;
    tempC: {
        tempWarmSide1C: number | null;
        tempWarmSide2C: number | null;
        tempCoolSide1C: number | null;
        tempCoolSide2C: number | null;
    };
    timestamp: string | null;
};

export const scrapWebbTrackingData = async (
    page: Page
): Promise<TrackingPayload> => {
    const [
        distanceEarthKm,
        launchElapsedTime,
        distanceL2Km,
        percentageCompleted,
        speedKmS,
        currentDeploymentStep,
        deploymentDetails,
        deploymentImgURL,
        tempWarmSide1C,
        tempWarmSide2C,
        tempCoolSide1C,
        tempCoolSide2C
    ] = await Promise.all([
        page.$eval("#kmsEarth", elt => Number(elt?.textContent) || null),
        page.$eval("#launchElapsedTime", elt => elt?.textContent || null),
        page.$eval("#kmsToL2", elt => Number(elt?.textContent) || null),
        page.$eval(
            "#percentageCompleted",
            elt => Number(elt?.textContent) || null
        ),
        page.$eval("#speedKm", elt => Number(elt?.textContent) || null),
        page.$eval(
            "#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > h1",
            elt => elt?.textContent || null
        ),
        page.$eval(
            "#hero1 > div.ssdItemDetailPanel > div.ssdItemDetailPanelContent > header > p.oneLiner",
            elt => elt?.textContent || null
        ),
        page.$eval("#ssdItemDetailPanelImageWrap > img", elt =>
            (elt as HTMLImageElement)?.src
                ? (elt as HTMLImageElement)?.src
                : null
        ),
        page.$eval("#tempWarmSide1C", elt => Number(elt?.textContent) || null),
        page.$eval("#tempWarmSide2C", elt => Number(elt?.textContent) || null),
        page.$eval("#tempCoolSide1C", elt => Number(elt?.textContent) || null),
        page.$eval("#tempCoolSide2C", elt => Number(elt?.textContent) || null)
    ]);

    return {
        distanceEarthKm,
        launchElapsedTime,
        distanceL2Km,
        percentageCompleted,
        speedKmS,
        deploymentImgURL,
        currentDeploymentStep:
            currentDeploymentStep?.trim() + " - " + deploymentDetails?.trim(),
        tempC: {
            tempWarmSide1C,
            tempWarmSide2C,
            tempCoolSide1C,
            tempCoolSide2C
        },
        timestamp: new Date().toISOString()
    };
};
