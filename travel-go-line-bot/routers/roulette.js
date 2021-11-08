const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase, firestore } = require("../config/firestore");
const express = require("express");
const router = express.Router();
const client = require("../config/client");
const updateData = async (userId, originExp, lotCount, gainExp) => {
  await realtimeDatabase
    .ref("users")
    .child(`${userId}`)
    .update({
      lot: (lotCount -= 1),
      exp: (originExp += gainExp),
    });
};
router.post("/sendMessage", async (req, res) => {
  const firestoredata = await firestore.collection("LinePoint").get();
  const { message, userId, price } = req.body;
  if (price != "10點LinePoint") {
    await client.pushMessage(userId, message);
  } else {
    firestoredata.forEach(async (doc) => {
      if (doc.data().userId == "") {
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime / 1000);
        await firestore.collection("LinePoint").doc(doc.id).update({
          userId: userId,
          createTime: timestamp,
        });
        await client.pushMessage(userId, {
          type: "text",
          text: `恭喜您獲得 10點LinePoint 進入以下網址即可兌換 ${
            doc.data().url
          }`,
        });
      }
    });
  }
  res.status(200).send("success push messages");
});
router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;
  let lotCount = 0;
  const jsonify = JSON.stringify(req.body);
  await realtimeDatabase
    .ref("LinePoint")
    .child(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
      }
    })
    .catch((err) => {
      console.log(err);
    });
  if (lotCount) {
    switch (Random) {
      case 1:
        //100經驗值
        updateData(req.body.userId, tempExp, lotCount, 100);
        break;
      case 2:
        //再接再厲
        updateData(req.body.userId, tempExp, lotCount, lotCount, 0);
        break;
      case 3:
        //15經驗值
        updateData(req.body.userId, tempExp, lotCount, 15);
        break;
      case 4:
        //精美小禮物
        updateData(req.body.userId, tempExp, lotCount, 0);
        break;
      case 5:
        //15點經驗值
        updateData(req.body.userId, tempExp, lotCount, 15);
        break;
      case 6:
        //10點LinePoint
        updateData(req.body.userId, tempExp, lotCount, 0);
        break;
      case 7:
        //5點經驗值
        updateData(req.body.userId, tempExp, lotCount, 5);
        break;
      case 8:
        //10點LinePoint
        updateData(req.body.userId, tempExp, lotCount, 0);
        break;
      case 9:
        //再接再厲
        updateData(req.body.userId, tempExp, lotCount, 0);
        break;
    }
  } else {
    res.send({
      status: "success",
      data: "沒有輪轉次數",
      message: "random",
    });
  }
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
