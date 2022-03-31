const phoneSize = {
  width: 1080,
  height: 1920,
}
import { tap } from "@/apis/phone.js";
import { viewPhone } from "./setPhone.js";
export function initView() {
  let widthP = phoneSize.width / window.innerWidth;
  let heightP = phoneSize.height / window.innerHeight;
  return { widthP, heightP }
}

export function toTap(e) {
  return new Promise(async (next, error) => {
    try {
      let { widthP, heightP } = initView()
      let x = e.layerX * widthP;
      let y = e.layerY * heightP;
      await tap({ x, y })
      await viewPhone();
      next()
    } catch (err) {
      error(err)
    }
  })
}