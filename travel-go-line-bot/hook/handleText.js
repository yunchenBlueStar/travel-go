const client = require("../config/client");

const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "送禮自用兩相宜":
      return client.replyMessage(replyToken, {
        type: "text", // ①
        text: "請選擇想要的店家類別",
        quickReply: {
          // ②
          items: [
            // {
            //   type: "action", // ③
            //   imageUrl: "https://example.com/sushi.png",
            //   action: {
            //     type: "message",
            //     label: "Sushi",
            //     text: "Sushi",
            //   },
            // },
            {
              type: "action",
              action: {
                type: "message",
                label: "周邊店家",
                text: "周邊店家",
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
