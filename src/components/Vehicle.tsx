import React, {useState} from 'react';
import {Card, Input, message, Button} from "antd";
import {CheckOutlined} from '@ant-design/icons';

// @ts-ignore
const Vehicle = ({data, confirmVehicle}) => {
  const [added, setAdded] = useState<number | string>(data?.added || -1);
  const onChange = (e: any) => {
    if (e?.target?.value <= data?.total_no) {
      setAdded(e?.target?.value)
    } else {
      message.error(`Maximum value allowed is ${data?.total_no}!`);
      return;
    }
  }

  return (
    <Card.Grid hoverable style={{padding: 10, width: '45%', height: 170, margin: 5}}>
      <p><strong>{data?.name}</strong></p>
      <p style={{margin: 0}}>Available: {data?.total_no}</p>
      <p style={{margin: 0}}>Max Distance: {data?.max_distance}</p>
      <p>Max Speed: {data?.speed}</p>
      <div style={{flex: 1, flexDirection: 'row'}}>
        <Input addonBefore="Added"
               addonAfter={added >= 0 &&
               <Button type="primary" size="small" shape="circle" icon={<CheckOutlined/>} disabled={data?.confirmed}
                       onClick={e => confirmVehicle(data?.name, added)}/>}
               placeholder={data?.total_no} value={added} type="number" disabled={data?.confirmed}
               onChange={onChange}/>
      </div>
    </Card.Grid>
  );
};

export default Vehicle;
