// import multer from 'multer';
const multer = require("multer");
// const UploadFiles = (url='temp') =>{
//     multer({ dest: "./public/"+url});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         console.log(`file Extension could not supportable. only support extension(.jpge, .png , .jpg)`);
//     }
// }
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) { cb(null, './public/'+url); },
//     filename: function (req, file, cb) { cb(null, new Date() / 10 +  '_' + file.originalname.replace(/ /g,'')); }
// });
// const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter, });
// return upload;
// }
   
// export {UploadFiles}

    multer({ dest: "/public/input"});
const fileFilter = (req, file, cb) => {
    console.log(req?.file );
    if ( file.mimetype === '.json') {
        cb(null, true);
    } else {
        cb(null, false);
        console.log(`file Extension could not supportable. only support extension(.json)`);
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "./public/input"); },
    filename: function (req, file, cb) { cb(null, new Date() / 10 +  '_' + file.originalname.replace(/ /g,'')); }
});

 const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: fileFilter, });
module.exports = {
    upload
};  