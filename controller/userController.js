;
const userModel  = require("../model/userModel")
const advmodel =require("../model/advmodel")
const bcrypt = require("bcrypt");
const postModel = require("../model/postModel")

const userCreate = async(req,res)=>{
    try{
        const{name,email,city,state,mobileNumber} = req.body;
        const user = await userModel.create({name,email,state,city,mobileNumber})
        res.json(user)
    }
    catch(err){
                console.log(err)
    }
}
const getSingleUser = async(req,res)=>{
    try{
        const{id} = req.body;
        const user = await userModel.findOne({_id:id})
        res.json(user)
    }
    catch(err){
                console.log(err)
    }
}
const getAllUser = async(req,res)=>{
    try{
        const user = await userModel.find({isDeleted:false})
        res.json(user)
    }
    catch(err){
               console.log(err)
    }
}
const getUsers = async(req,res)=>{
    try{
        const user = await userModel.find({},{city:1,state:1})
        res.json(user)
    }
    catch(err){
                console.log(err)
    }
}
const searchUser = async(req,res)=>{
    try{
        const{regex} = req.body;
        const user = await userModel.find({name:{$regex:regex,$options:"i"}})
        res.json(user)
    }
    catch(err){
                 console.log(err)
    }
}
const updateFunction = async(req,res)=>{
    try{
        const {id,city,state} = req.body
        const user = await userModel.updateOne({_id:id},{$set:{city:city,state:state}})
        res.json(user)
    }
    catch(error){
                   console.log(error)
    }
}

const followerCount = async(req,res)=>{
    try{
        const {id,userId} = req.body;
        const user = await userModel.updateOne({_id:id},{$push:{follower:userId},$inc:{followerCount:1}})
        res.json(user)
    }
    catch(err){
               console.log(err)
    }
}

const findFollowing =async(req,res)=>{
    try{
        const{userId}= req.body;
        const user = await userModel.find({follower:userId},{_id:1})
        res.json(user)
    }
    catch(err){
                console.log(err)
    }
}
const unfollow = async(req,res)=>{
    try{
        const{userid,id} = req.body;
        const user = await userModel.updateOne({_id:userid},{$pull:{follower:id},$inc:{followerCount:-1}})
        res.json(user)
    }
    catch(err){
                 console.log(err)
    }
}
const getFollowers = async(req,res)=>{
    try{
        const {userId} = req.body;
        const user = await userModel.find({_id:userId},{follower:1})
        const followerdetails =[];
        for (let i = 0; i <user.length;i++){
           const follow = await userModel.findOne({_id:user.follower[i]},{name:1,email:1})
           followerdetails.push(follow)
            
        } 
           
           res.json(followerdetails) 
     }
    catch(err){
                console.log(err)
              }
}

const blockeduser = async(req,res)=>{
    try{
            const {userid,id} =req.body;
            const user = await userModel.updateOne({_id:userid},{$push:{blocked:id}})//  find userid to blocked another userId 
            res.json(user)
        }
    catch(err){
                 console.log(err)
              }
}
const unBlockeduser = async(req,res)=>{
    try{
            const {id,userid} =req.body;
            const user = await userModel.updateOne({_id:id},{$pull:{blocked:userid}})
            res.json(user)
        }
    catch(err){
                console.log(err)
        }
}
    
const blockedcount = async(req,res)=>{
    try{
            const{id} = req.body;
            const count = await userModel.find({},{blocked:id})
            if (count.length>=2) {
                const data = await userModel.updateOne({_id:id},{$set:{isDeleted:true}})
                res.json(data)
            }
           res.json(blockedcount)
            }
    catch(err){
            console.log(err)
        }
}
const savePost = async(req,res)=>{
    try{
            const{userId,postId}= req.body;
            const user = await userModel.updateOne({_id:userId},{$push:{savePost:postId}})
            res.json(user)
        }
    catch(err){
               console.log(err)
            }
}
const unSavePost = async(req,res)=>{
    try{
        const {userId,postId} = req.body;
        const user = await userModel.updateOne({_id:userId},{$pull:{savePost:postId}})
        res.json(user)
       }
    catch(err){
                console.log(err)
              }
}
const passwordCreate = async(req,res)=>{
    try{
         const{name,email,password,mobileNumber} = req.body;
        
         const  login= await userModel.create({name,email,password,mobileNumber})
         res.json(login)

       }
    catch(err){
                console.log(err)
             }
}
const comparePassword = async(req,res)=>{
     try{
        const {id,password}=req.body;
        const user = await userModel.findOne({_id:id})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
                      res.json("password is incorrect")
                   }
        else{
              res.json("Password is correct")
            }
       
    }
    catch(err){
               console.log(err)
            }
} 
//    const hashCreditCard = async(req,res)=>{
//     try{
//         const{id,creditCardNo,Cvv,email,mobileNumber} = req.body;
//         const user =await userModel.findOneAndUpdate({_id:id},{email:email,mobileNumber:mobileNumber})
//         const creditCardHash = await bcrypt.hash(creditCardNo,10)
//         const CvvHash = await bcrypt.hash(Cvv,10)
//         const creditCard = new userModel({creditCardHash})
//         await creditCard.save()
//         const CvvNo = new userModel({CvvHash})
//         await CvvNo.save()
//         res.json({user,message:"credit card generated successful"})


//     }
//     catch(err){
//         console.log(err);
//     }
//    }
const hashCreditCard = async(req,res)=>{
    try{
           const{id,creditCardNo,Cvv,email,name} = req.body;
           const userValidation =await userModel.findOne({$and:[{email:email},{isDeleted:false}]})
        if (userValidation) {
            const creditNum = await bcrypt.hash(creditCardNo,10)
            const CvvNum = await bcrypt.hash(Cvv,10)
            const details = await userModel.updateOne({_id:id},{$set:{creditCardHash:creditNum,CvvHash:CvvNum}})
            res.json(details)
        }
         else {
                res.json({message:"user doesn't exist"})
            
        }
     
    }
    catch(err){
                console.log(err);
    }
}
       

   const signInEmail = async(req,res)=>{
    try{
         const{id,email,password} = req.body;
         const user = await userModel.findOne({_id:id},{password:1,email:1})  
         
       if(email==user.email){
        const validPassword = await bcrypt.compare(password,user.password)
    
         if(validPassword){
                            res.json("Sign In Succesful")
                         }
           else{
                  res.json("not succesful")
               }
           
       }else{
              res.json("invalid email")
            }
    }
    catch(err){
               console.log(err)
             }
   }
   const sigIn = async(req,res)=>{
        try{
                  const{mobileNumber,email,password}= req.body;
                  const login = await userModel.findOne({$or:[{mobileNumber:mobileNumber},{email:email}]},{password:1})
         if(login) {
                     const comp=await bcrypt.compare(password,login.password)
                    if(comp){  
                                 res.json("Logged in successfully")
                            }
         
                        else{
                                res.json("password incorrect")
                             }  
                    } 
         else{
                 res.json("User doesn't exist, SIGNUP")
            }
        }
        catch(err){
                    console.log(err)
                  }
   }

   const resetPassword = async (req, res) => {
        try {
                const { email, password,newPassword } = req.body;
                const user = await userModel.findOne({ email:email },{password:1});
             if (user) {
                                    const validPassword = await bcrypt.compare(password,user.password)
                       if(validPassword){
                                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                                    user.password = hashedPassword;
                                    await user.save();
                                    res.json({ message: 'Password reset successfully' });
                                    }
                        else{
                            res.json({message:"password mismatch"})
                         }
                        }
                else{
                            res.json({ error: 'User not found' });
                     }
        }
        catch (error) {
                         console.log(error);
                        }
    
    }
    const forgetPassword = async (req, res) => {
        try {
                 const { email, newPassword,confirmPassword } = req.body;
                 const user = await userModel.findOne({ email:email });
                if (!user) {
                             res.json({ error: 'User not found' });
                            }
                else if(newPassword==confirmPassword){
                                                      const hashedPassword = await bcrypt.hash(newPassword, 10);
                                                      user.password = hashedPassword;
                                                      await user.save();
            
                                                      res.json({ message: 'Password reset successfully' });
                                                  }
                                 else{
                                        res.json({message:"password mismatch"})
                                     }
        } 
        catch (error) {
                            console.log(error);
                        }
    }
    const userReferalCode = async (req, res) => {
        try {
                const {name, email, password, fullName, age } = req.body;
                const user = await userModel.create({ name, email, password, fullName, age });
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let generatedReferralCode = '';
             for (let i = 0; i < 6; i++) {
                let randomIndex = Math.floor(Math.random() * characters.length);
                generatedReferralCode += characters[randomIndex];
             }
                 user.referalCode = generatedReferralCode
                await user.save()
                res.json(user);
        } 
        catch (error) {
                          res.json(error)
                       }
    };
    const findCurrentDate =async(req,res)=>{
        try{
            let currentDate =new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth()+1;  // month are zero based so add +1
            let year = currentDate.getFullYear();
            console.log(day)
            console.log(month);
            console.log(year);
   
            const saveDate = await userModel.create({day,month,year})
            res.json(saveDate)
        }
        
        catch(err){
                   console.log(err)
                  }
    }
    const feedPage = async(req,res)=>{
        try{
            const{id}= req.body;
            const userPage=await userModel.findOne({_id:id},{blocked:1,_id:0})
            const postuser= await postModel.find({$and:[{userId:{$nin:userPage.blocked}},{isDeleted:false}]})
            res.json(postuser)

        }
        catch(err){
            console.log(err)
        }
    }
    
 module.exports = {userCreate,getSingleUser,getAllUser,getUsers,searchUser,updateFunction,followerCount,
    findFollowing,unfollow,getFollowers,blockeduser,blockedcount,savePost,unSavePost,unBlockeduser,passwordCreate,
    comparePassword,hashCreditCard,signInEmail,forgetPassword,resetPassword,userReferalCode,findCurrentDate,sigIn,feedPage}