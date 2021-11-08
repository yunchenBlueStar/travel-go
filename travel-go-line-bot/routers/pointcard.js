const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { firestore, realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();
router.get("/getResult", async (req, res) => {
  //console.log(req.query.userId);
  let realtimeData;
  let beacon = [];
  const realtimeDatabaseData = await realtimeDatabase //取得現階段使用者exp
    .ref("users")
    .child(`${req.query.userId}`)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        //tempExp = snapshot.val().exp;
        realtimeData = snapshot.val();
      } else {
        console.log("Experience not found");
      }
    });
  const firestoredata = await firestore.collection("Shop").get();
  firestoredata.forEach((doc) => {
    // console.log("userList", doc.data().userList);
    doc.data().userList.forEach((doci) => {
      if (doci.userId == req.query.userId) {
        // console.log(doc.data().beaconId);
        beacon.push(doc.data().beaconId);
      }
    });
  });
  const allData = Object.assign(realtimeData, { beacon });
  console.log(allData);
  res.status(200).send(allData);
});
module.exports = router;
