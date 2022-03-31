import md5 from "js-md5";

const UUIDKey = "uuid"

export function getUUID() {
  let uuid = localStorage.getItem(UUIDKey);
  if (!uuid || uuid.length < 64) {
    let a = md5(navigator.userAgent), r = md5(String(Math.random())), n = md5(String(Date.now()));
    uuid = a + r + n;
    localStorage.setItem(UUIDKey, uuid)
  }
  return uuid
}

