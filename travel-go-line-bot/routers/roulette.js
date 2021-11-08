const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();
const updateData = async (userId, originExp, gainExp) => {
  await realtimeDatabase
    .ref("users")
    .child(`${userId}`)
    .update({
      exp: (originExp += gainExp),
    });
};
router.post("/getResult", async (req, res) => {
  const Random = Math.floor(Math.random() * 9 + 1);
  let tempExp = 0;
  const jsonify = JSON.stringify(req.body);
  await realtimeDatabase
    .ref("users")
    .child(`${req.body.userId}`)
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
      updateData(req.body.userId, tempExp, 15);
      break;
    case 2:
      updateData(req.body.userId, tempExp, 15);
      break;
    case 3:
      updateData(req.body.userId, tempExp, 0);
      break;
    case 4:
      updateData(req.body.userId, tempExp, 0);
      break;
    case 5:
      updateData(req.body.userId, tempExp, 10);
      break;
    case 6:
      updateData(req.body.userId, tempExp, 0);
      break;
    case 7:
      updateData(req.body.userId, tempExp, 5);
      break;
    case 8:
      updateData(req.body.userId, tempExp, 100);
      break;
    case 9:
      updateData(req.body.userId, tempExp, 0);
      break;
  }
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
