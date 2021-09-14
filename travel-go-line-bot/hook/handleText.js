const client = require("../config/client");

const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "  ":
      return client.replyMessage(replyToken, {
        type: "text", // ①
        text: "請選擇想要的店家類別",
        quickReply: {
          // ②
          items: [
            {
              type: "action",
              action: {
                type: "uri",
                label: "周邊店家",
                uri: "https://line.me/R/nv/location/",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "精選店家",
                text: "精選店家",
              },
            },
          ],
        },
      });
    case "周邊店家":
      return client.replyMessage(replyToken, {});
    case "精選店家":
      return client.replyMessage(replyToken, {});
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return await client.replyMessage(replyToken, {
        type: "text",
        text: message.text,
      });
  }
};

module.exports = handleText;
