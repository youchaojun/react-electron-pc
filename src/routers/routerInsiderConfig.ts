import { RoutersConfigIF } from '../typings/router';
import { home } from './home';

let number = 0;
const routerInsiderConfig: Array<RoutersConfigIF> = [...home];

// 处理id
const routerConfig = addRouterId(routerInsiderConfig);

function addRouterId(routers: RoutersConfigIF[]): RoutersConfigIF[] {
  return routers.map((val) => {
    number++;
    val.id = number;
    if (val.children) {
      addRouterId(val.children);
    }
    return val;
  });
}

export default routerConfig;
