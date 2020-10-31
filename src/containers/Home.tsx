import React, {useEffect, useState} from 'react';
import Page from "./Page";
import {getPlanets, getVehicles, find, isAuthenticated} from "../utils/methods";
import {Button, message, Row, Col, Transfer, Card} from "antd";
import Vehicle from "../components/Vehicle";

const Home = () => {
  const [confirmed, setConfirmed] = useState<boolean>(false);
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
        value['confirmed'] = false;
        value['added'] = -1;
      });
      // @ts-ignore
      setVehicles(vehiclesCopy);
    })();
  }, []);

  // @ts-ignore
  const forceUpdate: () => void = React.useState()[1].bind(null, {})

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
        <Button size="small" type="primary" disabled={props?.dataSource?.length !== 4 || confirmed}
                style={{float: 'right', margin: 5}} onClick={e => setConfirmed(true)}>
          Confirm
        </Button>
  };

  const confirmVehicle = (key: string, value: number) => {
    vehicles.forEach((vehicle: any) => {
      if (vehicle['name'] === key) {
        vehicle['confirmed'] = true;
        vehicle['added'] = Number(value);
      }
    });
    setVehicles(vehicles);
    forceUpdate();
  };

  const getResult = async (e: any) => {
    e.preventDefault();
    if (confirmedSum === 4) {
      const payload = {
        token: isAuthenticated(),
        planet_names: targetKeys,
        vehicle_names: []
      };
      vehicles.filter((vehicle: any) => vehicle.confirmed && vehicle.added)
        .map((vehicle: any) => {
          for (let i = 0; i < vehicle.added; i++) {
            // @ts-ignore
            payload.vehicle_names.push(vehicle.name);
          }
          return 0;
        });

      await find(payload);
    } else {
      message.error('Total vehicle count needs to be 4!');
      vehicles.forEach((vehicle: any) => {
        vehicle['confirmed'] = false;
        vehicle['added'] = -1;
      });
      setVehicles(vehicles);
      forceUpdate();
    }
  }

  const confirmedCount = vehicles.reduce((a, b: any) => {
    return a && b['confirmed'];
  }, true);

  const confirmedSum = vehicles.filter((vehicle: any) => vehicle.confirmed)
    .reduce((a, b: any) => {
      return a + b['added'];
    }, 0);

  const timeTaken = vehicles.filter((vehicle: any) => vehicle.confirmed && vehicle.added)
    .reduce((a, b: any) => {
      return a + Number(b.max_distance / b.speed) * Number(b.added);
    }, 0);

  return (
    <Page>
      <Row gutter={16} style={{alignItems: 'center'}}>
        <Col span={12}>
          <Card title="Select Planets" style={{height: 450, marginTop: 20}}>
            <Transfer
              showSelectAll={false}
              disabled={confirmed}
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
              listStyle={{width: 200, height: 350}}
              footer={renderFooter}
            />
          </Card>
        </Col>
        {confirmed && <Col span={12}>
          <Card title={`Select Vehicle and Quantities | Time Taken: ${timeTaken}`} style={{height: 450, marginTop: 20}}>
            {vehicles?.length && vehicles.map(vehicle => <Vehicle data={vehicle} confirmVehicle={confirmVehicle}/>)}
          </Card>
        </Col>}
      </Row>
      <Row style={{marginTop: 30}}>
        <Button type="primary" size="large" block disabled={!confirmedCount} onClick={getResult}>Go!</Button>
      </Row>
    </Page>
  );
};

export default Home;
