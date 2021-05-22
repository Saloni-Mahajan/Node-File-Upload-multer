const express=require('express');
const router=express.Router();
const {index,uploadFile}=require('../app/controller/file.controller');

router.get('/', index);
router.post('/upload',uploadFile );

module.exports=router