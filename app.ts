import { scapWebbTrackingData } from './webb-tracker.service';
import express from "express";

// rest of the code remains same
const app = express();
app.use(express.json());

const PORT = process.env.POST ?? 8001;
app.get("/", (req, res) => res.send({ status: "ok" }));



app.get("/track", async (req, res) => {


    const $ = await scapWebbTrackingData();

    
    
    // console.log("--------");
    
    // console.log($);

    // const kmToEarth = $("#kmsEarth").text();

    // console.log("========>", kmToEarth);
    


    res.status(200).send($);
});
app.listen(PORT, async () => {
    
    console.log(
        `⚡️[API server]: Server is running at http://localhost:${PORT}`
    );
});