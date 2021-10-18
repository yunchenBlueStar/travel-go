const serviceAccount = require("./travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const router = express.Router();
router.use(cors());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://travel-rego-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
const realtimeDatabase = admin.database();
const updateData = async (userId, exp) => {
  await realtimeDatabase.ref(userId).set({
    exp: (exp += 100),
  });
};
router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;
  await realtimeDatabase
    .ref(`${req.body.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        tempExp = snapshot.val().exp;
      }
    });
  switch (Random) {
    case 1:
      updateData(req.body.userId, 100);
    case 2:
      updateData(req.body.userId, 10);
    case 3:
      updateData(req.body.userId, 20);
    case 4:
      updateData(req.body.userId, 30);
    case 5:
      updateData(req.body.userId, 40);
    case 6:
      updateData(req.body.userId, 50);
    case 7:
      updateData(req.body.userId, 60);
    case 8:
      updateData(req.body.userId, 70);
    case 9:
      updateData(req.body.userId, 80);
  }

  return res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
