const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorisation.split(" ")[1];


        const decoded=jwt.verify(token,'secret');
        req.userdata=decoded;
        next();
    }
    catch(error)
    {
        res.send("Not logged in")
    }
}