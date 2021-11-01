const client = require("../config/client");
const firestore = require("../config/firestore");
const handleBeacon = async (source, replyToken) => {
  const firestoreData = await firestore.collection("Shop").get();
  firestoreData.forEach(async (doc) => {
    console.log(doc.data());
  });
  //{ hwid: '0154a2ec89', type: 'enter', dm: '50' } beacon Info
  //   return await client.replyMessage(replyToken, {
  //     type: "text",
  //     text: `hello`,
  //   });
};
module.exports = handleBeacon;
