const path = require("path");
const express = require("express");
const router = express.Router();
const phone = require("../methods/setPhone.js")
/**
 * 获取当前屏幕
 */
router.get("/home/:fileName", async (req, res, next) => {
  let fileName = req.params.fileName;
  try {
    await phone.screenCapture(fileName);
    res.sendFile(path.join(__dirname, "../static/newImage.png"))
  } catch (err) {
    console.log(err)
    res.sendFile(path.join(__dirname, "../static/error.png"))
  }
})

module.exports = router