import * as express from "express";
import entityRouter from "./Routers/Entities";
import * as bodyParser from "body-parser";
import config from "../config";

const app = express();

app.use(bodyParser.json());
app.use("/entities", entityRouter);

app.listen(config.expressAppPort);
