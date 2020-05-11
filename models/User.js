const mongoose = require('mongoose');

//destructuring assignment. unpack objects or arrays in assignment.
const { Schema } = mongoose;
const userSchema = new Schema({
  googleID: String,
  name: String,
  email: String,
  credits: {type: Number, default: 0}
});

mongoose.model('users', userSchema);
