import { HttpParams } from '@/typings/index';
import { JYAxios } from '../axios';

class HomeApi {
  test({ params }: HttpParams<any>): Promise<any> {
    return JYAxios.axiosGet({
      url: '/xxxx',
      type: 'json',
      params,
      isLoading: true,
    });
  }
}

const homeApi = new HomeApi();

export { homeApi };
