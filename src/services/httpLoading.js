import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
// 当前正在请求的数量
let requestCount = 0;

// 显示loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const showLoading = () => {
  if (requestCount === 0) {
    const dom = document.createElement('div');

    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    // eslint-disable-next-line react/react-in-jsx-scope
    ReactDOM.render(<Spin className="global-loading" tip="加载中..." size="large" />, dom);
  }
  requestCount++;
};

// 隐藏loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hideLoading = () => {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading'));
  }
};
