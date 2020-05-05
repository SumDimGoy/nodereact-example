const mongoose = require('mongoose');

//destructuring assignment. unpack objects or arrays in assignment.
const { Schema } = mongoose;
const userSchema = new Schema({
  googleID: String,
  name: String
});

mongoose.model('users', userSchema);
