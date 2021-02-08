import React, { FC, ReactElement } from 'react';
import { RouterPropsIF } from '@/typings/router';
import { Modal } from 'antd';
import { ipcRenderer, isElectron } from '@/utils';
import { ErrorBoundary } from '@/components';

let timer: ReturnType<typeof setTimeout>;
// 设置两小时未操作则需要重新登录
let second = 7200;

window.addEventListener('mousemove', () => {
  if (second > 0) {
    second = 7200;
  }
});

const Content: FC<RouterPropsIF> = ({
  component: Component,
  history,
}: RouterPropsIF): ReactElement => {
  if (!timer) {
    timer = setInterval(() => {
      second--;
      if (second < 0) {
        clearInterval(timer);
        warning();
      }
    }, 1000);
  }
  function warning() {
    Modal.error({
      content: '由于您长时间未操作，请重新登录',
      icon: '',
      centered: true,
      okText: '去登录',
      className: 'user-overtime-action',
      keyboard: false,
      width: '280px',
      onOk: () => {
        history.push('/');
        if (isElectron) {
          ipcRenderer.send('login-window');
        }
        window.location.reload();
      },
    });
  }

  return (
    <ErrorBoundary type="inner">
      <div id="mainContainer" className="main-container">
        <Component />
      </div>
    </ErrorBoundary>
  );
};

export default Content;
