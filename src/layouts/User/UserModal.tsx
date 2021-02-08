import React, { FC, ReactElement } from 'react';
import { Modal } from 'antd';
import {
  UserSwitchOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

interface ISPropsIF {
  userName: string;
}

const UserModal: FC<ISPropsIF> = ({ userName }: ISPropsIF): ReactElement => {
  const history = useHistory();

  // 退出登录
  const logOut = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('jyUserInfo');
    // 这里不能用window.location.href = '/' electron中不能跳转
    history.push('/');
    window.location.reload();
  };
  // 确认是否要退出登录
  const confirm = () => {
    Modal.confirm({
      content: '您确定要退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: (close: Function) => {
        logOut();
        close();
      },
    });
  };

  return (
    <div className="user-message">
      <div className="user-container">
        <div>
          <UserSwitchOutlined />
          <span>{userName}</span>
          <span>切换</span>
        </div>
        <div>
          <UserOutlined />
          <span>个人中心</span>
        </div>
        <div>
          <SettingOutlined />
          <span>修改密码</span>
        </div>
        <div className="go-out" onClick={confirm}>
          <LogoutOutlined />
          <span>退出登录</span>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
