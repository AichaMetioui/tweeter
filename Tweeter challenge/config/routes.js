const express = require ("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller")
const auth =require ("../middleware/auth")


router.get("/", usercontroller.homePage)


router.post("/", usercontroller.addUser)
//step of log in: 

router.post("/login", usercontroller.login)

// for add tweets input:
router.get("/addTweet", usercontroller.addTweet)
router.post("/addTweet",usercontroller.postTweet)

router.get("/tweet", usercontroller.allTweets)

router.get("/tweet/:id", usercontroller.getFullTweet)

router.post("/tweet/update/:id", usercontroller.updateTweet)

router.get("/tweet/edit/:id", usercontroller.getEditTweetPage)

router.get("/tweet/delete/:id", usercontroller.deleteTweet)












module.exports=router