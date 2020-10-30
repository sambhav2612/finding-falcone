import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Page from "../Page";
import {getToken, isAuthenticated} from "../../utils/methods";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    if (!isAuthenticated()) {
      (async () => {
        await getToken();
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
