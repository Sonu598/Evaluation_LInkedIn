const express=require('express');
const Router=express.Router();
const {UserModel}=require('../model/usermodel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

Router.post('/register',async(req,res)=>{
    const {name,email,gender,password,age,city}=req.body;
    try{
        bcrypt.hash(password,4,async function(err,hash){
            if (err){
                res.send({'msg':'Somthing went wrong','error':err.message});
            }else{
                const user=new UserModel({name,email,gender,password:hash,age,city});
                await user.save();
                res.send({'msg':'Successfully Registered'});
            }
        });
    }catch(err){
        res.send({'msg':'Somthing went wrong','error':err.message});
    }
})

Router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await UserModel.find({email});
        if (user.length>0) {
            bcrypt.compare(password,user[0].password,function(err,result){
                if (result) {
                    let token=jwt.sign({userID:user[0]._id},'secretcode');
                    res.send({'msg':'Successfully Logged In','token':token});
                }else{
                    res.send('Wrong Credentials');
                }
            });
        }else{
            res.send('Wrong Credentials');
        }
    }catch(err){
        res.send({'msg':'Somthing went wrong','error':err.message});      
    }
})

module.exports={
    Router
}