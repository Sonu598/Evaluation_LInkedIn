const express=require('express');
const {PostModel}=require('../model/post.model');

const postRouter=express.Router();

postRouter.get('/',async(req,res)=>{
    const posts=await PostModel.find();
    res.send(posts);
})

postRouter.post('/create',async(req,res)=>{
    const payload=req.body;
    const post=new PostModel(payload);
    await post.save();
    res.send({'msg':'Your post is now live'});
})

postRouter.get('/top',async(req,res)=>{
    const posts=await PostModel.find()
})

postRouter.patch('/update/:id',async(req,res)=>{
    const postID=req.params.id;
    const payload=req.body;
    await PostModel.findByIdAndUpdate({_id:postID},payload);
    res.send({'msg':'Your post has been Updated'});
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const postID=req.params.id;
    await PostModel.findByIdAndDelete({_id:postID});
    res.send({'msg':'Your post has been Deleted'});
})


module.exports={
    postRouter
}