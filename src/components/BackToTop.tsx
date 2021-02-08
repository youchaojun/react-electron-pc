import React, { FC } from 'react';
import { BackTop } from 'antd';
import IconFont from './IconFont';

interface ISProps {
  dom?(): HTMLElement | Window | Document;
  scroll?: number;
}

const BackToTop: FC<ISProps> = ({ scroll, dom }: ISProps) => {
  return (
    <BackTop visibilityHeight={scroll ? scroll : 100} target={dom}>
      <IconFont className="anticon-vertical-align-top" style={{ color: '#fff' }} type="icon-12" />
    </BackTop>
  );
};
export default BackToTop;
