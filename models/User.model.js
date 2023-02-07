const { Schema, model } = require("mongoose");


// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String, 
    unique: true, 
    required: true
  },
  passwordHash: {
    type: String,  
    trim: true, 
    required: true
  }
});

const User = model("User", userSchema);

module.exports = User;
