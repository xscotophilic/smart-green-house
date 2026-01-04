const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// TODO: Uncomment when routes are created
// app.use("/api", require("./routes/api"));
// app.use("/user", require("./routes/user"));
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
