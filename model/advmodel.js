const mongoose = require('mongoose')
const schema = mongoose.Schema
    const User = new  schema({
        name:{type:String},
        email:{type:String},
        blocked:[{type:mongoose.Types.ObjectId,ref:"user"}],
        follower:[{type:mongoose.Types.ObjectId,ref:"user"}],
        followerCount:{type:Number}
})
const Nam = mongoose.model("advertiser",User)
 module.exports = Nam