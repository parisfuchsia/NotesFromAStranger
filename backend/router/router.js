const mongoose = require("mongoose");
const { User } = require("../models/userModel.js");
const { register, handleLogout, login, lookForSession, getUserById, getUserByName } = require("../controller/userController.js");
const {
  getSpecificNote, 
  deliverNote, 
  getAllNotes,
  readNote
} = require("../controller/noteController.js");

const express = require("express");

const router = express.Router();

const checkForContents = async(req, res, next) => {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password.trim();
  
  if(!username || !password){
    return res.status(400).json({
      success: false,
      message: "Please fill up the required fields"
    })
  }
  next();
} 

const checkForExistingUser = async(req, res, next) => {
 const username = req.body.username.trim().toLowerCase();
  try {
    req.userExists = await User.findOne({ username });
    next();
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


//User 
router.post("/register", checkForContents, checkForExistingUser, register);
router.post("/login", checkForContents, checkForExistingUser, login)
router.post("/logout", handleLogout);
router.get("/user/:userId", getUserById);
router.get("/user/name/:username", getUserByName);
router.get("/session", lookForSession);

//Note 

router.post("/new/note", deliverNote);
router.get('/note/one/:noteId', getSpecificNote);
router.get("/note/all/:userId", getAllNotes);
router.put("/update/:noteId", readNote);




module.exports = { router };





