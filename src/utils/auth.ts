import Cookies from 'js-cookie'
export const AUTH_TOKEN = 'token'
/** 设置token */
export function setToken (token: string) {
  Cookies.set(AUTH_TOKEN, token)
}
/** 移除token */
export function removeToken () {
  Cookies.remove(AUTH_TOKEN)
}
/** 获取token */
export function getToken () {
  if (!Cookies.get(AUTH_TOKEN) && localStorage.getItem('apitoken')) {
    return localStorage.getItem('apitoken')
  }
  return Cookies.get(AUTH_TOKEN)
}
