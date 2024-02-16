const faqModel = require("../model/FaqModel")

const faq = async(req,res)=>{
    try{
        const{question,answer} = req.body;
        if(!question||!answer){
                                res.json({message :"please provide both question and answer"})
            }
        else{
                const user = await faqModel.create({question:question,answer:answer})
                res.json(user)
            }
    }
    catch(err){
                 console.log(err)
    }
}


module.exports = {faq}