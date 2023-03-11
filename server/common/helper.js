import multer from "multer";
import CryptoJS from "crypto-js";
import generalSetting from "./config.js";
import path from "path";

export const checkResultStatus = (result) => {
  if (!result.success) {
    return false;
  }
  return true;
};

export const checkPassword = (enteredPassword, databasePassword) => {
  const enteredPasswordBytes = CryptoJS.AES.decrypt(
    enteredPassword,
    generalSetting.CRYPTOJS_KEY
  );

  const databasePasswordBytes = CryptoJS.AES.decrypt(
    databasePassword,
    generalSetting.CRYPTOJS_KEY
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
    // cb(null, "../client/src/assets");
    // cb(null, "./client/public/uploads");
    cb(null, path.join(__dirname, "../client/public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
