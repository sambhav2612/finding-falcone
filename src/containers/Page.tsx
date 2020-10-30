import React from 'react';
import {Layout} from 'antd';
import Header from "../components/Header";
import Footer from "../components/Footer";

const {Content} = Layout;

const Page = (props: any) => {
  return (
    <Layout>
      <Header/>
      <Content style={{margin: '24px 16px 0'}}>
        <div className="site-layout-background" style={{padding: 24, minHeight: 430}}>
          {props.children}
        </div>
      </Content>
      <Footer/>
    </Layout>
  );
};

export default Page;
