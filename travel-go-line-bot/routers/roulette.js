/* const serviceAccount = require("./travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
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
  console.log(req.body);
  await realtimeDatabase
    .ref(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
      } else {
        console.log("Experience not found");
      }
    });
  if (Random == 1) {
    await realtimeDatabase.ref(`${req.body.userId}`).set({
      exp: (tempExp += 15),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  } else if (Random == 2) {
    await realtimeDatabase.ref(`${req.body.userId}`).set({
      exp: (tempExp += 15),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  } else if (Random == 5) {
    await realtimeDatabase.ref(`${req.body.userId}`).set({
      exp: (tempExp += 10),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  } else if (Random == 8) {
    await realtimeDatabase.ref(`${req.body.userId}`).set({
      exp: (tempExp += 100),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  }
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
 */
