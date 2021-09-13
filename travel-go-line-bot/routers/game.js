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
    name: "seven-eleven",
    lat: 24.9775727,
    lon: 121.2749167,
  },
  {
    name: "high school",
    lat: 24.9749737,
    lon: 121.2716158,
  },
  {
    name: "85℃",
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
  for (let i = 0; i < dis.length; i++) {
    if (Math.round(dis[i] * 1000) < 100) {
      //小於10公尺顯示
      const userExits = await firestore.collection("Shop").doc("shop1").get();
    }
  }
  /* const docRef = await firestore //消費金額 經驗值增加
    .collection("Shop")
    .doc("shop1 ")
    .collection(`${req.body.userId}`)
    .doc("content")
    .set({
      cost: 1000,
    });
  console.log(docRef); */
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
  //傳入 店家Id & 金額 & 密碼
  realtimeDatabase.ref(`${req.body.userId}`).set({
    exp: 300, //req.body.price
  });
  res.send("success");
});
module.exports = router;
