import React, {useEffect} from 'react';
import Page from "../Page";
import {getToken, isAuthenticated} from "../../utils/methods";

const Login = () => {
  useEffect(() => {
    if (!isAuthenticated()) {
      (async () => {
        return await getToken();
      })();
    }
  }, []);

  return (
    <Page>

    </Page>
  );
};

export default Login;
