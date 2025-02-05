const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel.js");

//Register
//Login
//Look for session

const register = async(req, res) => {
  const username = req.body.username?.trim()?.toLowerCase();
  const password = req.body.password?.trim()?.toLowerCase();
  
  if(req.userExists){
    return res.status(409).json({
      success: false,
      message: "This username is already taken"
    })
  }
  try {
    
    const newUser = new User({username, password});
     await newUser.save();
     return res.status(201).json({
       success: true,
       message: "Account successfully created"
     })
  }catch(e){
  
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const login = async(req, res) => {
  const username = req.body.username?.trim()?.toLowerCase();
  const password = req.body.password?.trim()?.toLowerCase();
  
  if(username.length < 6 || username.length > 10 || password.length < 6 || password.length > 20 || !req.userExists || (req.userExists && !(await req.userExists?.isPasswordsMatch(password)))){
    return res.status(400).json({
      success: false,
      message: "Invalid username or password"
    })
  }
  
  try {
    
    const token = await jwt.sign({ id: req.userExists._id
  }, process.env.JWT_SECRET, { expiresIn: "30d" });
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 21600000,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  })
   
   return res.status(200).json({
    success: true,
    message: "Logged in successfully"
  })
  
  }catch(e){
    
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const lookForSession = async(req, res) => {
  const token = req.cookies.token;
  if(!token){
  
    return res.status(404).json({
      success: false,
      message: "No token found"
    })
  }
  try {
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userDetail = await User.findById(decoded.id,  "-password -createdAt -updatedAt --v")
    return res.status(200).json({
      success: true,
      userDetail
    })
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}

const getUserById = async(req, res) => {
  const { userId } = req.params; 
  if(!mongoose.Types.ObjectId.isValid(userId)){
  return res.status(404).json({
    success: false,
    message: 'Invalid user or note item'
  })
  }
 try {
   const user = await User.findById(userId, "-password -createdAt -updatedAt --v");
   return res.status(200).json({
     success: true,
     user
   })
 }catch(e){
   return res.status(500).json({
     success: false,
     message: "Internal server error"
   })
 }
 
}

const getUserByName = async(req, res) => {
  const { username } = req.params
  
  try {
    const user = await User.findOne({ username }, "-password -createdAt -updatedAt --v")
    if(!username || !user){
    return res.status(404).json({
      success: false,
      message: "User not found"
    })
  }
   return res.status(200). json ({
     success: true,
     user
   })
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
} 

const handleLogout = (req, res) => {
  
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  });
  return res.status(200).json({
    success: true
  })
}

module.exports = {
  register,
  login,
  lookForSession,
  getUserByName,
  getUserById,
  handleLogout
}
