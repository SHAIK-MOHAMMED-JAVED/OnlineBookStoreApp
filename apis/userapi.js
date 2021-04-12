const exp = require("express");
const userApiObj = exp.Router();

userApiObj.use(exp.json());
const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const verifyTokenMethod=require('./middlewares/verifytoken')
const { errorComparator } = require("tslint/lib/verify/lintError");

// const authSchema=require('../helpers/validation')


userApiObj.post("/getorders",errorHandler(async (req,res)=>{

  // console.log(req.body);
  let filter={username:req.body.username}
  let user = await User.findOne(filter)

  // console.log("orders",user.successOrders)
  res.send({message:user.successOrders})


}))

userApiObj.post("/getuserprofile",errorHandler(async (req,res)=>{

  let filter={username:req.body.username}
  let user = await User.findOne(filter)

  let sentObj = {username:user.username,email:user.email}

  res.send({message:sentObj})
}))

userApiObj.post(
  "/createuser",
  errorHandler(async (req, res) => {
 

    let userObj = req.body;
    let user = await User.findOne({ username: userObj.username });

    if (user == null) {
      let hashedPassword = await bcryptjs.hash(req.body.password, 7);
      //create user obj for user model
      let newUserObj = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      //save
      await newUserObj.save();
      //  console.log(user)
      res.send({ message: "user created" });
    } else {
      res.send({ message: "User already existed" });
    }
  })
);


userApiObj.post('/makePaymentNext',errorHandler(async(req,res)=>{
 
   
 let paymentObj=req.body




 let user =await User.findOne({username:paymentObj[0].orderBy})
 let finalRequiredData={address:user.orders[0].address , products:user.cart,status:paymentObj[0].status}

 await User.findOneAndUpdate(
  { username: paymentObj[0].orderBy },
  { $push: {successOrders : finalRequiredData } }
);

await User.findOneAndUpdate({username:paymentObj[0].orderBy},{$set:{cart:[]}}  )

}))




// payment 
userApiObj.post('/makePayment',errorHandler(async(req,res)=>{

   userReqObj=req.body

    let otp =Math.floor((Math.random() * 1000000) + 1);

    res.send({message:otp})


}

   
 


) )


userApiObj.post('/deletecard',errorHandler(async(req,res)=>{

  indexOfCard=req.body
  console.log(indexOfCard)
  
   let filter ={username:indexOfCard.username}
   let update = {cards:indexOfCard.cardObj} 
await User.findOneAndUpdate(filter,update)



}) )


userApiObj.post(
  "/userCartAdd",

  errorHandler(async (req, res) => {
    let cartObj = req.body;
    // console.log("product".yellow,cartObj)
    let bool = false;
    let userFound = await User.findOne({ username: cartObj.userAdded });
    // console.log("user is ".yellow,userFound.cart)

    for (let i = 0; i < userFound.cart.length; i++) {
      if (userFound.cart[i]._id == cartObj._id) {
        bool = true;
        break;
      }
    }

    if (bool == true) {
      res.send({ message: "product already exist" });
    } else {
      let user = await User.findOneAndUpdate(
        { username: cartObj.userAdded },
        { $push: { cart: cartObj } }
      );

      res.send({ message: "product added to cart" });
    }
  })
);


userApiObj.post(
  "/userWishListAdd",

  errorHandler(async (req, res) => {
    let wishlistObj = req.body;
    // console.log("wish book",req.body)
    let bool = false;
    let userFound = await User.findOne({ username: wishlistObj.userAdded });
    // console.log("wish",userFound)
    // let wish =userFound.wishlist
    // console.log("wish cart",wish)
    for (let i = 0; i < userFound.wishlist.length; i++) {
      if (userFound.wishlist[i]._id == wishlistObj._id) {
        bool = true;
        break;
      }
    }
    
    if (bool == true) {
      res.send({ message: "Product is  already exist in wishlist" });
    } else {
      let user = await User.findOneAndUpdate(
        { username: wishlistObj.userAdded },
        { $push: { wishlist: wishlistObj } }
      );

      res.send({ message: "product added to wishlist" });
    }
  })
);

   
userApiObj.post(

  "/getAllProductsToUsersFromWishlist",
  
  errorHandler(async(req,res)=>{


   let user=await User.findOne({username:req.body.username})

   let productstoWishlist=user.wishlist


   res.send({message:productstoWishlist})
        
  })
);

userApiObj.post(
  "/movetocartfromwishlist",

  errorHandler(async (req, res) => {
    let wishlistObj = req.body;
    // console.log("wish book",req.body)
    let bool = false;
    let userFound = await User.findOne({ username: wishlistObj.userAdded });
    console.log("move cart",userFound)
    // console.log("wish",userFound)
    // let wish =userFound.wishlist
    // console.log("wish cart",wish)
    for (let i = 0; i < userFound.cart.length; i++) {
      if (userFound.cart[i]._id == wishlistObj._id) {
        bool = true;
        break;
      }
    }
    
    if (bool == true) {
      res.send({ message: "Product is  already exist in cart" });

      await User.findOneAndUpdate(
        { username: req.body.userAdded },
  
        { $pull: { wishlist: { _id: req.body._id } } }
      );

    } else {
      let user = await User.findOneAndUpdate(
        { username: wishlistObj.userAdded },
        { $push: { cart: wishlistObj } }
      );

      await User.findOneAndUpdate(
        { username: req.body.userAdded },
  
        { $pull: { wishlist: { _id: req.body._id } } }
      );

      res.send({ message: "product added to cart" });
    }
  })
);



userApiObj.post(
  "/deleteproductfromwishlist",

  errorHandler(async (req, res) => {
    let cartdel = await User.findOneAndUpdate(
      { username: req.body.userAdded },

      { $pull: { wishlist: { _id: req.body._id } } }
    );

    res.send({ message: "Successfully remove from wishlist " });
  })
);




userApiObj.post(
  "/getCart",
  errorHandler(async (req, res) => {
    let user = req.body;

    let usersinDb = await User.findOne({ username: user.username });

    res.send({ message: usersinDb.cart });
  })
);


// remove item from cart
userApiObj.post(
  "/deletefromcart",

  errorHandler(async (req, res) => {
    let prodObj = req.body;
    let cartdel = await User.findOneAndUpdate(
      { username: req.body.userAdded },

      { $pull: { cart: { _id: req.body._id } } }
    );

    res.send({ message: "Successfully remove from cart " });
  })
);





// get cards


userApiObj.post(


  "/getUserCards",errorHandler(async(req,res)=>{

  let cardObj=req.body;
  console.log(cardObj[0].username)

  let filter ={ username:cardObj[0].username}
 

  let user = await User.findOne(filter)

  console.log(user.cards)
 res.send({message:user.cards})


  })
)

// add card


userApiObj.post(


  "/cardAdd", errorHandler(async(req,res)=>{


      let cardObj=req.body;

      console.log(cardObj)


      let filter ={ username:cardObj[0].username}
   
 

      let userObj=await User.findOne({username:cardObj[0].username})
 


   if(!(userObj.cards.length<=2)){

    res.send({message:"card limit exceeded"})
   }
   else{

    
    let user = await User.findOneAndUpdate(filter,
        
        
      {$push:{cards:cardObj[0]}}
      
      )  
     res.send({message:"Card Added"})


   }



  })
)





// order 

userApiObj.post(
  "/orders",
  errorHandler(async (req, res) => {

    let ordersObj=req.body;
 
   
    let user = await User.findOne({ username:ordersObj[0].orderBy });
     let address=user.address[ordersObj[0].selectedAddress]
  



      await User.findOneAndUpdate({ username:ordersObj[0].orderBy},
        
        {$set:{orders:{address:address}}


        })

        res.send({message:"address noted"})
    



  })
);


// add address

userApiObj.post(
  "/addAddress",
  errorHandler(async (req, res) => {
    // console.log("address".green, req.body);

    let usersinDb = await User.findOne({ username: req.body.username });


    // res.send({ message: usersinDb.address });
    if (usersinDb.address.length <= 5) {
      let user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { address: req.body } }
      );
      res.send({ message: "Address Added Successfully" });
    } else {
      res.send({ message: "Address limit reached Maximum" });
    }
  })
);

// get address of user
userApiObj.post(
  "/getAddress",
  errorHandler(async (req, res) => {
    let userObj = req.body;
    let user = await User.findOne({ username: userObj.username });
    res.send({ message: user.address });
  })
);
// delet user

userApiObj.post(
  "/deleteUserAddress",
  errorHandler(async (req, res) => {
    let userAddObj = req.body;



  let filter={username:userAddObj[0].username}


  // console.log(filter)
    let update = {address:userAddObj} 

 
      await User.findOneAndUpdate(filter,update)
  
    res.send({  message:"Address removed"})
  })
);

// login user

userApiObj.post(
  "/login",
  errorHandler(async (req, res) => {
    let userObj = req.body;

    let user = await User.findOne({ username: userObj.username });

    if (user == null) {
      res.send({ message: "Invalid username" });
    } else {
      let status = await bcryptjs.compare(userObj.password, user.password);

      if (status) {
        let token = await jwt.sign({ username: user.username }, "abcd", {
          expiresIn: 100,
        });

        res.send({ message: "success", token: token, userObj: user.username });
      } else {
        res.send({ message: "Invalid Password" });
      }
    }
  })
);

module.exports = userApiObj;