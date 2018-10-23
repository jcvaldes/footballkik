'use strict'

module.exports = function() {
  return {
    SignUpValidation: (req, res, next) => {
      req.checkBody('username', 'Username is Required').notEmpty();
      req.checkBody('username', 'Username Must Not Be Less Than 5').isLength({ min: 5 });
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is Invalid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password', 'Password Must Not Be Less Than 6').isLength({ min: 6 });

      req.getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });
          if (messages.length > 0) {
            req.flash('error', messages);
            // res.redirect('/signup');
          }
          next();
        })
        .catch((err) => {
          return next(err);
        })
    },
    LoginValidation: (req, res, next) => {
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is Invalid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password', 'Password Must Not Be Less Than 6').isLength({ min: 6 });

      req.getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });
          if (messages.length > 0) {
            req.flash('error', messages);
            // res.redirect('/signup');
          }
          next();
        })
        .catch((err) => {
          return next(err);
        })
    }
  }
}