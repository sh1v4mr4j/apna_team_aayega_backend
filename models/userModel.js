const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    username:{type: String, required: true, unique: true},
    dateofBirth:{type: String, required: true},
    email:{type: String, required: true},
    password : {type:String,required:true},
    questions :{type:Array}

})
module.exports=mongoose.model('user',userSchema);