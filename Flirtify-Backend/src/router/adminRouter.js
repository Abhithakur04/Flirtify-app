const express = require("express");
const adminRouter = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const User = require("../models/user");

// Admin-only route example: get all users


// 1. Get all users
adminRouter.get("/users", adminAuth, async (req, res) => {
  try {
   const users = await User.find({ _id: { $ne: req.user._id } });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Get user by id
adminRouter.get("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Update user by id
adminRouter.put("/users/:id", adminAuth, async (req, res) => {
  try {
    // List fields admin can update
    const allowed = ["firstName", "lastName", "age", "gender", "skills", "photoUrl", "about"];

    // Create empty object to hold valid updates
    let updates = {};

    // Check each allowed field, if admin sent it, add to updates
    allowed.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // If no fields to update, return error
    if (Object.keys(updates).length === 0) {
      return res.status(400).send("No valid fields to update");
    }

    // Update user in DB
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).send("User not found");

    res.send({ message: "User updated", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// 4. Delete user by id
adminRouter.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = adminRouter;
