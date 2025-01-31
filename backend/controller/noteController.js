const mongoose = require("mongoose");
const { Note } = require("../models/noteModel.js");


//DeliverNote; 

const deliverNote = async(req, res) => {
  const { message, to } = req.body; 
  if(!message){
    return res.status(400).json({
      success: false,
      message: "Note can't be empty"
    })
  }
  if(!to){
    return res.status(400).json({
      success: false,
      message: "Receiver not found"
    })
  }
  try {
    const newNote = new Note({message, to});
    newNote.save();
    return res.status(201).json({
      success: true,
      message: "Successfully delivered"
    })
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
  
}

const getSpecificNote = async(req, res) => {
  const { noteId } = req.params;
  if(!noteId){
    return res.status(400).json({
      success: false,
      message: "Invalid user or note item"
    })
  }
  try{
    const note = await Note.findOne({ _id: noteId });
    return res.status(200).json({
      note
    });
  }catch(e){
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

const getAllNotes = async(req, res) => {
  const { userId } = req.params; 

  try {
    
    const notes = await Note.find({to: userId});
    
      if(!userId || !notes){
    return res.status(400).json({
      success: false,
      message: "Invalid user or note item"
    })
  }
  
    return res.status(200).json({
      notes
    })
  }catch(e){
  return res.status(500).json({
    success: false,
    message: "Intrnal server error"
  })
  }
}

const readNote = async(req, res) => {
  const { noteId } = req.params;
  await Note.findByIdAndUpdate(noteId, { read: true });
  return;
  
}



module.exports = { deliverNote, getSpecificNote, getAllNotes, readNote };