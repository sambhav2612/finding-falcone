import React from 'react';
import {useHistory} from 'react-router-dom';
import Page from "./Page";
import {getToken, isAuthenticated} from "../utils/methods";
import {Button, message} from "antd";

const Login = () => {
  const history = useHistory();

  const login = async (e: any) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      await getToken();
      message.success('Successfully logged in!');
      history.push('home');
    }
  }

  return (
    <Page>
      <Button type="primary" size="large" onClick={login} style={{marginTop: 20}}>Login</Button>
    </Page>
  );
};

export default Login;
