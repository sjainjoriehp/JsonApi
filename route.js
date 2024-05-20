const express = require("express");
const multer = require("multer");
const router=express.Router();
const  {OutputGeneratorByJson} = require("./Controller");
const { GenerateRandomName } = require("./CustomFunction");
// const {upload} = require("./middlewares/multer.middleware");
// const upload = multer({ dest: 'public/input' }); 


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/input') // specify the directory for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // use the original filename
    }
  });
  
  const upload = multer({ storage: storage });

// router.route("/JsonTo_outputGenerator").post(upload.single("jsonfile"), OutputGeneratorByJson);
router.route("/JsonTo_outputGenerator").post(upload.fields([{
    name: 'jsonfile', maxCount: 1
  }, {
    name: 'excelfile', maxCount: 1
  }]), OutputGeneratorByJson);

console.log("call");
module.exports={
    router
};