import CryptoJS from "crypto-js";
import { config } from "~~/server/config";

const encryptData = (data: string | CryptoJS.lib.WordArray) => {
  const key = config.aes.key;
  const iv = config.aes.iv;

  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);

  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const encrypedData = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return encrypedData;
};

const decryptData = (cipherText: string | CryptoJS.lib.CipherParams) => {
  const key = config.aes.key;
  const iv = config.aes.iv;

  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);

  const decrypted = CryptoJS.AES.decrypt(cipherText, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

export { encryptData, decryptData };
