import React, { FC } from 'react';
import { Spin } from 'antd';

const PageLoading: FC = () => {
  return (
    <div className="center">
      <Spin size="large" tip="加载中…"></Spin>
    </div>
  );
};

export default PageLoading;
