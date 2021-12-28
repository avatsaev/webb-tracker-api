import { scapWebbTrackingData } from './webb-tracker.service';
import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.POST ?? 8001;
app.get("/", (req, res) => res.send({ status: "ok" }));

app.get("/track", async (req, res) => {
    const data = await scapWebbTrackingData();
    res.status(200).send(data);
});

app.listen(PORT, async () => {
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
});