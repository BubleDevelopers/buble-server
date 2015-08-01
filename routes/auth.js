'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User').User;

passport.use(
	new FacebookStrategy({
		clientID: '412323722284415',
		clientSecret: '42e8a32e0568899cc72747cdd915377f',
		callbackURL: 'http://localhost:3001/auth/facebook/callback',
		passReqToCallback: true
	},
	function(req, accessToken, refreshToken, profile, done) {
		// Create an account if we don't have one for them yet,
		// otherwise ensure their information is up to date.
		console.log('\n=================\nSAVING FACEBOOK SESSION INFORMATION\n=================');
		process.nextTick(function() {
			User.findOneAndUpdate(
				{facebookId: profile.id},
				{
					facebookId: profile.id,
					firstName: profile.name.givenName,
					lastName: profile.name.familyName,
					email: profile.emails && profile.emails[0].value || null,
					pictureUrl: profile.photos && profile.photos[0].value || null,
					accessToken: accessToken
				},
				{upsert: true}
			).then(function(user) {
				done(null, user);
			}, function(err) {
				done(err);
			});
		});
	})
);

passport.serializeUser(function(user, done) {
	console.log('\n=================\nSERIALIZING USER\n=================');
	console.log('Serializing with user ID ' + user.id);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log('\n=================\nDESERIALIZING USER\n=================');
	User.findById(id, function(err, user) {
		console.log('Deserialized user with ID ' + user.id);
		done(err, user);
	});
});

router.get('/facebook', function(req, res, next) {
	req.session.successUrl = req.query.successUrl;
	next();
});

router.get('/facebook', passport.authenticate('facebook', {scopes: ['email']}));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), function(req, res) {
	if (req.session.successUrl) {
		console.log('\n=================\nEXECUTING CALLBACK\n=================');
		console.log('Session at callback', req.session);
		console.log('Session ID: ', req.session.id);
		console.log('isAuthenticated result: ', req.isAuthenticated());
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
