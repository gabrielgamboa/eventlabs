import "dotenv/config";

import express, {Request, Response, NextFunction} from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";
import "./database";

import "./shared/container";

import { routes } from "./routes";
import { AppError } from "./shared/errors/AppError";
import { ValidationError } from "./shared/errors/ValidationError";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ValidationError) {
        return response.status(err.statusCode).json({
            message: err.message,
            errors: err.errors
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message} `
    });
})

app.listen(process.env.PORT || 3333, () => console.log(`Server is running on port ${process.env.PORT}`));