const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const questionModel=require('../models/questionModel.js')



router.get('/:tag',function(req,res){
    console.log("reached here")
    questionModel.find({tags:req.params.tag})
    .select('-__v')
    .exec()
    .then(question=>{
        res.json(question).status(200);
    })
})
module.exports=router;