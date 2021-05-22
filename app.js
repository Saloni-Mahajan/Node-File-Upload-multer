const express=require('express');
const app=express();
const ejs=require('ejs');
const mongoose = require('mongoose');
const uploads=require('./routes/uploads');
const url='mongodb://localhost:27017/file'

app.set('view engine','ejs');
app.use(express.static('./public'));
app.use('/',uploads);

//DB connection
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true} ,
    ()=>{
    console.log('connected to db');   
  })

  app.listen(5000,()=>{
    console.log('port listening to 5000 ');
    
  })