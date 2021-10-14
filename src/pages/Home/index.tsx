import React, { FC, ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { homeHouse } from '@/services/home/houseExamine';
import { cancel } from '@/services/axios';
import './home.less';

const HomePage: FC = (): ReactElement => {
  useEffect(() => {
    // homeHouse.examineList({}).then((res) => {
    //   console.log(res);
    // });
    // homeHouse.examineList2({}).then((res) => {
    //   console.log(res);
    // });
    // setTimeout(() => {
    //   cancel('取消');
    // }, 100);
  }, []);

  /**
   * 开始请求
   */

  function requestStart() {
    homeHouse.examineList({}).then((res) => {
      console.log(res);
    });
    homeHouse.examineList2({}).then((res) => {
      console.log(res);
    });
  }

  /**
   * 取消请求
   */

  function canelRequest() {
    for (const val of cancel) {
      val('取消');
    }
  }

  return (
    <div className="container-padding">
      <Button type="primary" onClick={requestStart}>
        开始请求
      </Button>
      <Button onClick={canelRequest}>取消请求</Button>
      <p>首页</p>
      <Button>
        <Link
          to={{
            pathname: '/scrollTop/111',
            state: {
              tabName: 'tab名字1',
              tabMore: true,
              id: 11,
            },
          }}
        >
          同一页面多个tab1
        </Link>
      </Button>
      <Button>
        <Link
          to={{
            pathname: '/scrollTop/232',
            state: {
              tabName: 'tab名字2',
              tabMore: true,
              id: 22,
            },
          }}
        >
          同一页面多个tab2
        </Link>
      </Button>
      <Button>
        <Link to="/children">子路由</Link>
      </Button>
      <Button>
        <Link
          to={{
            pathname: '/iframeTest/101',
            state: {
              tabName: '测试iframe1',
              tabMore: true,
              id: 101,
            },
          }}
        >
          测试iframe1
        </Link>
      </Button>
      <Button>
        <Link
          to={{
            pathname: '/iframeTest/102',
            state: {
              tabName: '测试iframe2',
              tabMore: true,
              id: 102,
            },
          }}
        >
          测试iframe2
        </Link>
      </Button>
    </div>
  );
};

export default HomePage;
