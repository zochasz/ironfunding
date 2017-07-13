const express        = require("express");
const router = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup'
}));

// router.post("/signup", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const email = req.body.email;
//   const description = req.body.description;
//   const imgurl = req.body.imgurl;
//
//   if (username === "" || password === "") {
//     res.render("auth/signup", {
//       errorMessage: "Indicate a username and a password to sign up"
//     });
//     return;
//   }
//
//   User.findOne({ "username": username },
//     "username",
//     (err, user) => {
//       if (user !== null) {
//         res.render("auth/signup", {
//           errorMessage: "The username already exists"
//         });
//         return;
//       }
//
//       const salt = bcrypt.genSaltSync(bcryptSalt);
//       const hashPass = bcrypt.hashSync(password, salt);
//
//       new User({
//         username: username,
//         password: hashPass,
//         email: email,
//         description: description,
//         imgurl: imgurl
//
//       }).save((err) => {
//         if (err) {
//           res.render("auth/signup", {
//             errorMessage: "Something went wrong"
//           });
//         } else {
//           res.redirect("/login");
//         }
//       });
//     })
// });

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
//
//
//
// router.get("/logout", (req, res, next) => {
//   if (!req.session.currentUser) { res.redirect("/"); return; }
//
//   req.session.destroy((err) => {
//     if (err) {
//       console.log (err);
//     } else {
//       res.redirect ("/index");
//     }
//   });
// });

module.exports = router;
