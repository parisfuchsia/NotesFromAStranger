const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim:true,
    required: true
  }
},{
  timestamps: true
});

userModel.pre("save", async function(next){
  if(this.isModified("password")){
    
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  }else{
    next(1);
  }
})

userModel.methods.isPasswordsMatch = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("nfasUsers", userModel);

module.exports = { User };







