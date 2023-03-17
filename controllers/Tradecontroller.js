const model = require('../models/item')
const like = require('../models/like_feature')
// Function for displaying all the items 
exports.trades = (req,res, next) => {
    model.find()
    .then(items => {
    //     let categories = model.getcategory()
    // context = {
    //     items:items,
        // cat:categories,
        
    // }
    let categories = []
    for(var i=0;i<items.length;i++)
    {
        if(categories.indexOf(items[i].category)==-1)
        {
            categories.push(items[i].category)
            console.log(categories)
        }
    }
    console.log(items,categories)
    context ={
        items:items,
        cat:categories
    }
    return res.render('./trades/trades',{context});

    })
    .catch(err => next(err))
    
};

//Function for displaying the form for creating a new Trade
exports.new = (req,res) => {
    res.render('./trades/newTrade');
};

//Function to get the item from the form and the inserting into the array
exports.create = (req,res,next) => {
    let item = new model(req.body);  // create a new item document
    item.author = req.session.user; 
    if (item.image_url == ""){
        item.image_url ='/images/default_image.jpg';
    }
       
    item.save() // insert the doc to database
    .then(item => {
        //creating the like obj for each object
        let like_dress ={}
        // like_dress.liked_by = req.session.user
        like_dress.like_value = false
        like_dress.dress_id = item._id
        let like_obj = new like(like_dress)
        like_obj.save()
        return res.redirect('/trades')})
    .catch(err => {
        if(err.name === 'ValidationError') {
        req.flash('error','Validation Error')
        res.redirect('back')
        }
        next(err);
    });
};
//Function for showing the particular item from the array
exports.show = (req,res,next) => {
    let id = req.params.id;
    //an objectID is a 24-bit Hex string
    model.findById(id).populate('author', 'firstName lastName')
    .then(item => {
        if(item){
           console.log(req.session.user)
            like.find({dress_id:id,liked_by:req.session.user})
            .then((like_obj)=>{
                if(like_obj.length>0){
                console.log("Inside the like feature")
                console.log(like_obj)
                let like = like_obj[0].like_value
                console.log(like)
                return res.render('./trades/trade',{item,like}); 
                }
                else{
                    let like = false
                    return res.render('./trades/trade',{item,like});
                }
            })
            
        } else{
            let err = new Error('Dress id cannot be seen ' + id); 
        err.status = 404 
        next(err);
        }
    })
    .catch(err => next(err));
    
};
//Function to edit a particular item by passing the data to the form
exports.edit = (req,res,next) => {
    let id = req.params.id;

    model.findById(id)
    .then(item => {
        if(item){
            return res.render('./trades/edit',{item});
        } else{
            let err = new Error('Dress id cannot be seen ' + id); 
        err.status = 404 
        next(err);
        }
    })
    .catch(err => next(err));
    
};
//Function to retrieve the data from the form and changing the particular item
exports.update = (req,res,next) => {
    let item = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, item, {useFindAndModify: false, runValidators: true})
    .then(item => {
        if(item){
            res.redirect('/trades/');
        }else {
            let err = new Error('Dress id cannot be seen ' + id); 
            err.status = 404 
            next(err); 
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError')
        {
            req.flash('error','Validation Error')
            res.redirect('back') 
        }
            next(err);
        });

  
};

//Function to delete a particular item from the array by using the id
exports.delete = (req,res,next) => {
    let id = req.params.id


    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(item => {
        if(item){
            res.redirect('/trades');

        }else{
            let err = new Error('Dress id cannot be seen ' + id); 
            err.status = 404 
            return next(err);

        }
    })
    .catch(err => {
        if(err.name === 'ValidationError')
        {
            req.flash('error','Validation Error')
            res.redirect('back') 
        }
        next(err)
    })

   
};

