const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // folder to save files
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp + original name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter for images only
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
}

// Initialize multer upload middleware
const upload = multer({ storage, fileFilter });

// Example route to upload a photo during signup or profile update
router.post('/upload-photo/:userId', upload.single('photo'), async (req, res) => {
  try {
    // req.file contains info about uploaded file
    if (!req.file) {
      return res.status(400).send('No file uploaded or wrong file type');
    }

    // Save photo URL (relative path) to user document in DB
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');

    user.photoUrl = `/uploads/${req.file.filename}`; // save relative path like 'uploads/1627384abc.jpg'
    await user.save();

    res.json({ message: 'Photo uploaded successfully', photoUrl: user.photoUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
