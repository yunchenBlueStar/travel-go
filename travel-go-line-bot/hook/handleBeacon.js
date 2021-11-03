const client = require("../config/client");
const firestore = require("../config/firestore");
const admin = require("firebase-admin"); //arrayUnion 一定要從admin崁入
const handleBeacon = async (event, replyToken) => {
  const firestoreData = await firestore.collection("Shop").get();
  firestoreData.forEach(async (doc) => {
    switch (doc.data().beaconId) {
      case "50":
        const user = {
          userId: event.source.userId,
          creatTime: event.timestamp,
        };
        const isExist = await searchUserData(doc.id, event.source.userId);

        if (!isExist) {
          console.log(isExist);
          await firestore
            .collection("Shop")
            .doc(doc.id)
            .update({
              userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
            });
        }
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
const searchUserData = async (docId, userId) => {
  const firestoreData = await firestore
    .collection("Shop")
    .doc(`${docId}`)
    .get();
  let defineRepeat = 0;
  console.log(firestoreData.data().userList);
  console.log(firestoreData.data().userList.length);
  firestoreData.data().userList.forEach((doc) => {
    console.log(doc.userId);
    if (userId === doc.userId) {
      defineRepeat++;
    }
  });
  if (defineRepeat == 1) {
    return true;
  } else {
    return false;
  }
};
module.exports = handleBeacon;
