import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`serve listened on ${PORT}`);
});
