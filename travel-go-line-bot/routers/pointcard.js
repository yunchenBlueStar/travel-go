const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { firestore, realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();
router.get("/getResult", async (req, res) => {
  //console.log(req.query.userId);
  let data;
  const realtimeDatabaseData = await realtimeDatabase //取得現階段使用者exp
    .ref("users")
    .child(`${req.query.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        //tempExp = snapshot.val().exp;
        console.log(snapshot.val());
        data = snapshot.val();
      } else {
        console.log("Experience not found");
      }
    });
  res.status(200).send(data);
});
module.exports = router;
