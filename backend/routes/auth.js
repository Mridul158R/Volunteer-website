const express= require('express');
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET='doingdev@hard$sucksfunendresult';

//ROUTE1:create user using POST "/api/auth/createUser" No login required

router.post('/createUser',[
    body('name','Enter valid Name').isLength({min:3}),
    body('email','Enter valid Email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:5})
],async (req,res)=>{
  let success=false;

    // if there are errors,return bad request and errors
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({success,errors:errors.array()})
}
//check whether user with email exist already
try{



let user=await User.findOne({email:req.body.email});
if(user){
   return res.status(400).json({success,error:"sorry a user with this email already exist"})
}
const salt=await bcrypt.genSalt(10);
const secPass= await bcrypt.hash(req.body.password,salt);
//create user
  user =await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
});
const data={
    user:{
        id:user.id
    }
}
const authtoken=jwt.sign(data,JWT_SECRET);

// res.json(user)
success=true;
res.json({success,authtoken})
}
catch(error){
console.error(error.message);
res.status(500).send("some error occured");
}
}
)

//Route2:Authenticate User end point /api/auth/login

router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','password can not be blank').exists()
   
],async (req,res)=>{
  let success=false;
  // if there are errors,return bad request and errors
  const errors=validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      success=false;
        return res.status(400).json({error:"Please try to login with correct Credentials"})
    }
    //getting the name of the user
    let name = user.name;
    const passwordCompare=await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    return res.status(400).json({success,error:"Please try to login with correct Credentials"})
  }
  const data={
    user:{
        id:user.id
    }
}
const authtoken= jwt.sign(data,JWT_SECRET);
success=true;
res.json({name,success,authtoken});

}
  catch(error){
    console.error(error.message);
res.status(500).send(" Internal server error");
  }
    
})

//Route3:Get loggin User end point /api/auth/getuser login required
// router.post('/getuser',fetchuser,async(req,res)=>{
  
// try{
//   useriId=req.user.id;
//   const user=await User.findById(useriId).select("-password")
//   res.send(user)
// }
// catch(error){
//   console.error(error.message);
//   res.status(500).send(" Internal server error");
// }
// })



router.post("/getuser", fetchuser, async (req, res) => {
  try {
    
    const userId = req.user.id;
   console.log({userId}) 
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports=router