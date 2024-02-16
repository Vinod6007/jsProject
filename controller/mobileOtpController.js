const userModel = require("../model/userModel")
const twilio = require("twilio")

const sendOtp = async(req,res)=>{
    try{
        const{userId,mobileNumber} = req.body;
        const OTP =await Math.floor(100000+Math.random()*900000).toString();
        const create=await userModel.create({userId,mobileNumber,mobileOtp:OTP})
        const accountSid ="AC9fe8926ea5270a1f5ca4c732612e7e98"
        const authToken ="f0a47ec8eb17bf31e337fb3ecd4d0fa7"
        const twilioPhoneNumber ="+17079401272"
        const client = twilio(accountSid,authToken)
        const twilioMessage = await client.messages.create({
            body:"your Otp is: "+OTP,
            from:twilioPhoneNumber,
            to:mobileNumber
        })
         res.json(create)
       

    }
    catch(err){
        console.log(err)
    }
}
module.exports={sendOtp}