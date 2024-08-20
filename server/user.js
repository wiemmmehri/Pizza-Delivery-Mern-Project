const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
    cart:[{pizza:String,quantity:Number,username:String,base:String,sauce:String,cheese:String,veggies:String,totalPrice:Number}],
});

const User  = mongoose.model("User", UserSchema);

module.exports = User,UserSchema ;
