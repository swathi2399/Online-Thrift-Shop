const dress = require('../models/item');
const cust = require('../models/user');
// const transcations = require('../models/transcations');
const like = require('../models/like_feature')
const transaction = require('../models/transcation');
const { model } = require('mongoose');
const transcation = require('../models/transcation');

exports.offer_function = (req,res,next) => {
    let dress_id = req.params.id
    let buying_user = req.body.buying_user_id
    console.log(dress_id)
    let logged_user = req.session.user
    dress.find({author:logged_user })
    .then((dresses)=> {
    console.log(dresses)
        const dresses1 = dresses.filter(item=>item.status=="Available");
        console.log(dresses1)
        res.render("./trades/offer",{dresses1,dress_id,buying_user});

    })
    .catch(err => next(err));

}

exports.offer_exchange = (req,res,next) => {
    let dress_id = req.body.dress;
    let log_in = req.session.user
    let log_user_item = req.body.author
    let buying_user_id = req.body.buying_user
   
    let buying_item_id = req.body.buying_dress;
    console.log(log_in)
    console.log(buying_user_id)
    let create_transaction = new transaction({logged_user:log_in,buying_user_id:buying_user_id,logged_user_dressId:dress_id,selling_user_dressId:buying_item_id})
    create_transaction.save()
    Promise.all([dress.findOne({_id:dress_id}),dress.findOne({_id:buying_item_id})])
    .then((result)=>{
        console.log(result)
        const dress1= result[0]
        const dress2 = result[1]
        console.log(dress1,dress2)
        dress1.status = "Offer Pending"
        dress2.status="Offer Pending"
        Promise.all([dress.findByIdAndUpdate(dress1._id,dress1), dress.findByIdAndUpdate(dress2._id,dress2)])
        .then((result1)=>{
            res.redirect('/users/profile')
        })
        .catch(err=>next(err))
    })
     

}
exports.remove_transc = async(req,res,next)=>{
    let id = req.params.id;
    let obj = await transaction.findByIdAndUpdate(id)
    if(obj)
    {
        let dress1 = await dress.findOne({_id:obj.logged_user_dressId})
        let dress2 = await dress.findOne({_id:obj.selling_user_dressId})
        dress1.status = "Available"
        dress2.status = "Available"
        await dress.findByIdAndUpdate(dress1._id,dress1)
        await dress.findByIdAndUpdate(dress2._id,dress2)
        await transaction.findByIdAndDelete(obj._id,{useFindAndModify: false})
        res.redirect('/users/profile');

    }

   

}
exports.accept_transc = (req,res,next)=>{
    let trans_id = req.params.id
    console.log(trans_id)
    transaction.findById(trans_id).populate("logged_user_dressId").populate("selling_user_dressId")
    .then((dress_transc)=>{
        console.log("Inside the accept offer")
        console.log(dress_transc)
        let dress1 = dress_transc.logged_user_dressId
        let dress2 = dress_transc.selling_user_dressId
        dress1.status ="Traded"
        dress2.status = "Traded"
        console.log(dress1._id,dress2._id)
        // dress.findById(dress1._id)
        // .then((item)=>{
        //     res.json(item)
        // })
        Promise.all([dress.findByIdAndUpdate({_id:dress1._id},{status:"Traded"},{useFindAndModify: false, runValidators: true}),dress.findByIdAndUpdate({_id:dress2._id},{status:"Traded"},{useFindAndModify: false, runValidators: true})])
        .then((dresses)=>{
            transcation.findByIdAndDelete(trans_id,{useFindAndModify: false})
            console.log(dresses)
            res.redirect('/users/profile')

        })
    })
    .catch(err=>next(err))
}
exports.handling = async(req,res,next)=>{
 let id =  req.params.id;
 let user = req.session.user;
 let flag=0
 let your_trans = await transaction.findOne({logged_user_dressId:id})
 let your_selling_trans = await transaction.findOne({selling_user_dressId:id})
 if(your_trans)
 {  
    let dress1 = await dress.findOne({_id:your_trans.logged_user_dressId})
    let dress2 = await dress.findOne({_id:your_trans.selling_user_dressId})
    console.log(dress1,dress2)
    let transcation_id = your_trans._id
    res.render('./trades/handling',{dress1,dress2,flag,transcation_id});
    
 }
 else
 {
    flag = 1
    let dress1 = await dress.findOne({_id:your_selling_trans.selling_user_dressId})
    let dress2 = await dress.findOne({_id:your_selling_trans.logged_user_dressId})
    let transcation_id = your_selling_trans._id
    res.render('./trades/handling',{dress1,dress2,flag,transcation_id});
    console.log(dress1,dress2)
 }
}



exports.like_function = (req,res,next) =>{
    console.log("Inside the like function");
    let dress_id1 = req.params.id
    let curr_user = req.session.user
    console.log(like)
    let like1 = {}
    like1.liked_by = curr_user
    like1.dress_id = dress_id1
    like1.like_value = true
    like.find({dress_id:dress_id1,liked_by:curr_user})
    .then((like_obj)=>{
        console.log(like_obj)
        if(like_obj.length>0){
        console.log(like_obj[0])
        like_obj[0].like_value = like_obj[0].like_value ? false: true;
        console.log()
        like.findByIdAndUpdate(like_obj[0]._id,like_obj[0],{useFindAndModify: false, runValidators: true})
        .then((ik)=>{
            console.log("Update the status")
            console.log(ik)
            res.redirect('/users/profile');
        })
        .catch(err=>next(err))
       
        }
        else{
            let like_obj = new like(like1)
            like_obj.save()
            .then((like_save)=>{
                    console.log(like_save)
                    res.redirect('/users/profile')

            })
            .catch(err=>next(err))
        }
    })
    .catch(err=>next(err))
}


