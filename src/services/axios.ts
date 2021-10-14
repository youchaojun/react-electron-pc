import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Canceler } from 'axios';
import { CodeMessage } from './codeMessage';
import { message, notification } from 'antd';
import { HttpCode, ResponseData } from '@/typings/common';
import { hideLoading, showLoading } from './httpLoading.js';
const CancelToken = axios.CancelToken;
let cancel: Canceler[] = [];

const openNotificationWithIcon = () => {
  notification.error({
    message: '用户令牌失效',
    duration: 2,
    description: '2s后跳转到登录界面',
  });
};
interface HeadersModelIF {
  // 数据类型
  type: 'json' | 'fromdata';
  // 是否显示loading
  isLoading: boolean;
  url: string;
}

// 错误提示
interface ErrorMessageIF {
  response: { status: HttpCode; data: ResponseData<null> };
  message: string;
}

interface AxiosParams extends HeadersModelIF {
  // 请求地址
  url: string;
  // 请求参数
  params?: { [propName: string]: any };
  // 成功后需要提示的文字，不传不提示
  successMessage?: string | undefined;
  // 是否显示错误提示 默认提示接口返回的错误提示
  // 'no'不需要显示  '错误提示'传入具体的值显示值
  error?: string;
  method?: 'get' | 'delete' | 'post' | 'put' | undefined;
}
/**
 * 配置baseUrl
 * @return 配置baseUrl
 */
const getBaseUrl = (): string => {
  const env = process.env;
  const baseUrl = env.REACT_APP_BASE_URL!;
  return baseUrl;
};
/**
 * @baseURL 基本rul
 * @timeout 设置超时时间
 */
class JiayunAxios {
  private instance: AxiosInstance;
  constructor(baseURL: string, timeout: number) {
    this.instance = axios.create({ baseURL, timeout });
    this.setInterceptors(this.instance);
  }
  /**
   * 设置拦截器
   */
  private setInterceptors = (instance: AxiosInstance): void => {
    // 请求拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        // 设置头部
        config.headers['access-source'] = 'cwq9r3rZwyYsSStqDmiJ5A7pp4YQtcGt';
        if (config.url) {
          // 加token的判断 (加true 不加false)
          if (config.headers.isToken) {
            const token = sessionStorage.getItem('token');
            config.headers['Authorization'] = token ? token : '';
            delete config.headers.isToken;
          }
        }
        // 根据需要显示，在header中加入isLoding ture显示loading
        if (config.headers.isLoading) {
          showLoading();
          delete config.headers.isLoading;
        }
        return config;
      },
      (err: Error) => Promise.reject(err)
    );
    // 响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData<any>>) => {
        // 移除loading
        hideLoading();
        // 修改成功返回为data = null 在组件中一律判断null不为空即可
        let { success, data } = response.data;
        if (success && data === null) {
          response.data.data = {};
        }
        return response;
      },
      (err: ErrorMessageIF) => {
        // 移除loading
        hideLoading();
        // 超时处理
        if (err.message.includes('timeout')) {
          message.error('链接超时，请稍后重试', 5);
        }
        // 错误代码处理
        if (err.response?.status) {
          // 响应错误码提示;
          this._httpsHandle(err.response.data);
          message.error(CodeMessage[err.response.status], 5);
          return Promise.reject(err.response);
        }
        // 断网处理  跳转到断网页面
        if (!window.navigator.onLine) {
          message.error('网络链接失败', 5);
          return -1;
        }
        return Promise.reject(err);
      }
    );
  };

  /**
   *axios 请求方法返回data中内容
   *@axios 请求调用的方法
   *@url 请求地址
   *@params 请求参数
   *@type 可以传区分json和formdata 默认formdata
   */
  public requstAll = <T>({
    url,
    params,
    type,
    isLoading,
    successMessage,
    error,
    method,
  }: AxiosParams): Promise<T> => {
    const headers = this._setHeaders({ type, isLoading, url });
    const data = method === 'post' ? 'data' : 'params';
    if (params && params.hasOwnProperty('isLoading')) {
      delete params['isLoading'];
    }
    return new Promise((resolve, reject) => {
      this.instance({
        method,
        url,
        [data]: params,
        headers,
        cancelToken: new CancelToken(function executor(c: Canceler) {
          cancel.push(c);
        }),
      })
        .then((res: AxiosResponse<ResponseData<T>>) => {
          const data = res.data;
          this._showError(data, successMessage, error);
          if (data.success) {
            resolve(data.data);
          }
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  // post方法
  public axiosPost = async <T>({
    url,
    params,
    type,
    isLoading,
    successMessage,
    error,
  }: AxiosParams): Promise<T> => {
    return await this.requstAll({
      url,
      params,
      type,
      isLoading,
      successMessage,
      error,
      method: 'post',
    });
  };

  // get 方法
  public axiosGet = async <T>({
    url,
    params,
    type,
    isLoading,
    successMessage,
    error,
  }: AxiosParams): Promise<T> => {
    return await this.requstAll({
      url,
      params,
      type,
      isLoading,
      successMessage,
      error,
      method: 'get',
    });
  };

  // delete方法返回
  public axiosDelete = async <T>({
    url,
    params,
    type,
    isLoading,
    successMessage,
    error,
  }: AxiosParams): Promise<T> => {
    return await this.requstAll({
      url,
      params,
      type,
      isLoading,
      successMessage,
      error,
      method: 'delete',
    });
  };
  /**
   * get获取二进制流中的文件
   *@url 请求地址
   *@params 请求参数
   */
  fetchGetFile<T>({ url, params, type, isLoading }: AxiosParams): Promise<T> {
    const headers = this._setHeaders({ type, isLoading, url });
    return new Promise((resolve, reject) => {
      this.instance({
        method: 'get',
        url,
        params,
        headers,
        responseType: 'blob',
      })
        .then((res: AxiosResponse<T>) => {
          const data = res.data;
          resolve(data);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  /**
   * 错误处理
   * @data
   * @successMessage
   * @error
   */
  _showError = <T>(
    data: ResponseData<T>,
    successMessage: string | undefined,
    error: string | undefined
  ) => {
    // 显示传入的接口成功的提示消息
    if (data.success && successMessage) {
      message.success(successMessage);
    }
    // 显示错误信息
    if (!data.success && error !== 'no') {
      message.error(error ? error : data.stateInfo, 5);
    }
  };

  /**
   * @param type 传入json或者不传，传json则用application/json
   * 不传用formdata
   */
  _setHeaders = ({
    type,
    isLoading,
    url,
  }: HeadersModelIF): { 'Content-Type': string; isLoading: boolean } => {
    let headers = { 'Content-Type': 'application/json', isLoading, isToken: true };
    if (url.includes('不需要token的接口')) {
      headers.isToken = false;
    }
    if (type === 'json') {
      headers['Content-Type'] = 'application/json';
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return headers;
  };

  // http错误代码中的特殊处理
  _httpsHandle(data: ResponseData<null>) {
    if (data.stateCode === '30000004') {
      openNotificationWithIcon();
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  }
}

const JYAxios = new JiayunAxios(getBaseUrl(), 100000);
export { JYAxios, cancel };
