 // 1.import mongoose
 const mongoose=require("mongoose");
 //2.state connection string via mongoose
 mongoose.connect('mongodb://localhost:27017/Anime',
 {
useNewUrlParser:true
 });

 //define bank db model
 const User=mongoose.model('user',
 {
    //Schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
 })

 // manga modal
const Manga=mongoose.model('manga',{
   id:Number,
   name:String,
   description:String,
   rating:String,
   episode:Number,
   categorie:String,
   studio:String,
   img:String
})

 //Export collection
 module.exports={
    User,
    Manga
 }