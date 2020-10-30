import React, {useEffect, useState} from 'react';
import Page from "../Page";
import {getPlanets, getVehicles} from "../../utils/methods";
import {Button, message, Transfer} from "antd";

const Home = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<object>>([]);
  const [targetKeys, setTargetKeys] = useState<Array<object>>([]);
  const [planets, setPlanets] = useState<Array<object>>([]);
  const [vehicles, setVehicles] = useState<Array<object>>([]);

  useEffect(() => {
    (async () => {
      const planetsCopy = Array.from(await getPlanets());
      planetsCopy.forEach((value: any) => {
        value['key'] = value['name'];
      });
      // @ts-ignore
      setPlanets(planetsCopy);
    })();
    (async () => {
      const vehiclesCopy = Array.from(await getVehicles());
      vehiclesCopy.forEach((value: any) => {
        value['key'] = value['name'];
      });
      // @ts-ignore
      setVehicles(vehiclesCopy);
    })();
  }, []);

  const handleChange = (nextTargetKeys: any) => {
    if (nextTargetKeys.length <= 4) {
      setTargetKeys(nextTargetKeys);
    } else {
      message.error('Can not select more than 4 planets at a time!');
      return;
    }
  };

  const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const renderFooter = (props: any) => {
    return props?.titleText === 'Selected' &&
        <Button size="small" type="primary" disabled={props?.dataSource?.length !== 4}
                style={{float: 'right', margin: 5}}>
          Confirm
        </Button>
  };

  return (
    <Page>
      <Transfer
        showSelectAll={false}
        // @ts-ignore
        dataSource={planets || []}
        titles={['Available', 'Selected']}
        // @ts-ignore
        targetKeys={targetKeys || []}
        // @ts-ignore
        selectedKeys={selectedKeys || []}
        render={item => `${item.name} (Distance: ${item.distance})`}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        style={{marginTop: 20}}
        listStyle={{width: 200, height: 300}}
        footer={renderFooter}
      />
    </Page>
  );
};

export default Home;
