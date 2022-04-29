import multer from "multer";
import CryptoJS from "crypto-js";

export const checkResultStatus = (result) => {
  if (!result.success) {
    return false;
  }
  return true;
};

export const checkPassword = (enteredPassword, databasePassword) => {
  const enteredPasswordBytes = CryptoJS.AES.decrypt(
    enteredPassword,
    "secret key 123"
  );

  const databasePasswordBytes = CryptoJS.AES.decrypt(
    databasePassword,
    "secret key 123"
  );

  const originalEnteredPassword = enteredPasswordBytes.toString(
    CryptoJS.enc.Utf8
  );
  const originaldatabasePassword = databasePasswordBytes.toString(
    CryptoJS.enc.Utf8
  );

  if (originalEnteredPassword === originaldatabasePassword) {
    return true;
  } else {
    return false;
  }
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
