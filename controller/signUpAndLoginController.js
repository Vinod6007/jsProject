const bcrypt = require('bcrypt');
const userModel = require("../model/userModel")
const nodemailer = require('nodemailer');




const signup = async (req,res)=>{
  try{
      const {username,password,email} = req.body
  
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const createAcc = await userModel.create({username,password,email,otp:OTP}) 
    
      const transporter = nodemailer.createTransport({
        service:"gmail", // like hot mail,gmail,yahoo
        auth: {
        user: 'vdhagan01@gmail.com',
        pass: 'nwfj gzod hllb zrvb', 
        },
      });


    const mailOptions = {
    from: 'vdhagan01@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: "Your OTP is: " + OTP,
    };

  
    const info = await transporter.sendMail(mailOptions)
    res.json(info.response)
  }

  catch (error){
                  res.json(error);
        } 
}




const login = async(req,res)=>{
  try{
        const {email,password} = req.body
        const user = await userModel.findOne({$and:[{email:email},{isDeleted:false}]})
    if(user){
      
         const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
                          res.json({ error: 'Invalid password' });
                        }
      else{
            res.json({memessage:"login successfully"})
        }
    }
    else{
           res.json({error:"user not found"})
      }
    } 
    catch (error) {
                    console.log(error)
  
          }
}


module.exports={signup,login}
