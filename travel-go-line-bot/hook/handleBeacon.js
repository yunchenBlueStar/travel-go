const client = require("../config/client");
const { firestore } = require("../config/firestore");
const admin = require("firebase-admin"); //arrayUnion 一定要從admin崁入
const handleBeacon = async (event, replyToken) => {
  const firestoreData = await firestore.collection("Shop").get();
  firestoreData.forEach(async (doc) => {
    const user = {
      userId: event.source.userId,
      creatTime: event.timestamp,
    };
    if (event.beacon.dm === doc.data().beaconId) {
      switch (doc.data().beaconId) {
        case "31":
          console.log(event);
          // return client.replyMessage(replyToken, {
          //   type: "text",
          //   text: `This is beacon ${event.beacon.dm}`,
          // });
          break;
        case "38":
          console.log(event);
          // return client.replyMessage(replyToken, {
          //   type: "text",
          //   text: `This is beacon ${event.beacon.dm}`,
          // });
          break;
        case "41":
          console.log(event);
          // return client.replyMessage(replyToken, {
          //   type: "text",
          //   text: `This is beacon ${event.beacon.dm}`,
          // });
          break;
        case "47":
          console.log(event);
          // return client.replyMessage(replyToken, {
          //   type: "text",
          //   text: `This is beacon ${event.beacon.dm}`,
          // });
          // return client.replyMessage(replyToken, {
          //   type: "text",
          //   text: event,
          // });
          break;
        case "50":
          const isExist = await SearchUserData(doc.id, event.source.userId);
          if (!isExist) {
            await firestore
              .collection("Shop")
              .doc(doc.id)
              .update({
                userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
              });
          }
          break;
      }
    }
  });
};
const SearchUserData = async (docId, userId) => {
  const firestoreData = await firestore
    .collection("Shop")
    .doc(`${docId}`)
    .get();
  let isExist = false;
  firestoreData.data().userList.forEach((doc) => {
    if (userId === doc.userId) {
      isExist = true;
    }
  });
  return isExist;
};
module.exports = handleBeacon;
