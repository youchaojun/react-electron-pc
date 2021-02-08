import React, { FC } from 'react';
import { Modal } from 'antd';
import IconFont from '@/components/IconFont';
import { ipcRenderer, isElectron } from '@/utils';

const CloseElectron: FC = () => {
  const { confirm } = Modal;

  function showConfirm() {
    confirm({
      title: '退出',
      okText: '确定',
      cancelText: '取消',
      content: '您确定要退出吗？',
      maskClosable: true,
      onOk() {
        if (isElectron) {
          ipcRenderer.send('closeWindow');
        }
      },
    });
  }
  return <IconFont type="icon-shanchuguanbiquxiaowubiankuang" onClick={showConfirm} />;
};
export default CloseElectron;
