FROM node:14-alpine AS builder
RUN mkdir -p /build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build


# --------------------------------------

FROM node:14

RUN mkdir /app

WORKDIR /app

RUN apt update

RUN apt install -yyq libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6

RUN apt-get install -yyq gconf-service lsb-release wget xdg-utils

COPY --from=builder /build/package.json /app/
COPY --from=builder /build/dist/ /app/

RUN npm install --only=prod
RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium
EXPOSE 8001
CMD [ "npm", "run", "start" ]
