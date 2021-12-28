import puppeteer from "puppeteer";
import Fastify from "fastify";
import { scrapWebbTrackingData } from "./webb-tracker.service";
import { getBrowser, getWebbPage } from "./helpers/puppetteer";

const version = "1.0.1";
let page: puppeteer.Page;
const PORT = process.env.POST ?? 8001;

const fastify = Fastify({
    logger: true
});

fastify.get("/", function (request, reply) {
    reply.send({ status: "ok", version });
});

fastify.get("/track", async (request, reply) => {
    const data = await scrapWebbTrackingData(page);
    reply.send(data);
});

fastify.listen(PORT, "0.0.0.0", async (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    page = await getBrowser().then(getWebbPage);
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
});
