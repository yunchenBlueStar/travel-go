const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { firestore } = require("../config/firestore");
const express = require("express");
const router = express.Router();
router.post("/pointcard", async (req, res) => {
  const firestoreData = await firestore.collection("Users").get();
  //   firestoreData.forEach(async (doc) => {
  //   })
});
module.exports = router;
