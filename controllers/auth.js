const empty = require("is-empty");


exports.register = function (req, res, next) {

    const { name, email, password, cpassword, remember } = req.body;
    let errors = [];
    if ((!name || empty(name)) || (!email || empty(email)) || (!password || empty(password)) || (!cpassword || empty(cpassword)))
        errors.push({ msg: "Please fill in all fields" })
    if (password != cpassword)
        errors.push({ msg: "passwords dont match" })
    if (password.length < 6) {
        errors.push({ msg: 'password atleast 6 characters' })
    }

    if (errors.length > 0) {
        console.log(remember)
        res.status(400).render("users/register", {
            errors,
            name,
            email,
            password,
            cpassword,
            title: "register page"
        })
    } else
        next();
}


exports.login = (req, res, next) => {
    const { email, password, remember } = req.body;
    let errors = [];
    console.log(email, password)
    if ((!email || empty(email)) || (!password || empty(password)))
        errors.push({ msg: "Please fill in all fields" })
    if (password.length < 6) {
        errors.push({ msg: 'password atleast 6 characters' })
    }
    if (errors.length > 0) {
        res.status(400).render("users/login", {
            errors,
            email,
            password,
            title: "register page"
        })
    } else {
        if (remember) {
            res.cookie(`name`, email, {
                // maxAge: 24 * 60 * 60 * 1000 * 30,
                // expires works the same as the maxAge
                secure: true,
                httpOnly: false,
                sameSite: 'lax'
            });
        } else {
            res.clearCookie("name")
        }
        next();
    }
}