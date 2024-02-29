// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import currencyRouter from "./currency/router";

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 3000;

app.get("/health-check", (req: Request, res: Response) => {
  res.send("health check OK");
});

app.use(currencyRouter);

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
