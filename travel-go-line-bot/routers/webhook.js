const line = require("@line/bot-sdk");
const express = require("express");
const config = require("../config/lineConfig");
const handleEvent = require("../hook/handleEvent");
const distance = require("../hook/caculate.distance");
const router = express.Router();
router.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
router.get("/getPosition", (req, res) => {
  const dis = distance(
    req.query.lat,
    req.query.lon,
    req.query.shoplat,
    req.query.shoplon
  );

  if (dis < 0.005) {
    //5公尺內
    console.log("get in store");
  }
  res.status(200).send({ dis });
});

module.exports = router;
