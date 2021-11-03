const client = require("../config/client");
const Haversine = require("./caculate.distance");
const handleLocation = async (message, replyToken) => {
  console.log(message);
  const { latitude, longitude, address } = message;
  return client.replyMessage(replyToken, {
    type: "text",
    text: `address: ${address}\nlatitude: ${latitude}\nlongitude: ${longitude}`,
  });
};

module.exports = handleLocation;
