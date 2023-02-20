const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
const {connect}=require('./config/db');
const {Router}=require('./routes/user.routes');
const {authentication}=require('./middleware/authenticate');
const cors=require('cors');
app.use(cors());
const {postRouter}=require('./routes/posts.routes');

app.get('/',(req,res)=>{
    res.send('Welcome to Homepage');
})

app.use('user/',Router);
app.use(authentication);
app.use('post/', postRouter);

app.listen(process.env.Port, async()=>{
    try{
        await connect;
        console.log('Connected to Database');
    }catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})