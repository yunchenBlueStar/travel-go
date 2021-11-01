const client = require("../config/client");
const handleLocation = async (message, replyToken) => {
  const { latitude, longitude, address, title } = message;
  return client.replyMessage(replyToken, {
    type: "text",
    text: `title: ${title}\naddress: ${address}\nlatitude: ${latitude}\nlongitude: ${longitude}`,
  });
};

module.exports = handleLocation;
