const line = require("@line/bot-sdk");
const express = require("express");
// const config = require("../config/lineConfig");
const handleEvent = require("../hook/handleEvent");
/* const distance = require("../hook/caculate.distance"); */

const config = {
  channelSecret: "d20aeebc1b2021a09343a85c60e254bf",
  channelAccessToken:
    "bnUx7j7FEWbL1YD8uDfEVdrtrDCTpKIEIHw6uol3wD9PfcnB3lfmPzrMfKHhjhU6JmB2X05dvDYom9xtadLQDAaYQPHdVOnRwr76pOEGY6Do+AOxE1ciaGKQVvKrfqiRM+a2o1qhTG77H4cy6gMXGQdB04t89/1O/w1cDnyilFU=",
};

const router = express.Router();
router.post("/callback", line.middleware(config), (req, res) => {
  console.log(req.body.events);
  // Promise.all(req.body.events.map(handleEvent))
  //   .then((result) => res.json(result))
  //   .catch((err) => {
  //     console.log("error", err);
  //     res.status(500).end();
  //   });
});

module.exports = router;
