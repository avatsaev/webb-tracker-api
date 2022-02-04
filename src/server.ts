import { Page } from "puppeteer";
import Fastify, { FastifyInstance } from "fastify";
import { scrapWebbTrackingData } from "./webb-tracker.service";
import { randomUUID } from "crypto";
import FastifyCors from "fastify-cors";

const instanceID = randomUUID();

export async function getServer(page: Page): Promise<FastifyInstance> {
    const instance = Fastify({
        logger: true
    });


    setInterval( () => {
        console.log("reloading page...");
        page.reload({waitUntil: "domcontentloaded"}).catch(console.error);
    }, 60000*30);

    await instance.register(FastifyCors, {
      origin: "*",
      methods: ["GET"],
    });

    instance.get("/", {}, () =>
        Promise.resolve({
            status: "ok",
            version: "2.0.0",
            serverID: instanceID
        })
    );

    instance.get("/track", (req) => {
      console.log("TRACK", req.ip);
      return scrapWebbTrackingData(page)
    });
    return instance;
}
