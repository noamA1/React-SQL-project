import multer from "multer";

export const checkResultStatus = (result) => {
  if (!result.success) {
    return false;
  }
  return true;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/src/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
