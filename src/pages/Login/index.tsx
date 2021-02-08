import React, { FC, lazy, Suspense, useEffect } from 'react';
import { PageLoading } from '@/components';
import { electron, ipcRenderer, isElectron } from '@/utils';
import CloseElectron from '@/layouts/ElectronMenu/CloseElectron';
import './login.less';

const UpdateModal = lazy(() => import('@/pages/Update'));
const LoginForm = lazy(() => import('./components/LoginForm'));

const Login: FC = () => {
  // 跳转到下载app
  const appDownload = () => {
    const downloadUrl = '你的外方放的app下载地址';
    if (isElectron) {
      electron.shell.openExternal(downloadUrl);
    } else {
      window.open(downloadUrl);
    }
  };

  useEffect(() => {
    if (isElectron) {
      ipcRenderer.send('login-window');
    }
  }, []);
  return (
    <div className="window-size">
      <div className="electron-menu-login">{isElectron ? <CloseElectron /> : null}</div>
      <Suspense fallback={<PageLoading />}>
        {/* 判断是否显示更新弹框 */}
        {isElectron ? <UpdateModal /> : null}
        <LoginForm />
        <div className="login-bottom">
          <p>
            <span>忘记密码</span>
            <span> | </span>
            <span onClick={appDownload}>APP下载</span>
          </p>
          <p className="version">版本： v{process.env.REACT_APP_VERSION}</p>
        </div>
      </Suspense>
    </div>
  );
};

export default Login;
