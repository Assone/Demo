import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import config from '@/config/api';

class HttpRequest {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = Axios.create(config);

    this.interceptors(this.instance);
  }

  interceptors(instance: AxiosInstance) {
    instance.interceptors.request.use((config: AxiosRequestConfig) => config);
    instance.interceptors.response.use((res: AxiosResponse) => {
      const { data, status } = res;

      return status === 200 && data
        ? Promise.resolve(data)
        : Promise.reject(res);
    });
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }
}

export default new HttpRequest(config);
