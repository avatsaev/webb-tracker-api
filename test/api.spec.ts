import { FastifyInstance, LightMyRequestResponse } from "fastify";
import { Page } from "puppeteer";
import { getServer } from "../src/server";
import { getBrowser, getWebbPage } from "../src/helpers/puppetteer";

describe("JWST API", () => {
    let page: Page;
    let server: FastifyInstance;

    beforeAll(async () => {
        page = await getBrowser().then(getWebbPage);
        server = await getServer(page);
    });

    afterAll(async () => {
        await server.close();
        await page.browser().close();
    });

    describe("/", () => {
        describe("GET /", () => {
            it("should respond with a HTTP 200 status", () =>
                server
                    .inject({ method: "GET", url: "/" })
                    .then(({ statusCode }) => expect(statusCode).toBe(200)));
        });
    });

    describe("/track", () => {
        describe("GET /track", () => {
            let response: LightMyRequestResponse;
            beforeAll(async () => {
                response = await server.inject({
                    method: "GET",
                    url: "/track"
                });
            });
            it("should respond with a HTTP 200 status", () =>
                expect(response.statusCode).toBe(200));
            it('should respond with a valid "distanceEarthKm" value', () =>
                expect(response.json()).toHaveProperty(
                    "distanceEarthKm",
                  null
                ));
            it('should respond with a valid "launchElapsedTime" value', () =>
                expect(response.json()).toHaveProperty(
                    "launchElapsedTime",
                  null
                ));
            it('should respond with a valid "distanceL2Km" value', () =>
                expect(response.json()).toHaveProperty(
                    "distanceL2Km",
                  null
                ));
            it('should respond with a valid "percentageCompleted" value', () =>
                expect(response.json()).toHaveProperty(
                    "percentageCompleted",
                  null
                ));
            it('should respond with a valid "speedKmS" value', () =>
                expect(response.json()).toHaveProperty(
                    "speedKmS",
                    null
                ));
            it('should respond with a valid "deploymentImgURL" value', () =>
                expect(response.json()).toHaveProperty(
                    "deploymentImgURL",
                    expect.any(String)
                ));
            it('should respond with a valid "currentDeploymentStep" value', () =>
                expect(response.json()).toHaveProperty(
                    "currentDeploymentStep",
                    expect.any(String)
                ));
            it('should respond with a valid "tempC.tempWarmSide1C" value', () =>
                expect(response.json()).toHaveProperty(
                    "tempC.tempWarmSide1C",
                    expect.any(Number)
                ));
            it('should respond with a valid "tempC.tempWarmSide2C" value', () =>
                expect(response.json()).toHaveProperty(
                    "tempC.tempWarmSide2C",
                    expect.any(Number)
                ));
            it('should respond with a valid "tempC.tempCoolSide1C" value', () =>
                expect(response.json()).toHaveProperty(
                    "tempC.tempCoolSide1C",
                    expect.any(Number)
                ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
                expect(response.json()).toHaveProperty(
                    "tempC.tempCoolSide2C",
                    expect.any(Number)
                ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
              expect(response.json()).toHaveProperty(
                "tempC.tempInstMiriC",
                expect.any(Number)
              ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
              expect(response.json()).toHaveProperty(
                "tempC.tempInstNirCamC",
                expect.any(Number)
              ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
              expect(response.json()).toHaveProperty(
                "tempC.tempInstNirSpecC",
                expect.any(Number)
              ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
              expect(response.json()).toHaveProperty(
                "tempC.tempInstFgsNirissC",
                expect.any(Number)
              ));
            it('should respond with a valid "tempC.tempCoolSide2C" value', () =>
              expect(response.json()).toHaveProperty(
                "tempC.tempInstFsmC",
                expect.any(Number)
              ));
            it('should respond with a valid "timestamp" value', () =>
                expect(response.json()).toHaveProperty(
                    "timestamp",
                    expect.any(String)
                ));
        });
    });
});
