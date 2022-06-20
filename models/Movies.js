const mongoose = require("mongoose")
const { Schema } = mongoose


const newMovie= new Schema({

    title:String,
    genre:String,
    plot:String,
    cast:{
        type: [Schema.Types.ObjectId],
        ref:"Celeb"
    }

})


const Movie = mongoose.model("Movie", newMovie)

module.exports = Movie