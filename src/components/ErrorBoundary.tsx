import React from 'react';
import { Button, Result } from 'antd';
import { withRouter } from 'react-router-dom';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // 你同样可以将错误日志上报给服务器
    this.putError(error);
    console.warn('打印错误', error);
  }

  putError = (error: Error) => {
    console.error(error);
    const type = process.env.REACT_APP_ENV;

    if (type !== 'dev') {
      // 错误上报
    }
  };
  render() {
    const { history, children, type } = this.props;
    const { hasError } = this.state;
    const content = (
      <div>
        <p>页面发生了点小问题，给您带来的不变我们深表歉意！！！</p>
        <p>您可以联系相关人员尽快跟踪处理此问题</p>
        <p>我们会尽快处理</p>
      </div>
    );
    if (hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className="error-boundary">
          <Result
            status="error"
            title="页面发生了点小问题"
            subTitle={content}
            extra={[
              type === 'inner' ? (
                <Button type="primary" key="console" onClick={() => history.goBack()}>
                  返回上一页
                </Button>
              ) : (
                <Button type="primary" key="console" onClick={() => history.push('/home')}>
                  返回首页
                </Button>
              ),
            ]}
          ></Result>
        </div>
      );
    }

    return children;
  }
}
export default withRouter(ErrorBoundary);
