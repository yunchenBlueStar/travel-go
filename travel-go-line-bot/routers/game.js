const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const distance = require("../hook/caculate.distance");
const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://travel-rego-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
const firestore = admin.firestore();
const realtimeDatabase = admin.database();
const location = [
  {
    name: "shop1",
    lat: 24.9775727,
    lon: 121.2749167,
  },
  {
    name: "shop2",
    lat: 24.9749737,
    lon: 121.2716158,
  },
  {
    name: "shop3",
    lat: 24.9751251,
    lon: 121.2721376,
  },
];

router.post("/position", async (req, res) => {
  //傳入 使用者位置&Id
  //計算 與店家距離 和 進入店家時給予經驗值
  let tempExp;
  let dis = [];
  for (let i = 0; i < location.length; i++) {
    dis.push(
      distance(req.body.lat, req.body.lon, location[i].lat, location[i].lon)
    );
  }
  await realtimeDatabase //取得現階段使用者exp
    .ref(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
      } else {
        console.log("Experience not found");
      }
    });
  for (let i = 0; i < dis.length; i++) {
    //有幾間點 與距離
    if (Math.round(dis[i] * 1000) < 1000) {
      //小於10公尺顯示
      const userExits = await firestore
        .collection("Shop")
        .doc(`${location[i].name}`) //doc(`${location.name}`)
        .get();
      console.log(userExits.id);
      const userData = userExits.data().userId;
      if (userExits.data().userId.indexOf(req.body.userId) === -1) {
        userData.push(req.body.userId);
        await firestore
          .collection("Shop")
          .doc(`${location[i].name}`)
          .update({ userId: userData });
        await realtimeDatabase.ref(`${req.body.userId}`).set({
          exp: (tempExp += 100), //req.body.price
        });
        console.log("add user");
      } else {
        console.log("已取得今日經驗值");
      }
    }
  }
  res.send("success");
});
router.get("/experience", async (req, res) => {
  //前端取得使用者經驗值
  await realtimeDatabase
    .ref(`${req.query.userId}`) //req.param.userId
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        res.send(snapshot.val());
      } else {
        res.send("fail to get exp");
      }
    });
});
router.post("/experience", async (req, res) => {
  //使用者在店家消費金錢
  //傳入 userId 店家Id & 金額 & 密碼
  let tempExp = 0;
  await realtimeDatabase
    .ref(`${req.body.userId}`) //req.param.userId
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
      } else {
        console.log("no data");
      }
    });
  const test = await firestore
    .collection("Shop")
    .where("name", "==", req.body.shopId)
    .get();
  test.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
  const shopData = await firestore
    .collection("Shop")
    .doc(`${req.body.shopId}`)
    .get();
  if (shopData.data().password === req.body.password) {
    //密碼配對
    tempExp = tempExp + parseInt(req.body.price);
    await realtimeDatabase.ref(`${req.body.userId}`).set({
      exp: tempExp, //req.body.price
    });
    res.send({
      status: "success",
      experience: "+ " + req.body.price,
      message: "消費成功!",
    });
  } else {
    res.send("password incorrect");
  }
});
module.exports = router;
