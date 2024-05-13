const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 3000;

app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));
app.use("/stripe", require("./stripe"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
