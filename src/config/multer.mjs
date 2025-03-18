import multer from "multer";
import imagekit from "./imagekitConfig.mjs";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToImageKit = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const file = req.file;
  const fileName = Date.now().toString() + "-" + file.originalname;

  try {
    const result = await imagekit.upload({
      file: file.buffer, // required
      fileName: fileName, // required
      folder: "/uploads/",
    });

    req.file.url = result.url;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { upload, uploadToImageKit };
