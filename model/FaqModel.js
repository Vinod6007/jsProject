const mongoose = require("mongoose")
const schema = mongoose.Schema
const User = new schema({
    question:{type:String,require:true},
    answer:{type:String,require:true}
})
const Nam = mongoose.model("Faq",User)
module.exports=Nam