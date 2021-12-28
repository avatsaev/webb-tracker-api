import {initPage, scrapWebbTrackingData} from './webb-tracker.service';
import express from "express";
import puppeteer from "puppeteer";

let page: puppeteer.Page;

const app = express();
app.use(express.json());

const PORT = process.env.POST ?? 8001;
app.get("/", (req, res) => res.send({ status: "ok" }));

app.get("/track", async (req, res) => {
    const data = await scrapWebbTrackingData(page);
    res.status(200).send(data);
});

app.listen(PORT, async () => {
    page = await initPage();
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
});
