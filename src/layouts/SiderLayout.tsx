import React from 'react';
import { Layout } from 'antd';
import Copyright from './Copyright';
import { ErrorBoundary, SubMenuLeft } from '@/components';
import ElectronMenu from './ElectronMenu';
import MenuTab from './MenuTab';
import './layout.less';

const { Header, Content } = Layout;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const SiderLayout = ({ children }: any) => {
  return (
    <Layout>
      <Header className="menu-top" style={{ padding: 0, height: '50px' }}>
        <ErrorBoundary type="all">
          <ElectronMenu />
        </ErrorBoundary>
      </Header>
      <Layout>
        <SubMenuLeft />
        <Content>
          <ErrorBoundary type="all">
            <MenuTab />
          </ErrorBoundary>
          {children}
          <Copyright />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderLayout;
