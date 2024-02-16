const mongoose = require("mongoose")
const schema = mongoose.Schema
const User = new schema({
    question:{type:String},
    answer:{type:String}
})
const Nam = mongoose.model("helpUs",User)
module.exports=Nam