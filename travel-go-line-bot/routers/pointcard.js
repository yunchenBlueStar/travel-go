const serviceAccount = require("../config/travel-rego-firebase-adminsdk-5yu3d-60f544b0da.json");
const { realtimeDatabase } = require("../config/firestore");
const express = require("express");
const router = express.Router();
router.post("/pointcard", (req, res) => {
  console.log("connect successful");
});
module.exports = router;
