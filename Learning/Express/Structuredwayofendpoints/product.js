const express= require('express')
 const router = express.Router();

 router.get('/products',(req,res)=>{
    res.send({message:"all products"})
 })

 router.get('/products/:id',(req,res)=>{
    res.send({message:"single product"})
 })

 router.post('/products',(req,res)=>{
    res.send({message:"product added"})
 })

module.exports= router;