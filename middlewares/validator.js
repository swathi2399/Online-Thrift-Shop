const model = require('../models/item');
const {body} = require('express-validator'); 
const {validationResult} = require('express-validator');

exports.validateId = (req,res,next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid dress id');
        err.status = 400;
        return next(err);
    }else{
        next();
    }
  
}

exports.validateSignUp = [body('firstName','first name cannot be empty').notEmpty().trim().escape(),
body('lastName','last name cannot be empty').notEmpty().trim().escape(),
body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateLogIn = [body('email','Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password','Password must be atleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateDress =[body('name','Name should not be empty').notEmpty().trim().escape(),
body('details','Details must be minimum of 10 characters').isLength({min:10}).trim().escape()]

exports.validateResult = (req,res,next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error=> {
            req.flash('error',error.msg);
        });
        return res.redirect('back'); 
    }else{
        return next();
    }

}


