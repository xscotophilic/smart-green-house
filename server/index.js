// temp user: 1218e1faabe32bb865209502f8017964
const mongoose = require("mongoose");
const express = require("express");
const keys = require("./config/keys");

// creating app
const app = express();

// connect to the database
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// processing req
app.use(express.json());

// route handlers
app.use("/api", require("./routes/api"));
app.use("/user", require("./routes/user"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// port and listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
