const mSchema = require("../models/firstSchema")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TweetSchema = require("../models/tweetSchema");


const homePage = (req, res) => {
    mSchema.find()
        .then((result) => {
            res.render("page", {
                user: result, // this one
                err: "",
                succes: "",
                loginErr: ""
            })
        })
        .catch((err) => { console.log("error") })


    // ghanbdaw nxofo information d user 
}
// steps of sign up :
const addUser = async (req, res) => {
    console.log(req.body);
    // if the filed are empty
    if (req.body.FirstName === "" || req.body.EmailAdress === "" || req.body.password === "") {
        res.render("page", {
            user: [],
            err: "All field are empty",
            succes: "",
            loginErr: "",
        })

    } // if password short 
    else {
        if (req.body.password.length < 5) {
            res.render("page", {
                user: [],
                err: "password short",
                succes: "",
                loginErr: ""
            })

        }
        //check if email is already exist ?

        else {
            let existuser = await mSchema.findOne({ EmailAdress: req.body.EmailAdress })
            console.log(existuser)
            //now if the user existing or not 
            if (existuser) {
                res.render("page", {
                    user: [],
                    err: "email already exist ",
                    succes: "",
                    loginErr: ""
                })
                //if it not exist we will bcrypt password
                //add bcrypt require inside usercontroller
            } else {
                const hash = bcrypt.hashSync(req.body.password, 10);
                //console to see hashing password 
                console.log(req.body.password);
                console.log(hash);
                if (!hash) {
                    res.render("page", {
                        user: [],
                        err: "something wrong ",
                        succes: "",
                        loginErr: ""
                    })
                    //if email not existing , so save new user 
                } else {
                    let userobj = {
                        ...req.body,
                        password: hash
                    }

                    let newuser = new mSchema(userobj)
                    newuser.save().then(() =>
                        res.render("page", {
                            user: [],
                            err: "",
                            succes: "user has been added you can log in now",
                            loginErr: ""

                        })).catch((error) => {
                            console.log(error)
                        })
                }

            }
        }


    }
}
//
//
//
//steps of log in 
const login = async (req, res) => {
    // if the filed are empty + add an error var :

    console.log(req.body);

    if (req.body.email === "" || req.body.password === "") {
        res.render("page", {
            user: [],
            err: "",
            succes: "",
            loginErr: "All field are empty",
        })
    } else {
        let existuser = await mSchema.findOne({ EmailAdress: req.body.email }) // add sync bellow 
        console.log(existuser)
        //now if the user existing or not 
        if (!existuser) { // if it not exist 
            res.render("page", {
                user: [],
                err: " ",
                succes: "",
                loginErr: "email is not exist pleas sign up"
            })
        } else { // compaire the password:
            //bcrypt.compareSync(someOtherPlaintextPassword, hash)
            let correctpassword = bcrypt.compareSync(req.body.password, existuser.password);
            // if password not correct :
            if (!correctpassword) {
                res.render("page", {
                    user: [],
                    err: " ",
                    succes: "",
                    loginErr: "wrong password!"
                })
            }
            else {
                let UserDataForToken = {
                    id: existuser._id,
                    username: existuser.username,
                    email: existuser.email
                }
                // CREAT USER TOKEN:
                let userToken = await jwt.sign({ UserDataForToken }, "this is a secret key ")
                res.cookie("userToken", userToken);
                res.redirect("/addTweet");

            }
        }
    }
}






const addTweet = (req, res) => {
    res.render("addTweet")
}









const postTweet = (req, res) => {
    let tweet = new TweetSchema(req.body)
    const { Title, Tweet } = req.body;
    // validation :
    if (!Title || Title.length < 20) {
        return res.send("Title is required and should be a minimum of 25 characters.");
    }

    if (!Tweet || Tweet.length < 100) {
        return res.send("Tweet is required and should be a minimum of 100 characters.");
    }
    tweet.save()
        .then(() => {
            console.log("yes it's done")
            res.redirect("/tweet")

        })
        .catch(() => {
            console.log("not")
        })
}


// send articles to allarticle page:

const allTweets = (req, res) => {
    TweetSchema.find()
        .then(result => {
            res.render("allTweets", {
                tweets: result
            }
            )
        })
        .catch(() => { console.log("error") })
}

const getFullTweet = (req, res) => {
    console.log("Get request for full tweet page sent");
    TweetSchema
        .findById(req.params.id)
        .then((result) => {
            res.render("fullTweet", {
                tweet: result,
            });
        })
        .catch((err) => {
            console.error(err);
        });
}

const updateTweet = (req, res) => {
    console.log("Request to update twet sent.");
    TweetSchema
        .findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.render("fullTweet", {
                tweet: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const getEditTweetPage = (req, res) => {
    console.log("Get req for edit tweet page sent.", req.body);
    TweetSchema
        .findById(req.params.id)
        .then((result) => {
            res.render("editTweet", {
                tweet: result,
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const deleteTweet = (req, res) => {
    console.log("Request to delete article has been sent");
    TweetSchema
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/tweet");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    homePage,
    addUser,
    login,
    addTweet,
    postTweet,
    allTweets,
    getFullTweet,
    updateTweet,
    getEditTweetPage,
    deleteTweet
}