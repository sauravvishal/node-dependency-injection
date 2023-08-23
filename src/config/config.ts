import dotenv from "dotenv";
dotenv.config();

class Config {
    PORT: number;
    constructor() {
        this.PORT = +process.env.PORT! || 3000;
    }
}

export const config = new Config();