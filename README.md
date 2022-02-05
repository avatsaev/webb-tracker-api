
<p align="center">
  <img src="https://www.jwst.nasa.gov/content/webbLaunch/assets/images/branding/logo/FULLCOLOR_2LINE_LIGHT_BG.png" width="400">
</p>

# James Webb Telescope tracking REST API

Public REST API to track JWST's current status

API data source: https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html

## API

Public endpont: https://api.jwst-hub.com

JWST has fully deployed, the public API is shutdown, you can still self host it if you wish so.


Ressources:

**Endpoint: https://api.jwst-hub.com/track**

- `GET: /track`
  - returns jwst tracking data



```json
{
  "distanceEarthKm":null,  // no longer available
  "launchElapsedTime":null, // no longer available
  "distanceL2Km":null, // no longer available
  "percentageCompleted":null, // no longer available
  "speedKmS":null, // no longer available
  "deploymentImgURL":"https://webb.nasa.gov/content/webbLaunch/assets/images/deployment/1000pxWide/127.png",
  "currentDeploymentStep":"WEBB IS ORBITING L2 - Next Steps:  Cooldown, Alignment, Calibration",
  "tempC":{
    "tempWarmSide1C":51,
    "tempWarmSide2C":12,
    "tempCoolSide1C":-217,
    "tempCoolSide2C":-213,
    "tempInstMiriC":-128,
    "tempInstNirCamC":-180,
    "tempInstNirSpecC":-168,
    "tempInstFgsNirissC":-168,
    "tempInstFsmC":-216
  },
  "timestamp":"2022-02-05T15:50:13.536Z"
}
```


**Endpoint: https://api.jwst-hub.com**

- `GET /`
  - returns API status and metatada 


```json
{
  "status": "ok",
  "version": "1.0.0",
  "serverID": "d0453deb-9c78-4e3c-be37-cf7c0633d21d" // node ID that handled the request
}
```

# Telemetry recording and data charting:


Data recorder: https://github.com/avatsaev/webb-data-recorder

Live InfluxDB data: https://eu-central-1-1.aws.cloud2.influxdata.com/share/6H2CTV-SQdmreGx3xdUyS

![](https://i.imgur.com/EZ9ayux.png)

## Build

`docker build -t webb-tracker-api .`

## Run

`docker run -p 8001:8001 --name=webb-tracker-api webb-tracker-api`

## Usage

Endpoint: `GET http://localhost:8001/track`



