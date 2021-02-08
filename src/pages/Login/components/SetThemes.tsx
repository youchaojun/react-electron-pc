import React, { FC, ReactElement, useEffect } from 'react';
import { themeList } from '@/utils';

const SetThemes: FC = (): ReactElement => {
  const setTheme = (index: number): void => {
    for (let val of themeList) {
      val.select = false;
    }
    themeList[index].select = true;
    localStorage.setItem('themeCount', `${index}`);
    window.less
      .modifyVars(themeList[index])
      .then(() => {
        // eslint-disable-next-line no-console
        console.info('主题切换成功');
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  // 初始化更改主题
  useEffect(() => {
    setTheme(0);
  }, []);
  return (
    <>
      <p>主题选择</p>
      <div className="select-color">
        {themeList.map((val, index) => (
          <div
            onClick={() => setTheme(index)}
            className="choice"
            style={{ background: val['@btn-primary-bg'] }}
            key={val['@btn-primary-bg']}
          ></div>
        ))}
      </div>
    </>
  );
};

export default SetThemes;
