const mongoose = require("mongoose")
const schema = mongoose.Schema
const User = new schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    message:{type:String,require:true}




})
const Nam = mongoose.model("contactUs",User)
module.exports=Nam