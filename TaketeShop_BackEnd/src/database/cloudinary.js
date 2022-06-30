const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'taketeshop',
  api_key: 862947269136143,
  api_secret: 'cDmGtX3-UrfdPaP0ro_t3UMUVcs',
});

module.exports = cloudinary;
