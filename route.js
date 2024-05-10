const express = require("express");
const multer = require("multer");
const router=express.Router();
const  {OutputGeneratorByJson} = require("./Controller");
// const {upload} = require("./middlewares/multer.middleware");
const upload = multer({ dest: 'public/input' }); 
router.route("/JsonTo_outputGenerator").post(upload.single("jsonfile"), OutputGeneratorByJson);
console.log("call");
module.exports={
    router
};