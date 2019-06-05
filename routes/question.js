const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
const auth=require('../auth.js')
const questionModel=require('../models/questionModel.js')





router.get('/',function(req,res){
    questionModel.find()
    .select('questionName questionCode tags')
    .exec()
    .then(question=>{
        res.json(question).status(200);
        console.log("gye?")
    })
})





router.get('/:Qcode',function(req,res){
    console.log(req.params.Qcode)
    questionModel.findOne({questionCode:req.params.Qcode})
    .select('-__v')
    .exec()
    .then(question=>{
        res.json(question).status(200);
        
    })
})







router.post('/',function(req,res){
    const newQuestion=new questionModel({
        _id: new mongoose.Types.ObjectId,
        questionName:req.body.questionName,
        statement:req.body.statement,
        questionCode:req.body.questionCode,
        tags:req.body.tags,
        inputFormat:req.body.inputFormat,
        outputFormat:req.body.outputFormat,
        sampleInput:req.body.sampleInput,
        sampleOutput:req.body.sampleOutput
    })
    questionModel.find({questionCode:req.body.questionCode})
    .exec()
    .then(question=>{
        if(question.length>0)
            res.json({"message":"question code already exists"}).status(400);
        else{
            newQuestion.save();
            res.json({"message": "Question Saved"}).status(200);
        }
    })
})



module.exports=router;