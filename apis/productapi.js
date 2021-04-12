const exp = require("express");
const productApiObj = exp.Router();

productApiObj.use(exp.json());
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const Product = require("../models/Product");

const bcryptjs = require("bcryptjs");




// 1.cloudinary  configuration imports
const cloudinary =require("cloudinary").v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer =require('multer')


// config user cloudinary

cloudinary.config({
    cloud_name: "komalteertha", 
    api_key: "513325156757936", 
    api_secret: "e0BRU7cwyTVA72PRlllYKuu7r4Y"
  });

// config cloudinary storage

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async(req,file)=>{


        return {
            folder:"onlineStore",
            public_id: file.fieldname + '-' +Date.now()
        }
    }
})


// cnfigure multer 

var upload =multer({storage: storage});



var loggedUser;








productApiObj.post(
    '/createproduct',
   upload.single('photo'),
    errorHandler(async(req,res)=>{

        req.body=JSON.parse(req.body.productObj)
        req.body.photo=req.file.path
      let  productObj=req.body 


       let product = await Product.findOne({prod_id:req.body.prod_id})

       if(product==null){
              
            let prodObj = new Product({
   
                active:productObj.active,
                creator:productObj.creator, 
                author: productObj.author,
                prod_lang: productObj.prod_lang,
                prod_price:productObj.prod_price,
                prod_desc: productObj.prod_desc,
                prod_id: productObj.prod_id,
                prod_name: productObj.prod_name,
                photo: productObj.photo,
                type:productObj.type



            })

  

            await prodObj.save()

            res.send({message:"Product created successfully"})
       }
       else{

         res.send({message:"Product already exist"})
       }

    })
    
    )
 
 productApiObj.post('/getproducts',errorHandler(async(req,res)=>{
 
   
  let products= await Product.find({creator:req.body.username , active:true  })

  res.send({message:products})
 

 }))

 productApiObj.post(

    "/deleteproduct",
    
    errorHandler(async(req,res)=>{

        let deleteObj=req.body.prodIdDel
        let deleteProd = await Product.updateOne({ 
            
            
            prod_id:deleteObj }, {
                
                $set:{
                    
                    active:false
                }

            }
        )
        res.send({message:"deleted"})
    })
 )



 productApiObj.post("/updateadminproduct",errorHandler(async (req,res)=>{
    let productObj=req.body;
    
    let product=await Product.updateOne(
      {prod_id:req.body.prod_id},{
          $set: {
          
        
     prod_name:req.body.prod_name,
     prod_price:req.body.prod_price,
     prod_desc:req.body.prod_desc
     }
     }
      
    )
   // //  await product.save()
    res.send({message:"updated"})
   
   }))












   
 productApiObj.get(

    "/getAllProductsToUsers",
    
    errorHandler(async(req,res)=>{


     let productsTOUsers=await Product.find({active:true})



     res.send({message:productsTOUsers})
          
    })
 )






module.exports = productApiObj;

