import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";

import bodyParser from "body-parser";
import cors from "cors";
import itineraryRoute from "./routes/itinerary";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/itinerary", itineraryRoute);

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid route",
  });
});

app.use(ErrorHandler.handleErrors);

export default app;
