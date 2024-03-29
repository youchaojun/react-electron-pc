import { HttpParams } from '@/typings/common';
import { JYAxios } from '../axios';

class HomeHouse {
  examineList({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosPost({
      url: '/youn/test',
      type: 'json',
      isLoading: false,
      params,
    });
  }
  examineList2({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosPost({
      url: '/youn/test',
      type: 'json',
      isLoading: false,
      params,
    });
  }
}

const homeHouse = new HomeHouse();

export { homeHouse };
