const express=require('express')
const mongoose=require('mongoose')
const parser=require('body-parser')
const morgan=require('morgan')
const app=express();
const port=3000;

mongoose.connect("mongodb://localhost:27017/apna",{useNewUrlParser:true},function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("mongoose connected")
    }
})

const user=require('./routes/user.js')
const question=require('./routes/question.js')
const answer=require('./routes/answer.js')
const tags=require('./routes/tags.js')

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use("*",function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','content-type');
    res.set('Access-Control-Allow-Methods', '*');
    next();
})
console.log("midway")

app.use('/user',user);
app.use('/question',question);
app.use('/answer',answer);
app.use('/tags',tags);
console.log("after")

app.listen(port,function(){
    console.log(`Server is listening on ${port}`)
})

