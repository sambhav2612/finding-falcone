import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom'
import Page from "../Page";
import {Result as AntResult, Button, message} from "antd";

const queryString = require('query-string');
const Result = () => {
  const history = useHistory();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (!Object.keys(parsed).length) {
      message.error('Invalid navigation!');
      history.replace('/home');
    }
  }, [parsed]);

  return (
    <Page>
      <AntResult
        status={parsed?.status}
        title={`Submission ${parsed?.status === 'success' ? "Successful!" : "Failed!"}`}
        subTitle={parsed?.status === 'error' ? "Please check and modify the information before resubmitting." : `Planet Name is: ${parsed?.planet}`}
        extra={[
          <Button type="primary" key="try-again" onClick={e => history.replace('/home')}>Try Again</Button>,
        ]}
      />
    </Page>
  );
};

export default Result;
