const usercontroller = require("../controller/userController")
const advController =require("../controller/advController")
const postcontroller = require("../controller/postController")
const contactUsController = require("../controller/contactUsController")
const helpUsController = require("../controller/helpUsController")
const FaqController = require("../controller/FaqController") 
const signUpAndLoginController = require("../controller/signUpAndLoginController")
const mobileOtpController = require("../controller/mobileOtpController")
const bcrypt = require("bcrypt")

const express = require("express")

const router = express.Router()



router.post("/userCreate",usercontroller.userCreate)
router.post("/getSingleUser",usercontroller.getSingleUser)
router.post("/getAllUser",usercontroller.getAllUser)
router.post("/getUsers",usercontroller.getUsers)
router.post("/searchUser",usercontroller.searchUser)
router.post("/updateFunction",usercontroller.updateFunction)
router.post("/followerCount",usercontroller.followerCount)
router.post("/findFollowing",usercontroller.findFollowing)
router.post("/unfollow",usercontroller.unfollow)
router.post("/getFollowers",usercontroller.getFollowers)
router.post("/blockeduser",usercontroller.blockeduser)
router.post("/blockedcount",usercontroller.blockedcount)
router.post("/savePost",usercontroller.savePost)
router.post("/unSavePost",usercontroller.unSavePost)
router.post("/passwordCreate",usercontroller.passwordCreate)
router.post("/comparePassword",usercontroller.comparePassword)
router.post("/hashCreditCard",usercontroller.hashCreditCard)
router.post("/signInEmail",usercontroller.signInEmail)

router.post("/contactForm",contactUsController.contactForm)
router.post("/helpUs",helpUsController.helpUs)
router.post("/faq",FaqController.faq)

router.post("/forgetPassword",usercontroller.forgetPassword)
router.post("/resetPassword",usercontroller.resetPassword)
router.post("/userReferalCode",usercontroller.userReferalCode)
router.post("/findCurrentDate",usercontroller.findCurrentDate)
router.post("/sigIn",usercontroller.sigIn)
router.post("/feedPage",usercontroller.feedPage)

//post create 
router.put("/createPost",postcontroller.createPost)
router.post("/reportPost",postcontroller.reportPost)
router.post("/showReportPost",postcontroller.showReportPost)
router.post("/ShowAllPost",postcontroller.ShowAllPost)
router.put("/createComments",postcontroller.createComments)
router.post("/showComments",postcontroller.showComments)
router.post("/deleteParticularComment",postcontroller.deleteParticularComment)
router.post("/unLike",postcontroller.unLike)
router.post("/likeCount",postcontroller.likeCount)
router.post("/getTrendingUrl",postcontroller.getTrendingUrl)
router.put("/update",postcontroller.update)

//sigUpAndLogin
router.post("/signup",signUpAndLoginController.signup)
router.post("/login",signUpAndLoginController.login)

router.post("/sendOtp",mobileOtpController.sendOtp)






module.exports=router