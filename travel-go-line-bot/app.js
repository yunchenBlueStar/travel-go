"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
const p = 1;
// create LINE SDK config from env variables
const config = {
  channelSecret: "e2c64317520995b9f048d68720467b95",
  channelAccessToken:
    "j/jEW9aJJtAJ/1LITYLXp84Up0QZt2uaf75CyxQylJ1FsgSfnsCoepYQX68AS5nEuo6vhbBKk1K5emzwjijRN6CGB0kFvdgC8SD2tnTI2iwi/OW22G3wLBytTmFOK2Mg9+4TpdgybIkw4rHGk/myDgdB04t89/1O/w1cDnyilFU=",
};

// base URL for webhook server
let baseURL = process.env.BASE_URL;

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get("/", async (_, res) => {
  return res.status(200).json({
    status: "success",
    message: "Connected successfully!",
  });
});

// event handler
function handleEvent(event) {
  // if (event.type !== "message" || event.message.type !== "text") {
  //   // ignore non-text-message event
  //   return Promise.resolve(null);
  // }

  // // create a echoing text message
  // const echo = { type: "text", text: event.message.text };

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        case "image":
          return handleImage(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }

  async function handleText(message, replyToken, source) {
    const buttonsImageURL = `${baseURL}/static/buttons/1040.jpg`;

    switch (message.text) {
      case "profile":
        if (source.userId) {
          return client
            .getProfile(source.userId)
            .then((profile) =>
              replyMessage(replyToken, [
                `Display name: ${profile.displayName}`,
                `Status message: ${profile.statusMessage}`,
              ])
            );
        } else {
          return replyMessage(
            replyToken,
            "Bot can't use profile API without user ID"
          );
        }
      case "buttons":
        return client.replyMessage(replyToken, {
          type: "template",
          altText: "Buttons alt text",
          template: {
            type: "buttons",
            thumbnailImageUrl: buttonsImageURL,
            title: "My button sample",
            text: "Hello, my button",
            actions: [
              { label: "Go to line.me", type: "uri", uri: "https://line.me" },
              {
                label: "Say hello1",
                type: "postback",
                data: "hello こんにちは",
              },
              {
                label: "言 hello2",
                type: "postback",
                data: "hello こんにちは",
                text: "hello こんにちは",
              },
              { label: "Say message", type: "message", text: "Rice=米" },
            ],
          },
        });
      default:
        console.log(`Echo message to ${replyToken}: ${message.text}`);
        return await client.replyMessage(replyToken, message.text);
    }
  }
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
