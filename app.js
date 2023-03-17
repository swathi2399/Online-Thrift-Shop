const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
//Including all the Routes that are being used inside the Website.
const tradeRoutes = require('./routes/traderoutes');
const mainRoutes = require('./routes/mainroutes');
const userroutes = require('./routes/userroutes');
const transcationroutes = require('./routes/transcationroutes');



//create app
const app = express();

//configure app
let port = 3001;
let host = 'localhost';
app.set('view engine', 'ejs');

// connect to database
mongoose.connect('mongodb://0.0.0.0:27017/clothing',
                { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    app.listen(port, host, () => {
    console.log('Server is running on port', port);

});
})
.catch(err => console.log(err.message))


// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://0.0.0.0:27017/clothing'}),
        cookie: {maxAge: 60*60*1000}
        })
);

app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});



//Using the mainRoute
app.use('',mainRoutes);
//Using the TradeRoute file here
app.use('/trades', tradeRoutes);
app.use('/users',userroutes);
app.use('/trans',transcationroutes)
//Handling all the error if the given route is not right
app.use((req,res,next)=>{
    let err = new Error('The server cannot locate'+ req.url);
    err.status = 404;
    next(err);
})
//Handling all the internal errors.
app.use((err,req,res,next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ('Internal server error');
    }
    res.status(err.status);
    res.render('error',{error:err});


});

