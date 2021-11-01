const client = require("../config/client");

const handleBeacon = async (source, replyToken) => {
  console.log(source.beacon);
  return await client.replyMessage(replyToken, {
    type: "text",
    text: `hello`,
  });
};
module.exports = handleBeacon;
