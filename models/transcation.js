const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transcationSchema = new Schema({
    logged_user :{type:Schema.Types.ObjectId,ref:'User'},
    buying_user_id:{type:Schema.Types.ObjectId,ref:'User'},
    logged_user_dressId:{type:Schema.Types.ObjectId,ref:'Dress'},
   selling_user_dressId:{type:Schema.Types.ObjectId,ref:'Dress'}
})
module.exports = mongoose.model('Transcation',transcationSchema);