import express from "express";

import { config } from "./config/config";
import { router } from "./routers/router";

class App {
    app: any;
    port: number;
    constructor() {
        this.app = express();
        this.port = config.PORT || 3000;
    }

    init() {
        this.addRoutesAndMiddlewares(this.app);
        this.listenToPort(this.app, this.port);
    }

    addRoutesAndMiddlewares(app: any) {
        app.use(express.json(), express.urlencoded({ extended: true }));
        app.use('/api', router.getRouters());
    }

    listenToPort(app: any, port: number) {
        app.listen(port, () => {
            console.log(`Server listening to port : ${port}.`);
        });
    }
}

export const app = new App();