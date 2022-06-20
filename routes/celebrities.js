var express = require('express');
var router = express.Router();
const Celeb =require("../models/Celebrity")

router.get('/celebrities/create',(req, res, next) => {  
  res.render("celebrities/newCelebrity")  
})

router.get('/celebrities', async (req, res, next) => {
  try{ 
    const allCeleb = await Celeb.find({})
    res.render("celebrities/celebrities", {allCeleb})
  }
  catch(err) { 
      next(err)
  }
})

router.get('/celebrities/:id', async (req, res, next) => {
  const {id} =req.params
  try{ 
    const celeb = await Celeb.findById(id)
    res.render("celebrities/infoCelebrity", celeb)
  }
  catch(err) { 
      next(err)
  }
})

router.get('/celebrities/:id/edit', async(req, res, next) => { 
  const { id } =req.params 
  try{    
    const celebId = await Celeb.findById(id)
    res.render("celebrities/editCelebrity", celebId)
  }
  catch(e){
    next (e)
  }    
})

router.post('/celebrities/:id/delete', async(req, res, next) => { 
  const { id } =req.params 
  try{    
    const celebId = await Celeb.findByIdAndDelete(id)
    res.redirect("/celebrities/celebrities")
  }
  catch(e){
    next (e)
  }    
})

router.post("/celebrities/create", async(req,res,next)=>{
    const {name, occupation, catchPhrase} = req.body
    try{
        await Celeb.create( {name, occupation, catchPhrase} )
        res.redirect("/celebrities/celebrities")
    }
    catch(err){
        res.redirect("/celebrities/celebrities/create")
    }
})

router.post('/celebrities/:id/edit', async (req, res, next) => {
  const {id} =req.params
  const {name, occupation, catchPhrase} = req.body
  try{ 
      await Celeb.findByIdAndUpdate(id,{name, occupation, catchPhrase})
      res.redirect("/celebrities/Celebrities")
  }
  catch(err) { 
      res.redirect(`/celebrities/celebrities/${id}`)
  }
});

module.exports = router;