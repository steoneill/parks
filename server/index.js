const express = require("express"),
  app = express();

app.get("/", (req, res) => {
  res.send("working");
});

app.listen("8000", () => {
  console.log("server starting on 8000");
});
