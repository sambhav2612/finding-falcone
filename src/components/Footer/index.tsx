import React from 'react';
import {Layout} from 'antd';

const {Footer: AntFooter} = Layout;

const Footer = () => {
  return (
    <AntFooter style={{textAlign: 'center'}}>Finding Falcone ©2020 Created by{' '}
      <a href="mailto:sambhavjain2612@gmail.com">Sambhav Jain</a>
    </AntFooter>
  );
};

export default Footer;
