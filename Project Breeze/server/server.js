require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const morgan = require("morgan");
const user = require("./routes/user");
const match = require("./routes/matchDetails");
const admins = require("./routes/admins");
const auth = require("./routes/auth");
const interests = require("./routes/interests");
const reports = require("./routes/reports");
const config = require("config");
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use("/api/user", user);
app.use("/api/match_details", match);
app.use("/api/interests", interests);
app.use("/api/reports", reports);
app.use("/api/admins", admins);
app.use("/api/auth", auth);

if (!config.get("WEB_TOKEN_SECRET")) {
  console.log("FATAL: Web token private key not set!");
  process.exit(1);
}

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// const sslServer = http2.createSecureServer(
//   {
//     key: fs.readFileSync("./openssl/key.pem"),
//     cert: fs.readFileSync("./openssl/certificate.pem"),
//     allowHTTP1: true,
//   },
//   app
// );

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(port, () => {
      // perform a database connection when server starts
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => console.log("Could not connect to MongoDB ", err));
