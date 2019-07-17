import React, { useState } from 'react';
import { Tooltip, Row, Col, Card, Typography } from 'antd';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { formatNumber, getRGBAColor } from '../util';
import DarWards from '../assets/maps/dar.wards.json';

/* declarations */
const { Text } = Typography;
const DAR_POPULATION = 4365000;
const BASE_COLOR = '#ff0000';

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
  const [ward, setWard] = useState(null);

  return (
    <div>
      <Row>
        <Col span={16}>
          {/* ward svg map */}
          <ComposableMap
            projectionConfig={{
              scale: 90000,
              xOffset: -70,
              yOffset: -50,
            }}
            width={1000}
            height={850}
            style={{
              margin: '10px 50px',
            }}
          >
            <ZoomableGroup center={[39.1037144, -6.7923668]}>
              <Geographies geography={DarWards} disableOptimization>
                {(geographies, projection) =>
                  geographies.map(geography => {
                    const defaultColor = getRGBAColor(
                      BASE_COLOR,
                      (geography.properties.Ward_Pop / DAR_POPULATION) * 10
                    );

                    const hoverColor = getRGBAColor(BASE_COLOR, 0.55);
                    const pressedColor = getRGBAColor(BASE_COLOR, 0.75);

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
                          onClick={() => setWard(geography.properties)}
                          style={{
                            default: {
                              fill:
                                ward && geography.properties.fid === ward.fid
                                  ? pressedColor
                                  : defaultColor,
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
        </Col>

        {/* Ward summary card */}
        <Col span={8}>
          <div style={{ margin: '20px 10px' }}>
            <Card title="Ward Summary">
              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Ward : </Text>
                  </Col>
                  <Col span={12}> {ward ? ward.Ward_Name : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> District : </Text>
                  </Col>
                  <Col span={12}> {ward ? ward.District_N : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Population : </Text>
                  </Col>
                  <Col span={12}>
                    {ward ? formatNumber(ward.Ward_Pop) : 'N/A'}
                  </Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Male Population : </Text>
                  </Col>
                  <Col span={12}>
                    {ward ? formatNumber(ward.Male_Pop) : 'N/A'}
                  </Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Female Population : </Text>
                  </Col>
                  <Col span={12}>
                    {ward ? formatNumber(ward.Female_Pop) : 'N/A'}
                  </Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Below 10 Years Population : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Above 65 Years Population : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Evacuation Centers : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Health Centers : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Households at risk : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>

              <p>
                <Row>
                  <Col span={12}>
                    <Text strong> Focal Person : </Text>
                  </Col>
                  <Col span={12}> {ward ? 'N/A' : 'N/A'}</Col>
                </Row>
              </p>
            </Card>
          </div>
        </Col>
        {/* end ward summary card */}
      </Row>
    </div>
  );
};

export default OverviewDashboard;
