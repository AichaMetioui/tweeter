function userlogin(req, res, next) {
    if (!req.cookies.usertoken) {
        res.redirect("/")
    } else {
        next();
    }
}

function loginauth(req, res, next) {
    if (req.cookies.usertoken) {
        res.redirect("/login")
    } else {
        next();
    }
}

module.exports = {
    userlogin,
    loginauth
}