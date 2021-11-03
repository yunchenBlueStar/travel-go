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
  updateData(req.body.userId, tempExp, 1);
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
