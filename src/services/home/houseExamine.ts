import { HttpParams } from '@/typings/common';
import { JYAxios } from '../axios';

class HomeHouse {
  examineList({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosPost({
      url: '/xxxxxxx',
      type: 'json',
      isLoading: true,
      params,
    });
  }
}

const homeHouse = new HomeHouse();

export { homeHouse };
