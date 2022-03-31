const { exec } = require("child_process")

function cmd(str) {
  return new Promise((next, error) => {
    if (typeof str !== "string") {
      return error("str is not String")
    }
    exec(str, (e, msg, err) => {
      if (e) { return error(e) };
      next({ msg, err })
    })
  })
}
module.exports = cmd