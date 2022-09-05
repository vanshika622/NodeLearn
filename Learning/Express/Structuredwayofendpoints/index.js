const Productrouter= require('./product')
const Userrouter=  require('./user')
const express= require('express')
const cors= require('cors')
const app= express();
// apply express.json() middleware to all the endponits
app.use(express.json())
//apply cors to handle cors related error 
app.use(cors())
//apply middleware only for a one file not for all
//app.all("/products",someMiddleware)
app.use("/products",Productrouter);
app.use("/users",Userrouter);

// const someMiddleware=(req,res,next)=>{
//       next();
// }
