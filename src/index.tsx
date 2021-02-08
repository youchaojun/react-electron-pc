import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/routers/index';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import store from './store';
import '@/assets/styles/index.less';
import '@/assets/styles/antdChange.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
