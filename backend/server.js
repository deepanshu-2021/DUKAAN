import express from "express";
const app = express();
let port=5000
app.get("/", (req, res) => {
  res.send("hello mom");
});
app.listen(port, () => {
  console.log(`server on port ${port}`);
});
