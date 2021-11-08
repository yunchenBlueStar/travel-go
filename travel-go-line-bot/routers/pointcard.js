const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { firestore } = require("../config/firestore");
const express = require("express");
const router = express.Router();
router.get("/getResult", async (req, res) => {
  console.log(req.params.userId);
  res.status(200).send("success");
});
module.exports = router;
