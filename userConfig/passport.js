var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var passport = require('passport'); //i dont think this needs to be here
var randomstring = require("randomstring");

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
		// console.log("This is the user: ", user);
	});

	passport.deserializeUser(function(id, done){
		// console.log("This is the user ID: ", id);
		User.findById(id, function(err, user){
			done(err, user)
		})
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		User.findOne({ email: email }, function(err, user){
			if(err)
				return done(err);
			if(!user)
				return done(null, false, { message: 'We could not find your email address.' });
			if(!user.validPassword(password))
				return done(null, false, { message: 'Wrong password. Try again.'});
			return done(null, user, { message: 'You logged in successfully' });
		});
	}));	


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function(){
			User.findOne({ email: email }, function(err, user){
				if(err)
					return done(err);
				if(user) {
					return done(null, false, { 
            message: 'That email is already taken3' 
          });
				} else {
					var newUser = new User();
          var permalink = email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
          var verificationToken = randomstring.generate({ length: 64 });

          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.user = req.body.user;
          newUser.company = req.body.company;
          newUser.canSubmitAfter = 0;

          newUser.permalink = permalink;
          newUser.verificationToken = verificationToken;
          newUser.verified = false;

          newUser.save(function(err){
            if(err) {
              throw err;
            } else {
            // VerifyEmail.sendverification(email, verification_token, permalink);
            return done(null, newUser, { message: 'You successfully signed up.' });
            }
          })
        }
      });
    });
  }));      
};
