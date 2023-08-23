import { Request, Response } from "express";
import container from "../services/di.service";
import { sendResponse } from "../common/response";
// import { Service } from "../services/service";

export class Controller {
    // private service: Service;
    service: any;
    constructor() {
        // this.service = new Service();
        this.service = container.get("service");
    }

    getUsers = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await this.service.users();
            sendResponse(res, 200, "Users found successfully", user);
        } catch (error) {
            sendResponse(res, 403, "Something went wrong.", null);
        }
    }

    getOneUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email } = req.query;
            const user = await this.service.user(email);
            if (!user) return sendResponse(res, 404, "User not found.", null);
            sendResponse(res, 200, "User found successfully", user);
        } catch (error) {
            sendResponse(res, 403, "Something went wrong.", null);
        }
    }

    createUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await this.service.create(req.body);
            sendResponse(res, 200, "User created successfully", user);
        } catch (error) {
            sendResponse(res, 403, "Something went wrong.", null);
        }
    }

    updateUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email, firstName, lastName } = req.body;
            const user = await this.service.update({ email, firstName, lastName });
            sendResponse(res, 200, "User updated successfully", user);
        } catch (error) {
            if (error == "User not found.") {
                return sendResponse(res, 404, "User not found.", null);
            }
            sendResponse(res, 403, "Something went wrong.", null);
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const { email } = req.body;
            const user = await this.service.delete(email);
            sendResponse(res, 200, "User deleted successfully", user);
        } catch (error) {
            if (error == "User not found.") {
                return sendResponse(res, 404, "User not found.", null);
            }
            sendResponse(res, 403, "Something went wrong.", null);
        }
    }
}