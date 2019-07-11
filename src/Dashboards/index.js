import React from 'react';
import { Divider, Row, Col, Card, Icon, Statistic, Tooltip } from 'antd';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import randomColor from 'randomcolor';
import DarWards from '../assets/maps/dar.wards.json';

/**
 * @function
 * @name OverviewDashboard
 * @description Simple dashboard to get overview of data in EMIS
 *
 * @returns {object} React Element
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const OverviewDashboard = () => {
  return (
    <div>
      {/* stakeholder section */}
      <Divider orientation="left">Stakeholders</Divider>
      <Row>
        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Active Focal People"
              value={50}
              prefix={<Icon type="team" style={{ color: '#2C90FF' }} />}
            />
          </Card>
        </Col>

        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Agencies"
              value={20}
              prefix={<Icon type="cluster" style={{ color: '#2C90FF' }} />}
            />
          </Card>
        </Col>

        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Notifications Sent"
              value={3000}
              prefix={<Icon type="mail" style={{ color: '#2C90FF' }} />}
            />
          </Card>
        </Col>

        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Notifications Delivery Rate"
              value={70}
              prefix={<Icon type="check" style={{ color: '#52C41A' }} />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* ward svg map */}
      <ComposableMap
        projectionConfig={{
          scale: 70000,
          xOffset: -70,
          yOffset: -50,
        }}
        width={800}
        height={850}
        style={{
          border: '1px solid #dedede',
          margin: '10px 30px',
        }}
      >
        <ZoomableGroup center={[39.1037144, -6.7923668]}>
          <Geographies geography={DarWards}>
            {(geographies, projection) =>
              geographies.map(geography => {
                // console.log(geography.properties.Female_Pop);
                // console.log(geography.properties.Male_Pop);
                // console.log(geography.properties.Ward_Pop);
                const defaultColor = randomColor({
                  hue: '#00ffff',
                  luminosity: 'light',
                });
                const hoverColor = randomColor({
                  hue: '#00ffff',
                  luminosity: 'dark',
                });
                const pressedColor = randomColor({ hue: '#00ffff' });

                return (
                  <Tooltip
                    key={geography.properties.fid}
                    trigger="hover"
                    title={geography.properties.Ward_Name}
                  >
                    <Geography
                      key={geography.properties.fid}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: defaultColor,
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: hoverColor,
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: pressedColor,
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {/* end ward svg map */}

      {/* end stakeholder section */}

      {/* Resource section */}
      <Divider orientation="left">Resources</Divider>
      <Row>
        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Warehouses"
              value={50}
              prefix={<Icon type="bank" style={{ color: '#2C90FF' }} />}
            />
          </Card>
        </Col>

        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Items in Stock"
              value={20}
              prefix={<Icon type="container" style={{ color: '#2C90FF' }} />}
            />
          </Card>
        </Col>

        <Col span={4} offset={1}>
          <Card>
            <Statistic
              title="Items out of Stock"
              value={4}
              prefix={
                <Icon type="exclamation-circle" style={{ color: '#CF1321' }} />
              }
            />
          </Card>
        </Col>
      </Row>
      {/* end resource section */}
    </div>
  );
};

export default OverviewDashboard;
