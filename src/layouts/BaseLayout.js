import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Row,
  Popover,
} from 'antd';
import React from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Alerts from '../Alerts';
import Assessments from '../Assessments';
import EmergencyPlans from '../Plans';
import Stakeholders from '../Stakeholders';
import GeographicalFeatures from '../GeographicalFeatures';
import Incidents from '../Incidents';
import Resources from '../Resources';
import AlertsLayout from '../Alerts/layouts/Alerts';
import AlertsActionsLayout from '../Alerts/layouts/Actions';
import AlertsFeedbackLayout from '../Alerts/layouts/Feedback';
import AlertsFeedsLayout from '../Alerts/layouts/Feeds';
import AlertsServiceRequestsLayout from '../Alerts/layouts/ServiceRequests';
import AlertsSourcesLayout from '../Alerts/layouts/Sources';
import AssessmentsQuestionnairesLayout from '../Assessments/layouts/Questionnaires';
import AssessmentsQuestionsLayout from '../Assessments/layouts/Questions';
import AssessmentsIndicatorsLayout from '../Assessments/layouts/Indicators';
import AssessmentsResponsesLayout from '../Assessments/layouts/Responses';
import EmergencyPlanPlannerLayout from '../Plans/layouts/Planner';
import EmergencyPlanActivationsLayout from '../Plans/layouts/Activations';
import EmergencyPlanActivitiesLayout from '../Plans/layouts/Activities';
import EmergencyPlanDisseminationsLayout from '../Plans/layouts/Disseminations';
import EmergencyPlanDrillsLayout from '../Plans/layouts/Drills';
import EmergencyPlanProceduresLayout from '../Plans/layouts/Procedures';
import IncidentsCommandCenterLayout from '../Incidents/layouts/CommandCenter';
import IncidentsAssessmentsLayout from '../Incidents/layouts/Assessments';
import IncidentsActionsLayout from '../Incidents/layouts/Actions';
import IncidentsFeedsLayout from '../Incidents/layouts/Feeds';
import IncidentsLossDatabaseLayout from '../Incidents/layouts/LossDatabase';
import IncidentsIncidentTypesLayout from '../Incidents/layouts/IncidentTypes';
import ResourcesItemsLayout from '../Resources/layouts/Items';
import ResourcesAdjustmentsLayout from '../Resources/layouts/Adjustments';
import ResourcesUtilizationLayout from '../Resources/layouts/Utilization';
import ResourcesStockLayout from '../Resources/layouts/Stock';
import ResourcesWarehousesLayout from '../Resources/layouts/Warehouses';
import StakeholdersContactsLayout from '../Stakeholders/layouts/Contacts';
import StakeholdersRolesLayout from '../Stakeholders/layouts/Roles';
import StakeholdersNotificationsLayout from '../Stakeholders/layouts/Notifications';
import AdministrativeBoundariesLayout from '../GeographicalFeatures/layouts/AdministrativeBoundaries';
import GeographicalFeaturesWarehousesLayout from '../GeographicalFeatures/layouts/Warehouses';
import GeographicalFeaturesFacilitiesLayout from '../GeographicalFeatures/layouts/Facilities';
import GeographicalFeaturesInfrastructureLayout from '../GeographicalFeatures/layouts/Infrastructure';
import Home from '../Home';
import HeaderNavMenu from './components/HeaderNavMenu';
import './styles.css';
import EvacuationCentersLayout from '../GeographicalFeatures/layouts/EvacuationCenters';

const { Header, Content } = Layout;
const breadcrumbNameMap = {
  '/': { name: 'Home', title: 'EMIS' },
  /* Alerts Routes */
  '/alerts': { name: 'Alerts', title: 'Alerts module' },
  '/alerts/actions': {
    name: 'Actions Taken',
    title: 'List of all performed actions',
  },
  '/alerts/feedback': {
    name: 'Surveys & Feedback',
    title: 'Alerts surveys and feedback',
  },
  '/alerts/feeds': { name: 'Feeds', title: 'Alerts feeds' },
  '/alerts/alerts': { name: 'Issued Alerts', title: 'List of all alerts' },
  '/alerts/servicerequests': {
    name: 'Service Requests',
    title: 'Alerts service requests',
  },
  '/alerts/sources': {
    name: 'Alerts Sources',
    title: 'Data sources for alerts',
  },
  /* Assessments Routes */
  '/assessments': { name: 'Assessments', title: 'Assessments module' },
  '/assessments/indicators': {
    name: 'Indicators',
    title: 'Indicators for monitoring assessments',
  },
  '/assessments/questionnaires': {
    name: 'Questionnaires',
    title: 'List of questionnaires',
  },
  '/assessments/questions': {
    name: 'Questions',
    title: 'List of questions',
  },
  '/assessments/responses': {
    name: 'Responses & Observations',
    title: 'Responses and observations',
  },
  /* Geographical Features Routes */
  '/geographicalfeatures/administrativeboundaries': {
    name: 'Administrative Boundaries',
    title: 'List of administrative boundaries',
  },
  '/geographicalfeatures/evacuationcenters': {
    name: 'Evacuation Centers',
    title: 'List of evacuation centers',
  },
  '/geographicalfeatures/facilities': {
    name: 'Facilities',
    title: 'Facilities available',
  },
  '/geographicalfeatures/infrastructure': {
    name: 'Critical Infrastructure',
    title: 'List of critical infrastructures ',
  },
  '/geographicalfeatures': {
    name: 'Geographical Features',
    title: 'Geographical features module',
  },
  '/geographicalfeatures/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  /* Incidents Routes */
  '/incidents/actions': {
    name: 'Actions',
    title: 'Incident actions performed',
  },
  '/incidents/assessments': {
    name: 'Assessments',
    title: 'Assessment of an incident',
  },
  '/incidents/commandcenter': {
    name: 'Command Center',
    title: 'Incidents command center',
  },
  '/incidents/feeds': { name: 'Feeds', title: 'Incident feeds' },
  '/incidents': { name: 'Incidents', title: 'Incidents module' },
  '/incidents/incidenttypes': {
    name: 'Incidents Types',
    title: 'List of Incidents Types',
  },
  '/incidents/lossdatabase': {
    name: 'Loss Database',
    title: 'List of previous incidents',
  },
  /* Plans Routes */
  '/plans/activations': { name: 'Activations', title: 'Plans activation' },
  '/plans/activities': { name: 'Activities', title: 'Plans Activities' },
  '/plans/disseminations': {
    name: 'Disseminations',
    title: 'Dissemination of plans',
  },
  '/plans/drills': {
    name: 'Drills & Exercises',
    title: 'List of drills and exercises',
  },
  '/plans': { name: 'Emergency Plans', title: 'Emergency plans module' },
  '/plans/planner': { name: 'Planner', title: 'Planner' },
  '/plans/procedures': {
    name: 'Standard Operating Procedures',
    title: 'Standard Operating Procedures(SOP)',
  },
  /* Resources Routes */
  '/resources/adjustments': {
    name: 'Adjustments',
    title: 'List of adjusted resources',
  },
  '/resources/items': { name: 'Items', title: 'List of available items' },
  '/resources': { name: 'Resources', title: 'Resource module' },
  '/resources/stock': { name: 'Stock', title: 'List of available stock' },
  '/resources/utilization': {
    name: 'Utilizations',
    title: 'Resource utilizations',
  },
  '/resources/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  /* Stakeholders Routes */
  '/stakeholders/contacts': { name: 'Contacts', title: 'List of all contacts' },
  '/stakeholders/notifications': {
    name: 'Notifications',
    title: 'Notify stakeholders',
  },
  '/stakeholders/roles': {
    name: 'Roles',
    title: 'Roles and responsibilities of Stakeholders',
  },
  '/stakeholders': { name: 'Stakeholders', title: 'Stakeholders module' },
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
  const lastPath = pathSnippets[pathSnippets.length - 1];

  // generate dynamic breadcrumb items
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    if (breadcrumbNameMap[url]) {
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url} title={breadcrumbNameMap[url].title}>
            {breadcrumbNameMap[url].name}
          </Link>
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb.Item key={url}>
        <span title={lastPath}>{lastPath}</span>
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
                  <Popover
                    placement="bottom"
                    content={<HeaderNavMenu />}
                    trigger="click"
                  >
                    <Button icon="appstore" />
                  </Popover>
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
          <Route exact path="/" component={Home} />
          <Route exact path="/alerts" component={Alerts} />
          <Route path="/alerts/alerts" component={AlertsLayout} />
          <Route path="/alerts/actions" component={AlertsActionsLayout} />
          <Route path="/alerts/feeds" component={AlertsFeedsLayout} />
          <Route path="/alerts/feedback" component={AlertsFeedbackLayout} />
          <Route path="/alerts/sources" component={AlertsSourcesLayout} />
          <Route
            path="/alerts/servicerequests"
            component={AlertsServiceRequestsLayout}
          />
          <Route exact path="/assessments" component={Assessments} />
          <Route
            path="/assessments/indicators"
            component={AssessmentsIndicatorsLayout}
          />
          <Route
            path="/assessments/questionnaires"
            component={AssessmentsQuestionnairesLayout}
          />
          <Route
            path="/assessments/questions"
            component={AssessmentsQuestionsLayout}
          />
          <Route
            path="/assessments/responses"
            component={AssessmentsResponsesLayout}
          />
          <Route
            exact
            path="/geographicalfeatures"
            component={GeographicalFeatures}
          />
          <Route
            exact
            path="/geographicalfeatures/administrativeboundaries"
            component={AdministrativeBoundariesLayout}
          />
          <Route
            exact
            path="/geographicalfeatures/evacuationcenters"
            component={EvacuationCentersLayout}
          />
          <Route
            exact
            path="/geographicalfeatures/infrastructure"
            component={GeographicalFeaturesInfrastructureLayout}
          />
          <Route
            exact
            path="/geographicalfeatures/warehouses"
            component={GeographicalFeaturesWarehousesLayout}
          />
          <Route
            exact
            path="/geographicalfeatures/facilities"
            component={GeographicalFeaturesFacilitiesLayout}
          />
          <Route exact path="/incidents" component={Incidents} />
          <Route
            exact
            path="/incidents/commandcenter"
            component={IncidentsCommandCenterLayout}
          />
          <Route
            exact
            path="/incidents/assessments"
            component={IncidentsAssessmentsLayout}
          />
          <Route
            exact
            path="/incidents/actions"
            component={IncidentsActionsLayout}
          />
          <Route
            exact
            path="/incidents/feeds"
            component={IncidentsFeedsLayout}
          />
          <Route
            exact
            path="/incidents/lossdatabase"
            component={IncidentsLossDatabaseLayout}
          />
          <Route
            exact
            path="/incidents/incidenttypes"
            component={IncidentsIncidentTypesLayout}
          />
          <Route exact path="/plans" component={EmergencyPlans} />
          <Route
            exact
            path="/plans/planner"
            component={EmergencyPlanPlannerLayout}
          />
          <Route
            exact
            path="/plans/planner/:planId/:activityId"
            component={EmergencyPlanProceduresLayout}
          />
          <Route
            exact
            path="/plans/activations"
            component={EmergencyPlanActivationsLayout}
          />
          <Route
            exact
            path="/plans/activities"
            component={EmergencyPlanActivitiesLayout}
          />
          <Route
            exact
            path="/plans/activities/:activityId"
            component={EmergencyPlanProceduresLayout}
          />
          <Route
            exact
            path="/plans/planner/:planId"
            component={EmergencyPlanActivitiesLayout}
          />
          <Route
            exact
            path="/plans/disseminations"
            component={EmergencyPlanDisseminationsLayout}
          />
          <Route
            exact
            path="/plans/drills"
            component={EmergencyPlanDrillsLayout}
          />
          <Route
            exact
            path="/plans/procedures"
            component={EmergencyPlanProceduresLayout}
          />
          <Route exact path="/resources" component={Resources} />
          <Route
            exact
            path="/resources/warehouses"
            component={ResourcesWarehousesLayout}
          />
          <Route
            exact
            path="/resources/stock"
            component={ResourcesStockLayout}
          />
          <Route
            exact
            path="/resources/items"
            component={ResourcesItemsLayout}
          />
          <Route
            exact
            path="/resources/utilization"
            component={ResourcesUtilizationLayout}
          />
          <Route
            exact
            path="/resources/adjustments"
            component={ResourcesAdjustmentsLayout}
          />
          <Route exact path="/stakeholders" component={Stakeholders} />
          <Route
            exact
            path="/stakeholders/notifications"
            component={StakeholdersNotificationsLayout}
          />
          <Route
            exact
            path="/stakeholders/contacts"
            component={StakeholdersContactsLayout}
          />
          <Route
            exact
            path="/stakeholders/roles"
            component={StakeholdersRolesLayout}
          />
        </Switch>
      </Content>
    </Layout>
  );
});

export default BaseLayout;
