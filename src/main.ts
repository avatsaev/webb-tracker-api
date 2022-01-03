import { getBrowser, getWebbPage } from "./helpers/puppetteer";
import { getServer } from "./server";

function main(): void {
    void getBrowser()
        .then(getWebbPage)
        .then(getServer)
        .then(server => {
            const port = Number(process.env.PORT) || 8001;
            server.listen(port, err => {
                if (err) {
                    server.log.error(err);
                    process.exit(1);
                }
                console.log(
                    `⚡️[API server]: Server is running at http://localhost:${port}`
                );
            });
        });
}

main();
