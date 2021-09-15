"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
// create LINE SDK config from env variables
// const config = {
//   channelSecret: "e2c64317520995b9f048d68720467b95",
//   channelAccessToken:
//     "j/jEW9aJJtAJ/1LITYLXp84Up0QZt2uaf75CyxQylJ1FsgSfnsCoepYQX68AS5nEuo6vhbBKk1K5emzwjijRN6CGB0kFvdgC8SD2tnTI2iwi/OW22G3wLBytTmFOK2Mg9+4TpdgybIkw4rHGk/myDgdB04t89/1O/w1cDnyilFU=",
// };

// base URL for webhook server
// let baseURL = process.env.BASE_URL;

// create LINE SDK client
// create Express app
// about Express itself: https://expressjs.com///
const app = express();
/* app.use(
  cors({
    origin: "*",
    credentials: true,
  })
); */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/downloaded", express.static("downloaded"));
// register a webhook handler with middleware
// about the middleware, please refer to doc

app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

const handleEventRouter = require("./routers/webhook");
app.use("/", handleEventRouter);
const handleGameRouter = require("./routers/game");
app.use("/User", handleGameRouter);
// listen on port..
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
}); //
