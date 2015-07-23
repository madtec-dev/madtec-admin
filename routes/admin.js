var express = require('express');
var router = express.Router();
var passport = require('passport');
var email = require('.././config/email.js');
//require('.././config/passport')(passport);
  
// GET ADMIN HOME ===================================
router.get('/', isLoggedIn, function(req, res) {
  res.render('admin/dashboard', {layout: 'admin'});
});
// LOGIN ======================================
router.get('/login', function(req, res) {
  if(req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('admin/login', {layout: 'admin', message: req.flash('loginMessage') });
  }
});
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',

  failureFlash: true
}));

// SIGNUP =======================================
router.get('/signup', function(req, res) {
  if(req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('admin/signup', {layout: 'admin', message: req.flash('signupMessage') });
  }
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/admin',
  failureRedirect: '/admin/signup',

  failureFlash: true
}));
// LOGOUT ========================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/email', isLoggedIn, function(req, res) {
  console.log(req.body.guests);
  var guests = req.body.guests + '';
  email.transport.sendMail(email.mailOptions(guests, 
                                             req.body.subject, 
                                             req.body.text), 
    function(err) {
      if(err) {
        res.status(500);
        res.send('Error sending email: ' + err);
      } else {
        res.send('Email sent!');
      } 
    });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.render('admin/login', {layout: 'admin', message: 'You need to login'});
}
module.exports = router;
