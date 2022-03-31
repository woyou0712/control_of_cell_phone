import { ref } from "vue";
import { input, activate, swipe, home, retreat } from "@/apis/phone";
import { toTap, initView } from "./tap";

export function viewPhone() {
  let box = document.getElementById("phone-box");
  box.innerHTML = "";
  let img = document.createElement("img");
  img.src = `${window.WINDOWS_CONFIG.baseUrl}/view/home/${Date.now()}.png`;
  img.style["width"] = "100%"
  img.style["height"] = "100%"
  img.addEventListener("click", toTap)
  box.appendChild(img);
}

export let isInput = ref(false);
export let text = ref("");

let isAjax = false;
/**
 * 提交输入
 */
export function submitInput() {
  if (isAjax) { return }
  isAjax = true;
  input({ text: text.value }).then(() => {
    isInput.value = false;
    text.value = "";
    viewPhone()
    isAjax = false;
  }).catch(() => {
    isAjax = false;
  })
}

/**
 * 激活
 */
export function toActivate() {
  if (isAjax) { return }
  isAjax = true;
  activate().then(() => {
    viewPhone()
    isAjax = false;
  }).catch(() => {
    isAjax = false;
  })
}
/**
 * 首页
 */
export function toHome() {
  if (isAjax) { return }
  isAjax = true;
  home().then(() => {
    isAjax = false;
    viewPhone()
  }).catch(() => {
    isAjax = false;
  })
}
/**
 * 返回
 */
export function toRetreat() {
  if (isAjax) { return }
  isAjax = true;
  retreat().then(() => {
    isAjax = false;
    viewPhone()
  }).catch(() => {
    isAjax = false;
  })
}

const swipeForm = {
  start: { x: null, y: null },
  end: { x: null, y: null }
}
function __clearForm(params) {
  swipeForm.start.x = null;
  swipeForm.start.y = null;
  swipeForm.end.x = null;
  swipeForm.end.y = null;
}
/**
 * 滑动
 */
function toSwipe() {
  if (isAjax) { return }
  isAjax = true;
  swipe(swipeForm).then(() => {
    viewPhone()
    isAjax = false;
  }).catch(() => {
    isAjax = false;
  })
}

const shade = document.createElement("div");
shade.className = "shade";
export function initSwipe() {
  let box = document.querySelector("#phone-box");
  box.addEventListener("mousedown", () => {
    __clearForm()
    box.appendChild(shade)
    shade.onmousemove = function (e) {
      let { widthP, heightP } = initView()
      if (!swipeForm.start.x) {
        swipeForm.start.x = e.clientX * widthP;
      }
      if (!swipeForm.start.y) {
        swipeForm.start.y = e.clientY * heightP;
      }
      swipeForm.end.x = e.clientX * widthP;
      swipeForm.end.y = e.clientY * heightP;
    }
  })
  shade.addEventListener("mouseup", async (e) => {
    shade.onmousemove = null;
    let f = shade.parentNode;
    f.removeChild(shade);
    if (!swipeForm.start.x || !swipeForm.start.y || !swipeForm.end.x || !swipeForm.end.y) {
      __clearForm()
      if (isAjax) { return }
      isAjax = true;
      await toTap(e)
      isAjax = false;
      return
    }
    if (swipeForm.start.x == swipeForm.end.x && swipeForm.start.y == swipeForm.end.y) {
      __clearForm()
      if (isAjax) { return }
      isAjax = true;
      await toTap(e)
      isAjax = false;
      return
    }
    toSwipe()
  })
}