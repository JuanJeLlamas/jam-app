const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: "dsevu38bc",
  api_key: "394947273272951",
  api_secret: "pD90JwjVKr5zcHrquJbGTr2fp8I"
});
 
const storage = new CloudinaryStorage({
  
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', "webp","mp3"],
    folder: 'jam-app' // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  }
});
 
//                     storage: storage
module.exports = multer({ storage });