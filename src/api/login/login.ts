import { get, post } from '@/utils/request'
import { CustomResponse, loginParams } from '@/model/base'
export class loginService {
/** 获取验证码 */
  static getCodeImg = (): Promise<CustomResponse<any>> => get<CustomResponse<any>>('/captchaImage')
  /** 登录 */
  static login = (params: loginParams):Promise<CustomResponse<any>> => post<CustomResponse<any>>('/login', params)
}
