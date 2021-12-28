# James Webb Telescope tracking API

## Build

`docker build -t webb-tracker-api .`

## Run

`docker run -p 8001:8001 --name=webb-tracker-api webb-tracker-api`

## Usage

Endpoint: `GET http://localhost:8001/track`

Response example:

```json
{
  "distanceEarthKm": "421956.0", // distance traveled from earth
  "launchElapsedTime": "02:12:51:53", // time elapsed since launch
  "distanceL2Km": "1024375.6", // remaining distance to L2
  "percentageCompleted": "29.1741", // distance completed in %
  "speedKmS": "1.1578", // cruising speed in km/s
  "currentDeploymentStep": "MCC1b - Mid Course Correction Burn 1b" // Current deployment step with description
}
```
