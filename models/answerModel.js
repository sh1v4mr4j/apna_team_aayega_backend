const mongoose=require('mongoose')


const answerSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        ref:'user',
        
    },
    questionCode:{
        type:String,
        ref:'question',
        required:true
    },
    answer:{type:String,required:true},
    complexity:{type:String,required:true},
    upVotes:{type:Number,default:0},
    downVotes:{type:Number,default:0},
})


module.exports=mongoose.model('answer',answerSchema);


