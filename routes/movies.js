var express = require('express');
var router = express.Router();
const Celeb =require("../models/Celebrity")
const Movie =require("../models/Movies")

router.get('/movies/create', async(req, res, next) => {
  try{
    const celebs = await Celeb.find({})
  res.render("movies/newMovie", {celebs})
  }
  catch(e){
    next(e)
  }  
})

router.post("/movies/create", async(req,res,next)=>{
    const {title, genre, plot, cast} = req.body
    try{
        await Movie.create(  {title, genre, plot, cast})
        res.redirect("/movies/movies")
    }
    catch(err){
        res.redirect("/movies/movies/create")
    }
})

router.get('/movies', async (req, res, next) => {
   try{ 
    const allMovies = await Movie.find({})
    res.render("movies/movies", {allMovies})
  }
  catch(err) { 
      next(err)
  }
})

router.get('/movies/:id/', async (req, res, next) => {
    const {id} =req.params
    try{ 
      const movie = await Movie.findById(id).populate("cast")   
      res.render("movies/infoMovie", movie)
  }
  catch(err) { 
      next(err)
  }
})

router.post("/movies/:id/delete", async (req, res, next)=>{
  const { id }= req.params
  console.log(id)
  try{
      await Movie.findByIdAndDelete(id)
      res.redirect("/movies/movies")      
  }
  catch(e){
    next(e)
  }
})

router.get("/movies/:id/edit", async (req, res, next)=>{
  const { id }= req.params
  try{
      const movie =await Movie.findById(id).populate("cast")   
      const celebs = await Celeb.find({})
      res.render("movies/editMovie", {movie, celebs})      
  }
  catch(e){
    next(e)
  }
})

 router.post('/movies/:id/edit', async (req, res, next) => {
    const {id} =req.params
    const {title, genre, plot, cast} = req.body
    try{ 
      await Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
      res.redirect("/movies/movies")
   }
   catch(err) { 
       res.redirect(`/movies/${id}`)
   }
 })

 module.exports = router;