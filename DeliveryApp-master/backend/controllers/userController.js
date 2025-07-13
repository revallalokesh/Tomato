import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator"
import dotenv from "dotenv";

dotenv.config();


const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
           return res.json({success:false,message:"User not Exists !"});
        }
    
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.json({success:false,message:"Invaid Credentials"})
        }
        const token = createJwtToken(user._id);
        return res.json({success:true,token})
    }
    catch(Err){
        console.log(Err.message);
      return  res.json({success:false,message:"Error in Login"})
    }
   

}
const createJwtToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;

    try{
        //Checking the user Already Existence
        const exists = await userModel.findOne({email});
        if(exists){
          return  res.json({success:"false",message:"User already Exists"})
        }
        //validatin the email and password

        if(!validator.isEmail(email)){
           return res.json({success:false,message:"Please Enter a Stronge Email"})
        }
        if(password.length < 8 ){
          return  res.json({success:false,message:"Please Enter a Strong Password"})
        }

        //hashing the password

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,

        })

        const user = await newUser.save();
        const token = createJwtToken(user._id);
       return res.json({success:true,token})

    }
    catch(err){
        console.log(err);
       return res.json({success:false,message:"Error while creating User"})

    }

}


export {loginUser,registerUser};