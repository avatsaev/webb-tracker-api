import { Page } from "puppeteer";
import Fastify, { FastifyInstance } from "fastify";
import { scrapWebbTrackingData } from "./webb-tracker.service";
import { randomUUID } from "crypto";

export async function getServer(page: Page): Promise<FastifyInstance> {
    const instance = Fastify({
        logger: true
    });
    instance.get("/", {}, () =>
        Promise.resolve({
            status: "ok",
            version: "1.0.0",
            serverID: randomUUID()
        })
    );
    instance.get("/track", () => scrapWebbTrackingData(page));
    return instance;
}
