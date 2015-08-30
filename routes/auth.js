'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User').User;

passport.use(
	new FacebookStrategy({
		clientID: '732747833523721',
		clientSecret: '700a52f426328e76098e9d18db62604d',
		callbackURL: 'http://localhost:3001/auth/facebook/callback',
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		// Create an account if we don't have one for them yet,
		// otherwise ensure their information is up to date.
		User.findOneAndUpdate(
			{facebookId: profile.id},
			{
				facebookId: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails && profile.emails[0].value || null,
				pictureUrl: profile.photos && profile.photos[0].value || null
			},
			{upsert: true}
		).then(function(user) {
			done(null, user);
		}, function(err) {
			done(err);
		});
	})
);

passport.serializeUser(function(user, done) {
	console.log('I am for is serialize');
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

router.get('/facebook/login', passport.authenticate('facebook', {scopes: ['email']}));

router.get('/facebook', function(req, res, next) {
	req.session.successUrl = req.query.successUrl;
	res.redirect('facebook/login');
});

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
	if (req.session.successUrl) {
		console.log('SESSION AT THIS POINT', req.session);
		res.redirect(req.session.successUrl);
	} else {
		res.redirect('/users/me');
	}
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
