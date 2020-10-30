import React from 'react';
import Header from "../components/Header";

const Page = (props: any) => {
  return (
    <div>
      <Header/>
      <div className="children">
        {props.children}
      </div>
    </div>
  );
};

export default Page;
