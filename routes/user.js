const express=require('express');
const router = express.Router();
const bcryptjs=require('bcryptjs')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const userModel=require('../models/userModel.js')

router.get('/:email', function(req,res){
    const email=req.params.email;
    userModel.findOne({
        email:email
    })
    .then(user=>{
            res.json(user)
    })
})
router.post('/',function(req,res){
    const newUser=new userModel({
        _id: new mongoose.Types.ObjectId,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        dateofBirth:req.body.dateofBirth,
        email:req.body.email,
        password:bcryptjs.hashSync(req.body.password,10)
    })
    userModel.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>0)
            res.json({"message":"email exist"})
        else{
            newUser.save();
            res.json({"message": "Account Created"})
        }
    })
})

router.post('/login',function(req,res){
    userModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user!=null)
        {
            if(bcryptjs.compareSync(req.body.password,user.password))
            {
                const token=jwt.sign({
                    email:user.email,
                    _id:user._id
                },
                'secret',
                {
                    expiresIn:'1h'
                })

                res.json({
                    "message":"Authentication successful",
                    "token":token
                }).status(200)
                console.log("last");
            }
            else{
                res.json({"mesaage":"Authentication failed1"})
            }
        }
        else{
            res.json({"message":"Authentication failed2"})
        }
    })
})



module.exports=router;

