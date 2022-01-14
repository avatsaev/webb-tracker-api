import { Page } from "puppeteer";
import Fastify, { FastifyInstance } from "fastify";
import { scrapWebbTrackingData } from "./webb-tracker.service";
import { randomUUID } from "crypto";
import FastifyCors from "fastify-cors";


export async function getServer(page: Page): Promise<FastifyInstance> {
    const instance = Fastify({
        logger: true
    });

    await instance.register(FastifyCors, {
      origin: "*",
      methods: ["GET"],
    });

    instance.get("/", {}, () =>
        Promise.resolve({
            status: "ok",
            version: "1.0.0",
            serverID: randomUUID()
        })
    );
    instance.get("/track", (req) => {
      console.log("TRACK", req.ip);
      return scrapWebbTrackingData(page)
    });
    return instance;
}
