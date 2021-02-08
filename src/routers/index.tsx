import React, { FC, Suspense, ReactType, lazy } from 'react';
import {
  HashRouter,
  BrowserRouter,
  Route,
  RouteComponentProps,
  Switch,
  Redirect,
} from 'react-router-dom';
import routerInsiderConfig from './routerInsiderConfig';
import SiderLayout from '@/layouts/SiderLayout';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import { Content } from '@/layouts';
import { isElectron, listFlat } from '@/utils';
import { RouterStateIF } from '@/typings/router';
import { PageLoading } from '@/components';
import Login from '@/pages/Login';

const ErrorPage = lazy(() => import('@/pages/Error'));

const Routers: FC = () => {
  // electron只能用hash路由 浏览器用BrowserRouter
  const Router: ReactType = isElectron ? HashRouter : BrowserRouter;

  // catch router的生命周期
  // interface ISProps extends RouteComponentProps {
  //   cacheLifecycles: {
  //     didRecover: any;
  //     didCache: any;
  //   };
  // }

  const renderRoutes = () => {
    const routerList = listFlat(routerInsiderConfig);
    return routerList.map((route) => (
      <CacheRoute
        key={route.id}
        when={() => route.cache}
        path={route.path}
        cacheKey={route.basePath}
        exact
        component={(props: RouteComponentProps<null, { statusCode?: number }, RouterStateIF>) => (
          <Content {...props} component={route.component} />
        )}
      />
    ));
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        {/* 有sider的页面 InnerSider */}
        <SiderLayout>
          <Suspense fallback={<PageLoading />}>
            <CacheSwitch>
              {renderRoutes()}
              <Route path="/error" component={ErrorPage} />
              <Redirect to="/error" />
            </CacheSwitch>
          </Suspense>
        </SiderLayout>
      </Switch>
    </Router>
  );
};

export default Routers;
