const helpUsModel = require("../model/helpUsModel")


const helpUs = async(req,res)=>{
    try{
        const{question,answer} = req.body;
        const user =await helpUsModel.create({question:question,answer:answer})
        res.json(user)
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {helpUs}