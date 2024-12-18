import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudniary = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "threads-clone",
    });
    console.log("Upload to Cloudniary Executed");
    req.secure_url = result.secure_url;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unable to upload image, please try again later.",
    });
  }
};
