const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase } = require("../config/firestore");
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
  const { message, userId } = req.body;
  await client.pushMessage(userId, message);
  res.status(200).send("success push message");
});
router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;
  let lotCount = 0;
  const jsonify = JSON.stringify(req.body);
  await realtimeDatabase
    .ref("users")
    .child(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
        lotCount = snapshot.val().lot;
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
