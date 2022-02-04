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
        tempInstMiriC: number | null;
        tempInstNirCamC: number | null;
        tempInstNirSpecC: number | null;
        tempInstFgsNirissC: number | null;
        tempInstFsmC: number | null;
    };
    timestamp: string | null;
};

export const scrapWebbTrackingData = async (
    page: Page
): Promise<TrackingPayload> => {
    const [
        currentDeploymentStep,
        deploymentDetails,
        deploymentImgURL,
        tempWarmSide1C,
        tempWarmSide2C,
        tempCoolSide1C,
        tempCoolSide2C,
        tempInstMiriC,
        tempInstNirCamC,
        tempInstNirSpecC,
        tempInstFgsNirissC,
        tempInstFsmC,

    ] = await Promise.all([

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
        page.$eval("#tempCoolSide2C", elt => Number(elt?.textContent) || null),

        page.$eval("#tempInstMiriC", elt => Number(elt?.textContent) || null),
        page.$eval("#tempInstNirCamC", elt => Number(elt?.textContent) || null),
        page.$eval("#tempInstNirSpecC", elt => Number(elt?.textContent) || null),
        page.$eval("#tempInstFgsNirissC", elt => Number(elt?.textContent) || null),
        page.$eval("#tempInstFsmC", elt => Number(elt?.textContent) || null),
    ]);

    return {
        distanceEarthKm: null,
        launchElapsedTime: null,
        distanceL2Km: null,
        percentageCompleted: null,
        speedKmS: null,
        deploymentImgURL,
        currentDeploymentStep:
            currentDeploymentStep?.trim() + " - " + deploymentDetails?.trim(),
        tempC: {
            tempWarmSide1C,
            tempWarmSide2C,
            tempCoolSide1C,
            tempCoolSide2C,
            tempInstMiriC,
            tempInstNirCamC,
            tempInstNirSpecC,
            tempInstFgsNirissC,
            tempInstFsmC,
        },
        timestamp: new Date().toISOString()
    };
};
