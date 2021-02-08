import React, { FC, ReactElement } from 'react';
import { LoginStateIF } from '@/store/states';
import { LoginReducerIF } from '@/store/reducers';
import { useSelector } from 'react-redux';
import UserModal from './UserModal';

const TopSider: FC = (): ReactElement => {
  const result = useSelector<LoginReducerIF, LoginStateIF>((state) => state.loginReducer);
  const userInfo = result.userInfo;

  return (
    <div className="menu-header-top">
      {userInfo ? (
        <div className="right">
          <div className="meissage-verify"></div>
          <div className="text">
            <p>xxxxxx</p>
            <p>|</p>
            <p>xxxxxxx</p>
            <p>|</p>
            <p>xxxxxxxx</p>
          </div>
          <div
            className="user-icon"
            style={{
              backgroundImage: `url('${userInfo.avatar ? userInfo.avatar : ''}')`,
            }}
          >
            <UserModal userName={userInfo.username} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopSider;
