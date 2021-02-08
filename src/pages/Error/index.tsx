import { Button, Result } from 'antd';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

const ErrorPage = (): ReactElement => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="你访问的页面没找到"
      extra={
        <Button type="primary" onClick={() => history.goBack()}>
          返回
        </Button>
      }
    />
  );
};

export default ErrorPage;
