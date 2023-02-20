const jwt=require('jsonwebtoken');

const authentication=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secretecode',(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID;
                next();
            }else{
                res.send({'msg':'Please Log In'});
            }
        })
    }else{
        res.send({'msg':'Please Log In'});
    }
}

module.exports={
    authentication
}