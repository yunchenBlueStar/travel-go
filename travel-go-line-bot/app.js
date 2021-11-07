"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
const cors = require("cors");
const handleEvent = require("./hook/handleEvent");
const roulette = require("./routers/roulette");
const pointcard = require("./routers/pointcard");
// create LINE SDK config from env variables
const config = {
  channelSecret: "d20aeebc1b2021a09343a85c60e254bf",
  channelAccessToken:
    "bnUx7j7FEWbL1YD8uDfEVdrtrDCTpKIEIHw6uol3wD9PfcnB3lfmPzrMfKHhjhU6JmB2X05dvDYom9xtadLQDAaYQPHdVOnRwr76pOEGY6Do+AOxE1ciaGKQVvKrfqiRM+a2o1qhTG77H4cy6gMXGQdB04t89/1O/w1cDnyilFU=",
};

// base URL for webhook server
// let baseURL = process.env.BASE_URL;

// create LINE SDK client
// create Express app
// about Express itself: https://expressjs.com///

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/roulette", roulette);
app.use("/pointcard", pointcard);
app.post("/callback", (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
app.get("/", (req, res) => {
  res.status(200).send("health");
});
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
