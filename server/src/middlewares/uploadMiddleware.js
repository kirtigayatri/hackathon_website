const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Handle both images and raw files (like .zip)
    let resourceType = 'auto';
    if (file.originalname.match(/\.(zip|pdf|docx?|xlsx?)$/i)) {
      resourceType = 'raw';
    }

    let public_id = `${file.fieldname}-${Date.now()}`;
    if (resourceType === 'raw') {
      public_id += require('path').extname(file.originalname);
    }

    return {
      folder: 'hackathon_uploads',
      resource_type: resourceType,
      public_id: public_id
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;