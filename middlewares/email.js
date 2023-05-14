const emailValidator = require("deep-email-validator");


// email validation
const emailVaidation = (async (req, res, next) => {
    if ((/^([a-zA-Z0-9._-]+)@([a-z0-9._-]+)\.([a-z]{2,6})$/).test(req.body.email)) {
        const { valid, reason, validators } = await emailValidator.validate({
            email: req.body.email,
            sender: req.body.email,
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: req.body.email.includes('@gmail.com'),
        });
        if (valid) {
            console.log(valid)
            next();
        } else
            return res.status(400).render("users/register", {
                errors: [{ msg: "Please provide a valid email address." }],
                ...req.body,
                title: 'register page'
            })
    } else
        next();
});



module.exports = emailVaidation;