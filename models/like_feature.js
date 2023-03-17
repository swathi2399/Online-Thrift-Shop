const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const like_featureSchema = new Schema({
        liked_by :{type: Schema.Types.ObjectId, ref:'User',default:null},
        like_value :{type:Boolean,default:false},
        dress_id :{type:Schema.Types.ObjectId,ref:'Dress'}

}
)

module.exports = mongoose.model('like', like_featureSchema);