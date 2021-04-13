const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const path = require('path');

//Get User model path
const parentDir = path.join(__dirname, '../');
const modelDir = path.join(parentDir, 'server/models/userModel.js');

const User = require(modelDir);

module.exports = function (passport) {
    passport.use(new LocalStrategy({
                    usernameField: 'username'
                }, (username, password, done) => {
                    // Try to find User with username
                    User.findOne({
                        username: username
                    }).then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: "Username does not exist"
                            });
                        }
                        //If here then the user was found, now we try to match passwords
                        bcrypt.compare(password, user.password, async (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);  
                            }
                            else {
                                return done(null, false, {
                                    message: "Incorrect Password"
                                });
                            }
                        });
                    })
                        .catch(err => {
                            console.log(err);
                        })
                })
            );
    // Serialize User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Deserialize User
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}