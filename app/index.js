import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import dB from "./models/index.js";

const app = express();

app.use(morganMiddleware);

dB.sequelize.sync({ alter: true });

export default app;
