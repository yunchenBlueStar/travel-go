const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const handleEventRouter = require("./public/index");
app.use("/", handleEventRouter);

app.get("/", (req, res) => {
  res.send({
    status: "success",
    message: "ConnectSuccessfully",
  });
});

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
