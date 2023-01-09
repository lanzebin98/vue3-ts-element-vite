import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
interface AxiosRequestConfigExpand extends AxiosRequestConfig {
  isUseDebounce?: boolean;
}
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: any) => {
    if (response.status !== 200) {
      ElMessage({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(response.data.msg || 'Error'))
    } else {
      if (response.data.code !== 200) {
        ElMessage({
          message: response.data.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        return response
      }
    }
  },
  error => {
    ElMessage({
      message: error.msg || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
/**
 * get 请求
 *
 * @param {string} url 路由地址
 * @param {AxiosRequestConfig} config axios配置
 //  */
export function get<T> (url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance.get<T>(url, config).then((res) => Promise.resolve(res?.data))
}

/**
 * post 请求
 *
 * @param {string} url 路由地址
 * @param {any} params 参数
 * @param {AxiosRequestConfig} config axios配置
 */
export function post<T> (
  url: string,
  params?: any,
  config?: AxiosRequestConfigExpand
): Promise<T> {
  return instance
    .post<T>(url, params, config)
    .then((res) => Promise.resolve(res?.data))
}

/**
 * put 请求
 *
 * @param {string} url 路由地址
 * @param {any} params 参数
 * @param {AxiosRequestConfig} config axios配置
 */
export function put<T> (
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return instance
    .put<T>(url, params, config)
    .then((res) => Promise.resolve(res.data))
}

/**
 * delete 请求
 *
 * @param {string} url 路由地址
 * @param {AxiosRequestConfig} config axios配置
 */
export function del<T> (url: string, config?: AxiosRequestConfig): Promise<T> {
  return instance
    .delete<T>(url, config)
    .then((res) => Promise.resolve(res.data))
}

export default instance
