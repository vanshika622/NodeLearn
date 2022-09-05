
const express= require('express')
 const router = express.Router();

 

 router.get('/user',(req,res)=>{
    res.send({message:"all user"})
 })

 router.get('/user/:id',(req,res)=>{
    res.send({message:"single user"})
 })

// express.json is a middleware function that used to access data sent in th body of post request
//  router.post('/user',express.json(),(req,res)=>{
//     console.log(req.body)
//     res.send({message:"user added"})
//  })

module.exports= router;