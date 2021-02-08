import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { UpdateContentIF, DownloadProgressIF } from '../../typings/update';
import { ipcRenderer } from '@/utils';
import './update.less';

const Download: React.FC = () => {
  const [onlineVersion, setOnlineVersion] = useState<string>('');
  const [percent, setPercent] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    downloadProgress();
  }, []);
  // 监听下载进度
  const downloadProgress = () => {
    ipcRenderer.on('message', (_: unknown, text: UpdateContentIF) => {
      if (text.online) {
        setVisible(true);
        setOnlineVersion(text.online);
      } else if (text.text === '下载完成，开始自动安装') {
        setPercent(100);
      }
    });
    ipcRenderer.on('downloadProgress', (_: unknown, progressObj: DownloadProgressIF) => {
      setPercent(Number(progressObj.percent.toFixed(0)));
    });
  };

  return (
    <Modal className="update-modal" visible={visible} closable={false} footer={null}>
      <h3>检测到新版本</h3>
      <p>
        当前版本为：V
        {process.env.REACT_APP_VERSION}
      </p>
      <p>
        线上版本为：V
        {onlineVersion}
      </p>
      <p>
        更新进度：
        {percent} %
      </p>
      <div className="out">
        <div className="inner" style={{ width: `${percent}%` }} />
      </div>
    </Modal>
  );
};

export default Download;
