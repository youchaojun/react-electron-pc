import { HttpParams } from '@/typings/common';
import { JYAxios } from '../axios';

class HomeHouse {
  examineList({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosPost({
      url: '/demo',
      type: 'json',
      isLoading: true,
      params,
    });
  }
  examineList2({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosPost({
      url: '/demo',
      type: 'json',
      isLoading: true,
      params,
    });
  }
}

const homeHouse = new HomeHouse();

export { homeHouse };
