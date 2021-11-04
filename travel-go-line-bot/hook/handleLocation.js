const client = require("../config/client");
const Haversine = require("./caculate.distance");
const shopData = [
  {
    name: "噹好吃鹹豬肉",
    latitude: 24.6996187,
    longitude: 121.0553976,
    address: "新竹縣北埔鄉廟前街20之10號",
    image:
      "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E5%99%B9%E5%A5%BD%E5%90%83.jpg?alt=media&token=63649c65-323a-403b-a9ce-97ba2cc6642b",
  },
  {
    name: "福美軒",
    latitude: 24.7010344,
    longitude: 121.0550215,
    address: "新竹縣北埔鄉南興街132號",
    image:
      "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E7%A6%8F%E7%BE%8E%E8%BB%92.jpg?alt=media&token=bfcc1238-40ae-4d2f-b28b-ed37357c4b47",
  },
  {
    name: "北埔廟前粄條",
    latitude: 24.6996739,
    longitude: 121.0553805,
    address: "新竹縣北埔鄉北埔街13號",
    image:
      "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E5%8C%97%E5%9F%94%E5%BB%9F%E5%89%8D%E7%B2%84%E6%A2%9D.jpg?alt=media&token=00340af5-a679-43b7-a7ef-b7491eedb8f3",
  },
  {
    name: "姜太公柿餅",
    latitude: 24.6994756,
    longitude: 121.0554569,
    address: "新竹縣北埔鄉廟前街24號",
    image:
      "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E5%A7%9C%E5%A4%AA%E5%85%AC.png?alt=media&token=7b700f04-6fc9-4803-826a-6fb726fa1fa6",
  },
  {
    name: "哈客愛擂茶",
    latitude: 24.7008924,
    longitude: 121.0551534,
    address: "新竹縣北埔鄉中豐路30號",
    image:
      "https://firebasestorage.googleapis.com/v0/b/travel-rego.appspot.com/o/%E5%93%88%E5%85%8B%E6%84%9B.jpg?alt=media&token=b660c01a-c603-41a8-9f5f-11aa13dd05cc",
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
      image: shopData[i].image,
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
        url: x.image,
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
      contents: returnMessage,
    },
  });
  caculateDistance = [];
  returnMessage = [];
};
module.exports = handleLocation;
