const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/userverification", async (req, res) => {
  try {
    const { user_id, user_pass } = req.body;
    const user = await User.findOne({ user_id });
    if (user) {
      if (user.user_id === user_id && user.user_pass === user_pass) {
        return res.json(user_id);
      }
      return res.status(401).send("Authentication Error.");
    }
    return res.status(401).send("No user found.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
