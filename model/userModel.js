const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require("bcrypt")
const User = new schema({
    name:{type:String},
    email:{type:String},
    mobileNumber:{type:String},
    fullName:{type:String},
    age:{type:Number},
   city:{type:String},
   state:{type:String},
   savePost:[{type:mongoose.Types.ObjectId,ref:"post"}],
   blocked:[{type:mongoose.Types.ObjectId,ref:"user"}],
   totalBlockedUser:{type:Number},
   follower:[{type:mongoose.Types.ObjectId,ref:"user"}],
   followerCount:{type:Number},
   isDeleted:{type:Boolean,default:false},
   password:{type:String},
   creditCardHash:{type:String},
   CvvHash:{type:String},
   referalCode:{type:String},
   day:{type:Number},
   month:{type:Number},
   year:{type:Number},
   userCount:{type:Number},
   otp: { type: Number },
   userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
   mobileOtp:{type:Number}

  })




User.pre("save",async function(next){
  try{
    const salt =await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(this.password,salt)
    this.password=hashPassword      // this password refered to the incoming password from the postman or from the user
    next()
  }
  catch(err){
    console.log(err)
  }
})

User.pre("save",async function(next){
  try{
    const user = this
    const result = await mongoose.model("userModel")
    const user1 =await result.countDocuments()
    user.userCount=user1+1
  }
catch(err){
  console.log(err)
}
})

                                                                                                                                                                                                                                                                                                                                                          
   
const Nam = mongoose.model("userModel",User)
module.exports=Nam