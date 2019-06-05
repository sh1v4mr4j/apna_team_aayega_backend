const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');

const answerModel=require('../models/answerModel.js')

router.put('/:answerID',function(req,res){
    console.log("idhar hu mai")
    const id=req.params.answerID;
    const newupVote = req.body.upVotes;
    const newdownVote= req.body.downVotes;
    answerModel.updateMany({_id:id},{$set:{upVotes:newupVote,downVotes:newdownVote}})

    .exec()
    .then(answer=>{
        res.json(answer).status(200);
    })

})


router.post('/',function(req,res){
    
    const newAnswer=new answerModel({
        _id: new mongoose.Types.ObjectId,
        questionCode:req.body.questionCode,
        answer:req.body.answer,
        complexity:req.body.complexity,
        upVote:0,
        downVote:0
        
    })
    answerModel.find({questionCode:req.body.questionCode})
    .exec()
    .then(question=>{
        
        if(question.length>0){
            newAnswer.save();
            res.json({"meessage":"Answer Submitted"})
        }
        else{
            newAnswer.save();
            res.json({"message": "Answer Submitted"})
        }
    })
})


router.get('/:Qcode',function(req,res){
    console.log(req.params.Qcode)
    answerModel.find({questionCode:req.params.Qcode}).sort( { upVotes: -1 } )
    .select('-__v')
    .exec()
    .then(question=>{
        res.json(question).status(200);
    })
})




module.exports=router;