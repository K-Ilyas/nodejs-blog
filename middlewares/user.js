const User = require("../models/user");
const bcrypt = require("bcrypt")
const saltRounds = 10;



function create_user({ name, email, password, cpassword }, done) {
    User.findOne({
        $or: [
            { 'email': email },
            { 'name': name }
        ]
    })
        .then(user => {
            if (user) {
                done({ errors: [{ msg: email === user.email ? 'email already registered' : 'name already registered' }], name, email, password, cpassword });
            } else {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    if (err)
                        done({ errors: [{ msg: "something went wrong!" }], name, email, password, cpassword });
                    else
                        bcrypt.hash(password, salt, function (err, hash) {
                            if (err)
                                done({ errors: [{ msg: "something went wrong!" }], name, email, password, cpassword });
                            else {
                                const user = new User({ name, email, password: hash })
                                user.save()
                                    .then(user => done(null, user))
                                    .catch(error => {
                                        done({ errors: [{ msg: "something went wrong!" }], name, email, password, cpassword })
                                    })
                            }
                        });

                });

            }
        })
        .catch(err => done({ errors: [{ msg: "something went wrong!" }], name, email, password, cpassword }))
}



exports.create_user = create_user