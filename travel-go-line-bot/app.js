"use strict";

const line = require("@line/bot-sdk");
const express = require("express");
// create LINE SDK config from env variables
const config = {
  channelSecret: "e2c64317520995b9f048d68720467b95",
  channelAccessToken:
    "j/jEW9aJJtAJ/1LITYLXp84Up0QZt2uaf75CyxQylJ1FsgSfnsCoepYQX68AS5nEuo6vhbBKk1K5emzwjijRN6CGB0kFvdgC8SD2tnTI2iwi/OW22G3wLBytTmFOK2Mg9+4TpdgybIkw4rHGk/myDgdB04t89/1O/w1cDnyilFU=",
};

// base URL for webhook server
let baseURL = process.env.BASE_URL;

// create LINE SDK client
// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(express.urlencoded({ extended: true }));
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
// event handler
// function handleEvent(event) {
//   // if (event.type !== "message" || event.message.type !== "text") {
//   //   // ignore non-text-message event
//   //   return Promise.resolve(null);
//   // }

//   // // create a echoing text message
//   // const echo = { type: "text", text: event.message.text };

//   // // use reply API
//   // return client.replyMessage(event.replyToken, echo);
//   switch (event.type) {
//     case "message":
//       const message = event.message;
//       switch (message.type) {
//         case "text":
//           return handleText(message, event.replyToken, event.source);
//         case "image":
//           return handleImage(message, event.replyToken);
//         default:
//           throw new Error(`Unknown message: ${JSON.stringify(message)}`);
//       }
//     default:
//       throw new Error(`Unknown event: ${JSON.stringify(event)}`);
//   }

//   async function handleText(message, replyToken, source) {
//     const buttonsImageURL = `https://picsum.photos/200`;

//     switch (message.text) {
//       case "profile":
//         if (source.userId) {
//           return client.getProfile(source.userId).then((profile) =>
//             client.replyMessage(replyToken, {
//               type: "text",
//               text: `Display name: ${profile.displayName}.\nStatus message: ${profile.statusMessage}.`,
//             })
//           );
//         } else {
//           return client.replyMessage(
//             replyToken,
//             "Bot can't use profile API without user ID"
//           );
//         }
//       case "buttons":
//         return client.replyMessage(replyToken, {
//           type: "template",
//           altText: "Buttons alt text",
//           template: {
//             type: "buttons",
//             thumbnailImageUrl: buttonsImageURL,
//             title: "My button sample",
//             text: "Hello, my button",
//             actions: [
//               { label: "Go to line.me", type: "uri", uri: "https://line.me" },
//               {
//                 label: "Say hello1",
//                 type: "postback",
//                 data: "hello こんにちは",
//                 text: "hello こんにちは",
//               },
//               {
//                 label: "言 hello2",
//                 type: "postback",
//                 data: "hello こんにちは",
//                 text: "hello こんにちは",
//               },
//               { label: "Say message", type: "message", text: "Rice=米" },
//             ],
//           },
//         });
//       default:
//         console.log(`Echo message to ${replyToken}: ${message.text}`);
//         return await client.replyMessage(replyToken, {
//           type: "text",
//           text: message.text,
//         });
//     }
//   }
// }

require("./test/test")();

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
