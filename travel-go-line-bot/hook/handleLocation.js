const client = require("../config/client");
const Haversine = require("./caculate.distance");
const shopData = [
  {
    name: "噹好吃鹹豬肉",
    latitude: 24.6996187,
    longitude: 121.0553976,
  },
  {
    name: "福美軒",
    latitude: 24.7010344,
    longitude: 121.0550215,
  },
  {
    name: "北埔廟前粄條",
    latitude: 24.6996739,
    longitude: 121.0553805,
  },
  {
    name: "姜太公柿餅",
    latitude: 24.6994756,
    longitude: 121.0554569,
  },
  {
    name: "哈客愛擂茶",
    latitude: 24.7008924,
    longitude: 121.0551534,
  },
];
let caculateDistance = [];
let returnMessage = [];
const handleLocation = (message, replyToken) => {
  console.log(message);
  const { latitude, longitude, address } = message;
  for (let i = 0; i < shopData.length; i++) {
    console.log(
      36,
      latitude,
      longitude,
      shopData[i].latitude,
      shopData[i].longitude
    );
    const distance = Haversine(
      latitude,
      longitude,
      shopData[i].latitude,
      shopData[i].longitude
    );
    console.log(43, distance);
    caculateDistance.push({
      name: shopData[i].name,
      distance: distance,
    });
    returnMessage.push({
      type: "text",
      text: `第${
        i + 1
      }個\naddress: ${address}\nlatitude: ${latitude}\nlongitude: ${longitude}\ndistance: ${distance}`,
    });
  }
  // return client.replyMessage(replyToken, {
  //   type: "text",
  //   text: `第${
  //     i + 1
  //   }個\naddress: ${address}\nlatitude: ${latitude}\nlongitude: ${longitude}\ndistance: ${distance}`,
  // });
  console.log(
    55,
    caculateDistance.sort((a, b) => a - b)
  );
  console.log(56, returnMessage);
  // return client.replyMessage(replyToken, returnMessage);
  client.replyMessage(replyToken, returnMessage);
  caculateDistance = [];
  returnMessage = [];
};
module.exports = handleLocation;
