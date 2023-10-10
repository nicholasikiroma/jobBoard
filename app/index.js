import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import dB from "./models/index.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morganMiddleware);

dB.sequelize.sync({ alter: true });

app.use("/api", router);

export default app;
