const mongoose = require("mongoose")
const { Schema } = mongoose


const newCeleb= new Schema({

    name:{
       type:  String,
    },   
    occupation:String,
    catchPhrase:String,

})


const Celeb = mongoose.model("Celeb", newCeleb)

module.exports = Celeb


