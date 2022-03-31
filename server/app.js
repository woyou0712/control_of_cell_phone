
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors({
  origin: ["http://localhost:8081", "http://192.168.1.171:8081"]
}))
// 配置中间件,解析post请求的数据为对象
app.use(bodyParser.urlencoded({
  extended: false    //不使用第三方的fs
}));

app.use(bodyParser.json()); // 解析json对象

app.use(express.static("./web"))

app.use("/view", require("./router/view.js"))
/**
 * 手机操作
 */
const setUser = require("./methods/setUser.js")
app.use("/phone", (req, res, next) => {
  let uuid = req.get("uuid");
  if (setUser(uuid)) {
    next()
  } else {
    res.send({ code: -1, msg: "当前有其他用户正在操作！请稍后再试！" })
  }
}, require("./router/phone.js"))


// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(200);
  let result = {}
  if (typeof err === "string") {
    result = { code: 400, msg: err }
  } else if (err.code) {
    result = err
  } else {
    result = { code: 500, msg: err }
  }
  res.json(result);
});

app.listen(5500, () => {
  console.log("port 5500")
})