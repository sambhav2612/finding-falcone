import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Layout, Menu, Popconfirm} from 'antd';
import {DoubleRightOutlined, HomeOutlined, SettingOutlined} from '@ant-design/icons';
import {isAuthenticated} from "../../utils/methods";

const {Header: AntHeader} = Layout;

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [tab, setTab] = useState<string | number>('home');

  useEffect(() => {
    if (isAuthenticated()) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.substr(1);
    setTab(path);
  }, [location.pathname]);

  const handleKey = (e: any) => {
    setTab(e.key);
    history.push(e.key);
  }

  const logout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    history.push('/login');
  }

  return (
    <AntHeader className="site-layout-sub-header-background">
      <Menu onClick={handleKey} selectedKeys={[tab.toString()]} mode="horizontal">
        {!loggedIn && <Menu.Item key="login" icon={<SettingOutlined/>}>
          Login
        </Menu.Item>}
        <Menu.Item key="home" icon={<HomeOutlined/>}>
          Home
        </Menu.Item>
        <Menu.Item key="result" icon={<DoubleRightOutlined/>}>
          Result
        </Menu.Item>
        {loggedIn && <Menu.Item key="logout">
          <Popconfirm
              title="Are you sure you want to logout?"
              onConfirm={logout}
              okText="Yes"
              cancelText="No"
          >
            <a href="#">Logout</a>
          </Popconfirm>
        </Menu.Item>}
      </Menu>
    </AntHeader>
  );
}

export default Header;
