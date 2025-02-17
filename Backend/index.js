const connectToSQL = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
connectToSQL();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/exchange", require("./routes/exchange"));
app.use("/api/token", require("./routes/token"));

app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `RVesting backend listening on https://localhost:${process.env.PORT}`
  );
});

module.exports = app;
