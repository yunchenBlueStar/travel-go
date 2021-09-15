"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
const cors = require("cors");
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
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
