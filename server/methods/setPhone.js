const path = require("path");
const cmd = require("./cmd.js");
/**
 * 截屏 上一次截图未完成则不要再次截图
 */
function screenCapture(fileName) {
  return new Promise(async (next, error) => {
    try {
      let s = `adb shell screencap -p /sdcard/adb/newImage.png`
      let res = await cmd(s);
      console.log("s", res)      
      let p = `adb pull /sdcard/adb/newImage.png ${path.join(__dirname, "../static/newImage.png")}`
      res = await cmd(p);
      console.log("P", res)
      if (res.msg.indexOf("MB/s") === -1) {
        return error({ code: -1, msg: "截屏失败" })
      }
      let r = `adb shell rm /sdcard/adb/newImage.png`
      res = await cmd(r);
      console.log("r", res)
      next(res)
    } catch (err) {
      error(err)
    }
  })
}


/**
 * 点击
 */
function tap(x, y) {
  return new Promise(async (next, error) => {
    try {
      let s = `adb shell input tap ${x} ${y}`
      let res = await cmd(s)
      next(res)
    } catch (err) {
      error(err)
    }
  })
}

/**
 * 滑动
 */
function swipe(start, end) {
  return new Promise(async (next, error) => {
    try {
      let s = `adb shell input swipe ${start.x} ${start.y} ${end.x} ${end.y}`
      let res = await cmd(s)
      next(res)
    } catch (err) {
      error(err)
    }
  })
}

/**
 * 输入
 */
function input(text) {
  return new Promise(async (next, error) => {
    try {
      let s = `adb shell input text "${encodeURIComponent(text)}"`
      let res = await cmd(s)
      next(res)
    } catch (err) {
      error(err)
    }
  })
}

/**
 * 按键
 */
function keyevent(key) {
  return new Promise(async (next, error) => {
    try {
      let s = `adb shell input keyevent ${key}`
      let res = await cmd(s)
      next(res)
    } catch (err) {
      error(err)
    }
  })
}


module.exports = {
  screenCapture, tap, swipe, input, keyevent
}