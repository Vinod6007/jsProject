const advertiserModel= require("../model/advmodel")
const userModel = require("../model/userModel")
const create = async(req,res)=>{
    try{
        const {name,email} = req.body;
        const user = await advertiserModel.create({name:name,email:email})
        console.log(user)
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
}
const follower = async(req,res)=>{
    try{
        const {followId,followingId} = req.body;
        const user = await follower.updateOne({_id:followId},{$push:{follower:followingId},$inc:{followerCount:1}})
        console.log(user)
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
}
// const followCount = async (req,res)=>{
//     try{
//         const{followId,followCount}= req.body;
//         const user = await advertiserModel.updateOne({_id:followId},{$push:{followerCount:followCount}},{$inc:{followerCount:1}})
//         console.log(user)
//         res.json(user) 
//     }
//     catch(err){
//         console.log(err)
//     }
// }
const getFollowers = async(req,res)=>{
    try{
        const {followId} = req.body;
        const user = await advertiserModel.findOne({_id:followId},{follower:1})
        console.log(user.follower.length)
        const followerdetails =[];
        for (let i = 0; i <user.follower.length;i++){
           const follow = await userModel.findOne({_id:user.follower[i]},{name:1,email:1})
           followerdetails.push(follow)
            
           } 
           console.log(followerdetails);
           
           res.json(followerdetails) 
         }
         catch(err){
            console.log(err)
         }
    }
    const blockedfollower = async(req,res)=>{
        try{
            const {followId,followingId} =req.body;
            const user = await advertiserModel.updateOne({_id:followId},{$push:{blocked:followingId}})
            console.log(user)
            res.json(user)
        }
        catch(err){
            console.log(err)
        }
    }
    const unblockedfollower = async(req,res)=>{
        try{
            const{followId,followingId} = req.body;
            const user = await advertiserModel.updateOne({_id:followId},{$pull:{blocked:followingId}})
            console.log(user)
            res.json(user)
        }
        catch(err){
            console.log(err)
        }
    }


//module.exports = {create,follower,getFollowers,blockedfollower,unblockedfollower}