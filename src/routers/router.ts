import { Router, Request, Response } from "express";
import { Controller } from "../controllers/controller";
import { sendResponse } from "../common/response";

class MainRouter {
    router: any;
    private controller: Controller;
    constructor() {
        // const serviceInstance = new IService();
        this.controller = new Controller();
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get("/users", this.controller.getUsers);
        this.router.get("/user", this.controller.getOneUser);
        this.router.post("/user", this.controller.createUser);
        this.router.put("/user", this.controller.updateUser);
        this.router.delete("/user", this.controller.deleteUser);

        this.router.get('*', function (req: Request, res: Response) {
            sendResponse(res, 404, "Not Found.", null);
        });
    }

    getRouters() {
        return this.router;
    }
}

export const router = new MainRouter();