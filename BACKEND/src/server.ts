import express from "express";
import path from "path";
import cors from "cors";
import { logger, logEvents } from "./middleware/logger";
import { metricsMiddleware, metricsRouteHandler } from "./middleware/metrics";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConn";
import seedDB from "./config/dbSeed";
import mongoose from "mongoose";

import rootRoutes from './routes/root';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import noteRoutes from './routes/noteRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

console.log(`Hosting environment: ${process.env.NODE_ENVIRONMENT}`);

connectDB();
seedDB();

app.use(metricsMiddleware);

app.get("/metrics", metricsRouteHandler);

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use("/", rootRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Now listening on: http://[::]:${PORT}`)
    console.log(`Metrics are available at http://[::]:${PORT}/metrics`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});