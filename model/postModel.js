const mongoose = require('mongoose')
const schema = mongoose.Schema
const User = new schema({
    userId:{type:mongoose.Types.ObjectId,ref:"user"},
    title:{type:String},
    url:{type:String},
    description:{type:String},
    comments:[{comment:{type:String},name:{type:String}}],
    report:{type:Number,default:0},
    like:[{type:mongoose.Types.ObjectId,ref:"user"}],
    likeCount:{type:Number},
    isDeleted:{type:Boolean,default:false}
})
const Nam = mongoose.model("postModel",User)
module.exports=Nam
