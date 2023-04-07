import express from "express";
import user_router from "./routes/users.js";
import task_router from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { ErrorMiddleWare } from "./middlewares/error.js";
import cors from 'cors';

export const app = express();

config({
    path: './data/config.env',
});

//Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({

}))
app.use('/api/v1/users',user_router);
app.use('/api/v1/tasks',task_router);

app.use(ErrorMiddleWare);



