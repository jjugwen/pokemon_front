// src > shared > Cookie.js
import { Cookies, cookies } from "react-cookie";
//setCookie 쿠키 저장 함수 설정 function setCookie(cookie_name, value, days){}
const setCookie = (cookieName, value, exp = 5) => {
  let exdate = new Date();
  exdate.setTime(exdate.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${value}; expires=${exdate.toUTCString()}`;
};

//getCookie 쿠키 불러오기 함수 설정 (페이지 로드 시 쿠키유무 여부 판단하여 세팅)
function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : null;
}

export { setCookie, getCookie };
