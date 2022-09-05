// express modules return a function not object
const express= require('express');

// this express function return an object
const app= express();

app.get("/products",(req,res)=>{
    res.send({message:"Get Request success"})
})
// here : operator used to identify a variable or parameter in A url
app.get("/products/:id",(req,res)=>{
    console.log(req.params.id);
    res.send({message:"Get Request success"})
})

//firstly request go to middleware function (headercheck) then further
app.post("/products",headercheck,(req,res)=>{
    res.send({message:"post request success"})
})

// creating a middleware
function headercheck(req, res, next){
    //console.log(req.headers)
    //next is a callbackfunction
    if(req.headers['content-type']===undefined){
        //if the content-type header is not present in request then go back to frontend
         res.send({message:"incomplete header content-type is missing"})
    }
    else{
        //next function reponsible to call or go back inside endpoint again
       next();
    }
}

app.listen(8000,()=>{
    console.log("Server is running");
})





