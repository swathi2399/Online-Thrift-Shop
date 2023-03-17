const Dress = require('../models/item');
//check if user is a guest

exports.isGuest = (req,res,next) => {
    if(!req.session.user) {
        return next();
    }else {
        req.flash('error','you are logged in already');
        return res.redirect('/users/profile');
       
    }
}    

//check if user is authenticated
exports.isLoggedIn = (req,res,next) => {
    if(req.session.user) {
        return next();
    }else {
        req.flash('error','you need to log in first');
        return res.redirect('/users/login');
       
    }
}

//check if user is author of the story
exports.isAuthor = (req,res,next) => {
    let id = req.params.id;
    Dress.findById(id)
    .then(item => {
        if(item) {
            if(item.author == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorzied to access the resource');
                err.status = 401;
                return next(err); 
                
            }
        }
    })
    .catch(err => next(err)); 

};     