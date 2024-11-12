import CryptoJS from "crypto-js";

const encryptData = (data: string | CryptoJS.lib.WordArray) => {
  const key = process.env.VUE_APP_AES_KEY as string;
  const iv = process.env.VUE_APP_AES_IV as string;

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
  const key = process.env.VUE_APP_AES_KEY as string;
  const iv = process.env.VUE_APP_AES_IV as string;

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
