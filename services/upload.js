const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// configure Cloudinary account with credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {folder: "Collection Digital"},
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 250, height: 250, crop: "limit" }],
});

const upload = multer({ storage: storage });

module.exports = upload;