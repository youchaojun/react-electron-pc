import React, { ReactElement } from 'react';
import { Input } from 'antd';

export default function PageCache(): ReactElement {
  return (
    <div className="container-padding">
      <p>测试缓存</p>
      <Input style={{ width: '200px' }} />
    </div>
  );
}
