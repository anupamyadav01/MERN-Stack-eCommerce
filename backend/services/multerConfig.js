import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const uploadFolderPath = "uploads/";

// where to store the image and by which name
const storageConfig = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, uploadFolderPath);
  },
  filename: (req, file, callback) => {
    const fileName = uuidv4() + path.extname(file.originalname);
    callback(null, fileName);
  },
});
console.log("Multer Config Executed");
export const uploadProductImage = multer({
  storage: storageConfig,
});
