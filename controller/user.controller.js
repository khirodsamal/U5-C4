const {userModel}=require("../model/user.mode")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {redis}=require("../helper/redis")



const signup =  async (req,res) =>{

    try{

        const {email,password} = req.body;
        
        const isUserPresent = await userModel.findOne({email});
         if(isUserPresent) return res.send("User already Present, login please");
         
         const hash = await bcrypt.hash(password,8);

         const newUser = new userModel({email, password: hash});

         await newUser.save();

         res.send("Signup Successful")

    } catch(err) {
          console.log(err)
        res.send(err.message);
    }

}

const login = async (req,res)=> {

    try {
         
        const {email, password} = req.body;

        const isUserPresent  = await userModel.findOne({email});

        if(!isUserPresent) return res.send("user not present, Register please");

        const isPasswordCorrect = await bcrypt.compare(password,isUserPresent.password);

        if(!isPasswordCorrect) return res.send("Invalid Credentials");

        const token = await jwt.sign({userId:isUserPresent._id},"khirod", {expiresIn:"1hr"})

        res.send({message: "Login Success", token});


    } catch(err) {
        console.log(err)
         res.send(err.message)
    }

}

const logout = async (req,res) =>{

    try{

        const token = req.headers.authorization;

        if(!token) return res.status(403);

        await redis.set(token,token);
        res.send("logout successful");


    }catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

module.exports = { login, signup, logout } 