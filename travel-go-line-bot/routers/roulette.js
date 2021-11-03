const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();
const updateData = async (userId, originExp, gainExp) => {
  await realtimeDatabase.ref(`${userId}`).update({
    exp: (originExp += gainExp),
  });
};
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
      }
    })
    .catch((err) => {
      console.log(err);
    });
  switch (Random) {
    case 1:
      updateData(req.body.userId, tempExp, 1);
      break;
    case 2:
      updateData(req.body.userId, tempExp, 2);
      break;
    case 3:
      updateData(req.body.userId, tempExp, 3);
      break;
    case 4:
      updateData(req.body.userId, tempExp, 4);
      break;
    case 5:
      updateData(req.body.userId, tempExp, 5);
      break;
    case 6:
      updateData(req.body.userId, tempExp, 6);
      break;
    case 7:
      updateData(req.body.userId, tempExp, 7);
      break;
    case 8:
      updateData(req.body.userId, tempExp, 8);
      break;
    case 9:
      updateData(req.body.userId, tempExp, 9);
      break;
  }
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
