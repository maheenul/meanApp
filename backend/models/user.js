const mongoose = require('mongoose');

// Below is a thirs party package for validating unique in mongoose
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  // unique is only used by mongodb for internal optimmisation, if the data received is unique
  // unique here is NOT a validator for unique
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User',userSchema);
