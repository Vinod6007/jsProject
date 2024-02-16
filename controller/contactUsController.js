const contactUsModel = require("../model/contactUsModel")

const contactForm = async(req,res)=>{
    try{
        const{name,email,message} = req.body;
        if(!name||!email||!message){
            res.json({message :"Please fill out of all fields "})
        }
        else{
             const sendMessage = await contactUsModel.create({name:name,email:email,message:message})
             res.json(sendMessage)
            }
    }
    catch(err){
                 console.log(err)
        }
}


module.exports= {contactForm}