const serviceAccount = require("./travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://travel-rego-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
const realtimeDatabase = admin.database();

router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;

  // await realtimeDatabase
  //   .ref(`${req.body.userId}`)
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       tempExp = snapshot.val().exp;
  //     }
  //   });
  // await realtimeDatabase.ref(`${req.body.userId}`).update({
  //   exp: (tempExp += 100),
  // });

  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
