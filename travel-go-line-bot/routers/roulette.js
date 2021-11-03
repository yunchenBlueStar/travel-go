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
  res.send({
    status: "success",
    data: Random,
    message: "random",
  });
});

module.exports = router;
