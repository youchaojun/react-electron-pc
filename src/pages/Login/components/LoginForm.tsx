import React, { FC, lazy, ReactElement } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { phoneReg } from '@/utils/regular';
import { useHistory } from 'react-router-dom';
import { ipcRenderer, isElectron } from '@/utils';

const SetThemes = lazy(() => import('./SetThemes'));

const LoginForm: FC = (): ReactElement => {
  const history = useHistory();
  const onFinish = () => {
    history.push('/home');
    if (isElectron) {
      ipcRenderer.send('other-window');
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <Form onFinish={onFinish} className="login-form">
            <Form.Item
              name="username"
              rules={[
                {
                  pattern: phoneReg,
                  required: true,
                  message: '手机号格式不正确',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入手机号码"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="smsCode"
              style={{ marginBottom: '24px' }}
              rules={[{ required: true, pattern: /^[0-9]{4}$/, message: '验证码格式不正确' }]}
            >
              <div className="login-verification">
                <Input placeholder="请输入验证码" type="tel" />
                <Button>发送验证码</Button>
              </div>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <SetThemes />
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
