const handleText = require("../hook/handleText");
const handleImage = require("../hook/handleImage");
const client = require("../config/client");
const handleEvent = async (event) => {
  switch (event.type) {
    case "message":
      const message = event.message;
      switch (message.type) {
        case "text":
          return handleText(message, event.replyToken, event.source);
        case "image":
          return client.replyMessage(event.replyToken, {
            type: "text",
            text: "123",
          });
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }
    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
};

module.exports = handleEvent;
