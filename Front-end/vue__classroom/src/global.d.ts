import Vue from 'vue';
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue {
    $api: {
      get<T>(path: string): Promise<T>;
    };
  }
}

declare module 'mockjs' {
  export function mock(path: string, response: Function | object);
  export function mock(
    path: string,
    method: string,
    response: Function | object
  );
}
