
<p align="center">
  <img src="https://www.jwst.nasa.gov/content/webbLaunch/assets/images/branding/logo/FULLCOLOR_2LINE_LIGHT_BG.png" width="400">
</p>

# James Webb Telescope tracking REST API

Public REST API to track JWST's current status

API data source: https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html

## API

Public endpont: https://api.jwst-hub.com


Ressources:


- `GET: /track`
  - returns jwst tracking data

Response example:  https://api.jwst-hub.com/track


```json
{
    "distanceEarthKm": 421956.0, // distance traveled from earth
    "launchElapsedTime": "02:12:51:53", // time elapsed since launch
    "distanceL2Km": 1024375.6, // remaining distance to L2
    "percentageCompleted": 29.1741, // distance completed in %
    "speedKmS": 1.1578, // cruising speed in km/s
    "deploymentImgURL": "", // URL to deployment visual
    "currentDeploymentStep": "MCC1b - Mid Course Correction Burn 1b", // Current deployment step with description
    "tempC": {
        // dictionary of current temperatures in celcius
        "tempWarmSide1C": 56.67, // sunshield UPS average temperature
        "tempWarmSide2C": 15.56, // spacecraft equipment panel temperature
        "tempCoolSide1C": -88.33, // primary mirror temperature
        "tempCoolSide2C": -182.78 // instrument radiator temperature
    }
}
```


- `GET /`
  - returns API status and metatada 

Response example:  https://api.jwst-hub.com/

```json
{
  "status": "ok",
  "version": "1.0.0",
  "serverID": "d0453deb-9c78-4e3c-be37-cf7c0633d21d" // node ID that handled the request
}
```

## Build

`docker build -t webb-tracker-api .`

## Run

`docker run -p 8001:8001 --name=webb-tracker-api webb-tracker-api`

## Usage

Endpoint: `GET http://localhost:8001/track`



