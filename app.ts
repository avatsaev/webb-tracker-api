import puppeteer from "puppeteer";
import Fastify from 'fastify'
import {initPage, scrapWebbTrackingData} from "./webb-tracker.service";

let page: puppeteer.Page;
const PORT = process.env.POST ?? 8001;


const fastify = Fastify({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.send({ status: 'ok' })
})

fastify.get('/track', async (request, reply) => {
    const data = await scrapWebbTrackingData(page);
    reply.send(data)
})

fastify.listen(PORT, async (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

    page = await initPage();
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
})
