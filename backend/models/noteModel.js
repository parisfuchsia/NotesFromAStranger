const mongoose = require("mongoose");

const noteModel = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  to: {
    type: String,
    ref: "nfasuser",
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Note = mongoose.model("note", noteModel);

module.exports = { Note };