import puppeteer from "puppeteer";
import Fastify from "fastify";
import { scrapWebbTrackingData } from "./webb-tracker.service";
import { getBrowser, getWebbPage } from "./helpers/puppetteer";
import { randomUUID } from "crypto";

const version = "1.0.0";
let page: puppeteer.Page;
const PORT = process.env.POST ?? 8001;
const processID = randomUUID();
const fastify = Fastify({
    logger: true
});

fastify.get("/", {}, () =>
    Promise.resolve({
        status: "ok",
        version,
        serverID: processID
    })
);

fastify.get("/track", () => scrapWebbTrackingData(page));

fastify.listen(PORT, "0.0.0.0", err => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    void getBrowser()
        .then(getWebbPage)
        .then(p => (page = p));
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
});
