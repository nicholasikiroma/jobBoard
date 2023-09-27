import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";

const app = express();

app.use(morganMiddleware);

export default app;
