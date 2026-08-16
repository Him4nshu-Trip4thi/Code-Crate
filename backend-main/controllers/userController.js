const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const mongoose = require("mongoose");

dotenv.config();

if (!process.env.JWT_SECRET_KEY && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET_KEY must be set in production");
}

function getJwtSecret() {
  return process.env.JWT_SECRET_KEY || "dev_jwt_secret";
}

async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await User.create({
      username,
      email,
      password: hashedPassword,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    });

    const token = jwt.sign({ id: created._id }, getJwtSecret(), { expiresIn: "1h" });
    // set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    // return userId and token for programmatic clients
    res.json({ userId: created._id, token });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).send("Server error");
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "1h" });
    // set httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    res.json({ userId: user._id, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Server error!");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (err) {
    console.error("Error during fetching:", err);
    res.status(500).send("Server error!");
  }
}

async function getUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const user = await User.findById(currentID).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.send(user);
  } catch (err) {
    console.error("Error during fetching:", err);
    res.status(500).send("Server error!");
  }
}

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const updateFields = {};
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(currentID, updateFields, { new: true }).lean();
    if (!updated) return res.status(404).json({ message: "User not found!" });
    res.send(updated);
  } catch (err) {
    console.error("Error during updating:", err);
    res.status(500).send("Server error!");
  }
}

async function deleteUserProfile(req, res) {
  const currentID = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(currentID)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const deleted = await User.findByIdAndDelete(currentID);
    if (!deleted) return res.status(404).json({ message: "User not found!" });
    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error during deleting:", err);
    res.status(500).send("Server error!");
  }
}

async function logout(req, res) {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout error', err);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
