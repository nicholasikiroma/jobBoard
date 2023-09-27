import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import dB from "./models/index.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morganMiddleware);

dB.sequelize.sync({ alter: true });

app.use("/api", router);

export default app;
