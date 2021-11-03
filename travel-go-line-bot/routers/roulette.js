const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();

router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;

  await realtimeDatabase
    .ref(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
      } else {
      }
    });
  if (tempExp === undefined) {
    await realtimeDatabase.ref(`${req.body.userId}`).update({
      exp: 0,
    });
  }
  if (Random == 1) {
    await realtimeDatabase.ref(`${req.body.userId}`).update({
      exp: (tempExp += 15),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  } else if (Random == 2) {
    await realtimeDatabase.ref(`${req.body.userId}`).update({
      exp: (tempExp += 15),
    });
    return res.send({
      status: "success",
      data: Random,
    });
  } else if (Random == 5) {
    await realtimeDatabase.ref(`${req.body.userId}`).update({
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
