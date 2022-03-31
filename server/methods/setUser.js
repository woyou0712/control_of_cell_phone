const time = 60000; // 一分钟没有操作则清除用户
global.oneUser = {
  uuid: null,
  time: 0,
}
global.setUserTimeOut = null;
// 判断用户是否存在
function setUser(uuid) {
  // 如果没有用户，或者用户是当前用户，则更新
  if (!global.oneUser.uuid || global.oneUser.uuid === uuid) {
    global.oneUser.uuid = uuid;
    global.oneUser.time = Date.now();

    clearTimeout(global.setUserTimeOut)
    // 设置过期清除数据
    global.setUserTimeOut = setTimeout(() => {
      global.oneUser.uuid = null;
      global.oneUser.time = 0;
    }, time)
    return true
  }
  // 当前有别的用户正在操作
  return false
}

module.exports = setUser;
