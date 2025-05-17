const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    const { user, password, isLoggingIn } = req.body;

    if (isLoggingIn) {
      const client = await User.findOne({ email: user }).lean();

      if (!client) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'User login successfully' });
    } else {
      const client = await User.create({ email: user, password });

      await client.save();
      res.status(200).json({ message: 'User registered successfully' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;