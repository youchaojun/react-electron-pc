import React, { FC } from 'react';
import { Spin } from 'antd';

const EmptyPage: FC = () => {
  return (
    <div className="container-block" style={{ textAlign: 'center' }}>
      <Spin style={{ paddingTop: '45vh' }} size="large" />
    </div>
  );
};
export default EmptyPage;
