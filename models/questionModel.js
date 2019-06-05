const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    questionName:{type:String,required:true,unique:true},
    statement:{type:Array,required:true},
    questionCode:{type:String,required:true,unique:true},
    tags:{type:Array,required:true},
    inputFormat:{type:Array,required:true},
    outputFormat:{type:Array,required:true},
    sampleInput:{type:Array,required:true},
    sampleOutput:{type:Array,required:true}
})

module.exports=mongoose.model('question',questionSchema);