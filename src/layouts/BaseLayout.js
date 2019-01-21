import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Row,
} from 'antd';
import React from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Alerts from '../Alerts';
import Assessments from '../Assessments';
import Plans from '../Plans';
import Stakeholders from '../Stakeholders';
import './BaseLayout.css';
import GeographicalFeatures from '../GeographicalFeatures';
import Incidents from '../Incidents';
import Resources from '../Resources';

const { Header, Content } = Layout;
const breadcrumbNameMap = {
  '/': 'Home',
  '/alerts': 'Alerts',
  '/assessments': 'Assessments',
  '/incidents': 'Incidents',
  '/geographicalfeatures': 'Geographical Features',
  '/plans': 'Emergency Plans',
  '/resources': 'Resources',
  '/stakeholders': 'Stakeholders',
};
// profile menu
const userMenu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="profile" />
      Profile
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
);

/**
 * Render base layout for EMIS dashboard
 *
 * @function
 * @name BaseLayout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const BaseLayout = withRouter(props => {
  const { location } = props;

  const pathSnippets = location.pathname.split('/').filter(i => i);

  // generate dynamic breadcrumb items
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <Layout className="BaseLayout">
      <Header className="BaseLayoutHeader">
        <Row type="flex" align="middle">
          {/* breadcrumb section start */}
          <Col span={22}>
            <Breadcrumb className="Breadcrumb" separator=">">
              {breadcrumbItems}
            </Breadcrumb>
          </Col>
          {/* breadcrumb section end */}

          <Col span={2}>
            <Row type="flex" justify="end">
              {/* control showing module navigation menu */}
              {location.pathname !== '/' && (
                <Col span={12}>
                  <Button icon="appstore" />
                </Col>
              )}
              <Col span={12}>
                <Dropdown overlay={userMenu}>
                  <Button
                    style={{ marginLeft: 8, borderRadius: '50%' }}
                    icon="user"
                  />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content className="BaseLayoutContent">
        <Switch>
          <Route exact path="/" />
          <Route path="/alerts" component={Alerts} />
          <Route path="/assessments" component={Assessments} />
          <Route
            path="/geographicalfeatures"
            component={GeographicalFeatures}
          />
          <Route path="/incidents" component={Incidents} />
          <Route path="/plans" component={Plans} />
          <Route path="/resources" component={Resources} />
          <Route path="/stakeholders" component={Stakeholders} />
        </Switch>
      </Content>
    </Layout>
  );
});

export default BaseLayout;
