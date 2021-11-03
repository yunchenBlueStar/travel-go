const client = require("../config/client");
const Haversine = require("./caculate.distance");
const shopData = [
  {
    name: "噹好吃鹹豬肉",
    latitude: 24.6996187,
    longitude: 121.0553976,
    address: "新竹縣北埔鄉廟前街20之10號",
  },
  {
    name: "福美軒",
    latitude: 24.7010344,
    longitude: 121.0550215,
    address: "新竹縣北埔鄉南興街132號",
  },
  {
    name: "北埔廟前粄條",
    latitude: 24.6996739,
    longitude: 121.0553805,
    address: "新竹縣北埔鄉北埔街13號",
  },
  {
    name: "姜太公柿餅",
    latitude: 24.6994756,
    longitude: 121.0554569,
    address: "新竹縣北埔鄉廟前街24號",
  },
  {
    name: "哈客愛擂茶",
    latitude: 24.7008924,
    longitude: 121.0551534,
    address: "新竹縣北埔鄉中豐路30號",
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
      address: shopData[i].address,
    });
  }
  // return client.replyMessage(replyToken, {
  //   type: "text",
  //   text: `第${
  //     i + 1
  //   }個\naddress: ${address}\nlatitude: ${latitude}\nlongitude: ${longitude}\ndistance: ${distance}`,
  // });
  caculateDistance.sort((a, b) => a.distance - b.distance);
  caculateDistance.forEach((x, index) => {
    returnMessage.push({
      type: "bubble",
      hero: {
        type: "image",
        url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: x.name,
            weight: "bold",
            size: "xl",
            contents: [],
          },
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "店家地址",
                    size: "sm",
                    color: "#AAAAAA",
                    flex: 2,
                    contents: [],
                  },
                  {
                    type: "text",
                    text: x.address,
                    size: "sm",
                    color: "#666666",
                    flex: 5,
                    wrap: true,
                    contents: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
  console.log(56, returnMessage);
  // return client.replyMessage(replyToken, returnMessage);
  client.replyMessage(replyToken, {
    type: "flex",
    altText: "旅Go 周邊店家",
    contents: {
      type: "carousel",
      contents: [returnMessage],
    },
  });
  caculateDistance = [];
  returnMessage = [];
};
module.exports = handleLocation;
