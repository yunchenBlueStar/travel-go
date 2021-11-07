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
      let isExist = await SearchUserData(doc.id, event.source.userId);
      switch (doc.data().beaconId) {
        case "31":
          if (!isExist) {
            await firestore
              .collection("Shop")
              .doc(doc.id)
              .update({
                userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
              });
          }
          await client.replyMessage(replyToken, {
            type: "image",
            originalContentUrl:
              "https://aws-uploade-image-test2.s3.amazonaws.com/mud_5.png",
            previewImageUrl:
              "https://aws-uploade-image-test2.s3.amazonaws.com/mud_5.png",
          });
          break;
        case "38":
          if (!isExist) {
            await firestore
              .collection("Shop")
              .doc(doc.id)
              .update({
                userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
              });
          }
          break;
        case "41":
          if (!isExist) {
            await firestore
              .collection("Shop")
              .doc(doc.id)
              .update({
                userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
              });
          }
          break;
        case "47":
          if (!isExist) {
            await firestore
              .collection("Shop")
              .doc(doc.id)
              .update({
                userList: admin.firestore.FieldValue.arrayUnion(user), //寫入陣列
              });
          }
          break;
        case "50":
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
