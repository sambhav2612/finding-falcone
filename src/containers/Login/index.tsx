import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Page from "../Page";
import {getToken, isAuthenticated} from "../../utils/methods";
import {message} from "antd";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated()) {
      (async () => {
        await getToken();
        message.success(' Successfully generated API token!');
        history.push('home');
      })();
    }
  }, []);

  return (
    <Page>

    </Page>
  );
};

export default Login;
