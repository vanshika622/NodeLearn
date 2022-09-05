const fs= require('fs');
const http=require('http');
const { reset } = require('nodemon');
const url= require('url');

http.createServer((req,res)=>{
    let parsedUrl= url.parse(req.url, true);
    let products= fs.readFileSync("./products.json",{encoding:"utf-8"});
    if(req.method==='GET' && parsedUrl.pathname==='/products'){
        
        let id= parsedUrl.query.id;
        if(id===undefined){
       
        res.write(products);
        
        }
        else {
        let product = JSON.parse(products).find((ele, index)=>{
            return Number(ele.id)==Number(id);
        })
        if(product!=undefined){
            res.write(JSON.stringify(product))
        }
        else{
            res.write(JSON.stringify({message:"Invalid Product id"}));
        }
        
        
        }
        res.end();
       
    }
   else if(req.method==='DELETE' && parsedUrl.pathname==='/products'){
       
        let id= parsedUrl.query.id;
        if(id!==undefined){
       let pro= JSON.parse(products)
        let index= pro.find((ele, index)=>{
            return Number(ele.id===id);
        })
       pro.splice(index,1);

       fs.writeFile("./products.json",JSON.stringify(pro),(err)=>{
          if(err===null){
            res.write(JSON.stringify({message:"product deleted"}));
            res.end();
          }
       });
       
        
        
        }
        else {
        
            res.write(JSON.stringify({message:"Invalid product id"}));
        }
        
        
        
        
    }
    else if(req.method=="POST" && parsedUrl.pathname==='/products'){
        let data="";
        // it will run until all tha data pack or chuncks are not received
        req.on("data",(chunk)=>{
            data+=chunk;
        })
     //it will run at the end when last chunk is remained
        req.on("end",()=>{
            let dataOBj= JSON.parse(data);
            let newid= dataOBj.id;
            let pro= JSON.parse(products)
            let index= pro.findIndex((ele, newid)=>{
                return Number(ele.id)===Number(newid)
            })
            console.log(index)
             
                pro.push(dataOBj);
                //since res.end() is synchronus task so it executed first before writeFile which is asynchronous task so we have to it inside asynchrounus task
            fs.writeFile("./products.json",JSON.stringify(pro), (err)=>{
                if(err===null){
                    res.write(JSON.stringify({message:"Product Added"}));
                    res.end();
                }
            })
            
            
        })
        
        
    }
    else if(req.method==='PUT' && parsedUrl.pathname==='/products'){
        let id = parsedUrl.query.id;
        let pro= JSON.parse(products)
                
              let data="";
              req.on("data",(chunk)=>{
                data+=chunk;
              })
              req.on("end",()=>{
                
                  let dataOBj= JSON.parse(data);
                  console.log(dataOBj)
                   let indexupdate= pro.findIndex((product, index)=>{
                       return  Number(product.id)===Number(id);
                   })
                   console.log(indexupdate);
                   console.log(pro[indexupdate]);
                   pro[indexupdate]=dataOBj;
                   fs.writeFile("./products.json",JSON.stringify(pro), (err)=>{
                    if(err===null){
                        res.write(JSON.stringify({message:"Product Updated"}));
                        res.end();
                    }
                })
              })
    }
    else{
        res.write("Invalid request method")
    }
   
   
}).listen(8000,()=>{
    console.log("server is running");
})