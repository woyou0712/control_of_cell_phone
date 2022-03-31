const express = require("express");
const router = express.Router();
const phone = require("../methods/setPhone.js")

/**
 * 点击
 */
router.post("/tap", async (req, res, next) => {
  try {
    let { x, y } = req.body;
    let s = await phone.tap(x, y);
    res.send({ code: 0, s })
  } catch (err) {
    next({ code: -1, err })
  }
})


/**
 * 激活屏幕
 */
router.post("/activate", async (req, res, next) => {
  try {
    let s = await phone.keyevent(224)
    res.send({ code: 0, s })
  } catch (err) {
    next(err)
  }
})

/**
 * 首页
 */
router.post("/home", async (req, res, next) => {
  try {
    let s = await phone.keyevent(3)
    res.send({ code: 0, s })
  } catch (err) {
    next(err)
  }
})
/**
 * 返回
 */
router.post("/retreat", async (req, res, next) => {
  try {
    let s = await phone.keyevent(4)
    res.send({ code: 0, s })
  } catch (err) {
    next(err)
  }
})
/**
 * 滑动
 */
router.post("/swipe", async (req, res, next) => {
  let { start, end } = req.body;
  try {
    let s = await phone.swipe(start, end);
    res.send({ code: 0, s })
  } catch (err) {
    next(err)
  }
})

/**
 * 输入
 */
router.post("/input", async (req, res, next) => {
  let text = req.body.text;
  try {
    let s = await phone.input(text);
    res.send({ code: 0, s })
  } catch (err) {
    next(err)
  }
})

module.exports = router