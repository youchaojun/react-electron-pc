import React, { ReactElement, useEffect } from 'react';
import { useScrollTop } from '@/components';
import style from './style.module.less';

export default function ScrollTop(): ReactElement {
  const scrollTop = useScrollTop();
  const list: number[] = [];
  for (let i = 0; i < 1000; i++) {
    list.push(i);
  }
  useEffect(() => {
    scrollTop.setScrollTop();
  }, [location, scrollTop, history]);
  return (
    <div
      id="scrollTop"
      onScroll={() => {
        scrollTop.getScrollTop();
      }}
      className={style['box']}
    >
      {list.map((val) => (
        <p key={val}>列表 {val}</p>
      ))}
    </div>
  );
}
