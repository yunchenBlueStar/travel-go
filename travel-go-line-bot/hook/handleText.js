const client = require("../config/client");

const handleText = async (message, replyToken, source) => {
  switch (message.text) {
    case "旅遊回憶":
      return client.replyMessage(replyToken, {
        type: "text", // ①
        text: "請選擇要製作的旅遊回憶模板",
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
                label: "老街路線",
                text: "老街路線",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "網美路線",
                text: "網美路線",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "節慶路線",
                text: "節慶路線",
              },
            },
          ],
        },
      });
    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      return await client.replyMessage(replyToken, {
        type: "text",
        text: message.text,
      });
  }
};

module.exports = handleText;
