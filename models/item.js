const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    category:{type: String, required: [true, 'category is required']},
    name:{type: String, required: [true, 'name is required']},
    status:{type: String, required: [true, 'status is required']},
    details:{type: String, required: [true, 'details is required'],
            minLength: [10, 'the content should have atleast 5 characters']},
    image_url:{type: String, required: [false]},
    status:{type:String,default:"Available"},
    author: {type: Schema.Types.ObjectId, ref:'User'},

},
{timestamps: true}
);
//collection name is dresses in the database
module.exports = mongoose.model('Dress', tradeSchema);































// const {v4: uuidv4} = require('uuid');
// //Declaring the default image
// const image = '/images/default_image.jpg';
// //Category List
// const list_of_category = ["Party","Casuals"]
// //list of items that are being used in the website
// const dresses = [
// {
//     id: '1',
//     category:"Casuals",
//     name:"T-Shirts",
//     status:"Available",
//     details:" a style of fabric shirt named after the T shape of its body and sleeves",
//     image_url:"/images/casual.jpg"
// },
// {
//     id: '2',
//     category:"Casuals",
//     name:"Shorts",
//     status:"Available",
//     details:"Mini skirts are the most fashionable skirts of the season",
//     image_url:"/images/casual.jpg"

// },
// {
//     id: '3',
//     category:"Casuals",
//     name:"Maxi-Dress",
//     status:"Not Available",
//     details:"These dresses come in many different styles that can accentuate any body type.",
//     image_url:"/images/casual.jpg"
// },
// {
//     id: '4',
//     category:"Party",
//     name:"Jumpsuit",
//     status:"Not available",
//     details:"the jumpsuit is a popular style that looks chic and trendy with the right styling",
//     image_url:"/images/party.jpg"
// },
// {
//     id: '5',
//     category:"Party",
//     name:"Frock",
//     status:"Available",
//     details:"a gown or dress worn by a girl or woman",
//     image_url:"/images/party.jpg"
// },
// {
//     id: '6',
//     category:"Party",
//     name:"Jeans",
//     status:"Available",
//     details:"Jeans are casual-wear pants typically made from denim fabric.",
//     image_url:"/images/party.jpg"
// }

// ];

// function update()
// {
//     for(let j=0;j<list_of_category.length;j++){
//         let count =0;
//         for(let i=0;i<dresses.length;i++)
//     {
//         if(list_of_category[j]== dresses[i].category)
//         {
//             count++
//         }
//     }
//     if(count==0)
//     {
//         list_of_category.splice(j,1)
//     }
// }
// }

// //Function to get the all the items by returning the dresses array
// exports.find = () => dresses;
// //Function to get the particular item by using the id of the item
// exports.findById = id => {
//    return dresses.find(dress => {
//        return dress.id === id;
//     });
// };
// //Function to get the categories list 
// exports.getcategory = () => {
//     return list_of_category
// };
// //Function to insert the item into the dresses array
// exports.save = function(dress) {
//     dress.id = uuidv4();
//     if(list_of_category.indexOf(dress.category) == -1)
//     {
//         list_of_category.push(dress.category)
//     }
//     dress.image_url=image
//     dresses.push(dress);
// }
// //Function to update the ID by getting the form 
// exports.updateById = function(id, other){
//     let dress = dresses.find(dress => {
//         return dress.id === id;
//     })
//     if (dress){
//         dress.name = other.name;
//         dress.status = other.status;
//         dress.category = other.category;
//         dress.details = other.details;
//         dress.image_url = other.image_url;
//         return true;
//     }else{
//         return false;
//     }
// };

// //Function to delete By ID by getting the id of the 
// //item and deleting the item from the array
// exports.deleteById = function(id) {
//     let index =dresses.findIndex(dress => dress.id === id);
//     if(index !== -1){
//         dresses.splice(index,1);
//         update()
//         return true;
//     }else{
//         return false;
//     }
// }
   