import multer from "multer";
import CryptoJS from "crypto-js";
import generalSetting from "./config.js";

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
    cb(null, "../client/src/assets");
    // cb(null, "http://localhost:3000/public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ dest: "uploads/" });
// export const upload = multer({ dest: "../client/public/uploads/" });
// export const upload = multer({ storage });
