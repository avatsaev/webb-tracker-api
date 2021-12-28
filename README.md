# James Webb Telescope tracking API

## Build

`docker build -t webb-tracker-api .`

## Run

`docker run -p 8001:8001 --name=webb-tracker-api webb-tracker-api`

Endpoint: `GET http://localhost:8001/track`

Response example:

```json
{
  "distanceEarthKm": "421956.0",
  "launchElapsedTime": "02:12:51:53",
  "distanceL2Km": "1024375.6",
  "percentageCompleted": "29.1741",
  "speedKmS": "1.1578",
  "currentDeploymentStep": "MCC1b - Mid Course Correction Burn 1b"
}
```
