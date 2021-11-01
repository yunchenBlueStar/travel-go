const client = require("../config/client");
const firestore = require("../config/firestore");
const admin = require("firebase-admin");
const handleBeacon = async (event, replyToken) => {
  const firestoreData = await firestore.collection("Shop").get();
  firestoreData.forEach(async (doc) => {
    switch (doc.data().beaconId) {
      case "50":
        const user = [
          {
            userId: event.source.userId,
            creatTime: event.timestamp,
          },
        ];
        await firestore
          .collection("Shop")
          .doc(doc.id)
          .update({
            userList: admin.firestore.FieldValue.arrayUnion(
              "south_carolina",
              "texas"
            ),
          });

      case "72":
        break;
    }
  });
  //{ hwid: '0154a2ec89', type: 'enter', dm: '50' } beacon Info
  //   return await client.replyMessage(replyToken, {
  //     type: "text",
  //     text: `hello`,
  //   });
  // {
  //     beaconId: '50',
  //     coordinates: GeoPoint { _latitude: 24.6994863, _longitude: 121.0570292 },
  //     password: 'JD',
  //     userList: {
  //       JIIWEOJ234234: {
  //         Img: 'imgURL',
  //         name: '王大明',
  //         createTime: [Timestamp],
  //         displayName: '王大明明'
  //       }
  //     },
  //     name: '粄條'
  //   }
};
module.exports = handleBeacon;
