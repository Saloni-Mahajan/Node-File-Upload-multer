const FileUpload=require('../../models/Upload');
const multer=require('multer');
const path=require('path');

//Home page
const index=(req,res)=>res.render('index');

//storage name and path
const storage=multer.diskStorage({
    destination:'./public/uploads/',
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
    
//init upload
const upload=multer({
        storage:storage,
        limits:{fileSize:1000000},
        fileFilter:function(req,file,cb){
            checkFiletype(file,cb);
        }
    }).single('myImage');

//check file type

function checkFiletype(file,cb){
    const filetypes= /jpeg|png|gif|jpg/
    // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

//Upload File
const uploadFile=(req, res) => {
    upload(req, res, async (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {
            const file=new FileUpload({
                filename:req.file.filename,
                path:req.file.path,
                size:req.file.size,
                mime:req.file.mimetype,
            });  
            console.log(file);
            
            try{
                const savedfile= await file.save();
                //res.send(savedfile);
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                  });
            }
            catch(err){
                res.send(err);
            }
        }
      }
    });
  }

module.exports={index,uploadFile};