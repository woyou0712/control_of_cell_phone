import service from "@/utils/service.js"

/**
 * 激活
 */
export function activate() {
  return service({
    url: "/phone/activate",
    method: "post",
  })
}
/**
 * 首页
 */
export function home() {
  return service({
    url: "/phone/home",
    method: "post",
  })
}
/**
 * 返回
 */
export function retreat() {
  return service({
    url: "/phone/retreat",
    method: "post",
  })
}
/**
 * 滑动
 */
export function swipe(data) {
  return service({
    url: "/phone/swipe",
    method: "post",
    data
  })
}
/**
 * 点击
 */
export function tap(data) {
  return service({
    url: "/phone/tap",
    method: "post",
    data
  })
}
/**
 * 输入
 */
export function input(data) {
  return service({
    url: "/phone/input",
    method: "post",
    data
  })
}
