import {
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Icon,
  Layout,
  Menu,
  Popover,
  Row,
} from 'antd';
import React from 'react';
import { Link, Switch, withRouter } from 'react-router-dom';
import Alerts from '../Alerts';
import AlertsActionsLayout from '../Alerts/layouts/Actions';
import AlertsLayout from '../Alerts/layouts/Alerts';
import AlertsFeedbackLayout from '../Alerts/layouts/Feedback';
import AlertsFeedsLayout from '../Alerts/layouts/Feeds';
import AlertsServiceRequestsLayout from '../Alerts/layouts/ServiceRequests';
import AlertsSourcesLayout from '../Alerts/layouts/Sources';
import Assessments from '../Assessments';
import AssessmentsIndicatorsLayout from '../Assessments/layouts/Indicators';
import AssessmentsQuestionnairesLayout from '../Assessments/layouts/Questionnaires';
import AssessmentsQuestionsLayout from '../Assessments/layouts/Questions';
import AssessmentsResponsesLayout from '../Assessments/layouts/Responses';
import PageNotFound from '../components/UIState/PageNotFound';
import GeographicalFeatures from '../GeographicalFeatures';
import AdministrativeBoundariesLayout from '../GeographicalFeatures/layouts/AdministrativeBoundaries';
import DistrictsLayout from '../GeographicalFeatures/layouts/Districts';
import EvacuationCentersLayout from '../GeographicalFeatures/layouts/EvacuationCenters';
import GeographicalFeaturesFacilitiesLayout from '../GeographicalFeatures/layouts/Facilities';
import GeographicalFeaturesInfrastructureLayout from '../GeographicalFeatures/layouts/Infrastructure';
import RegionsLayout from '../GeographicalFeatures/layouts/Regions';
import SubWardsLayout from '../GeographicalFeatures/layouts/SubWards';
import WardsLayout from '../GeographicalFeatures/layouts/Wards';
import GeographicalFeaturesWarehousesLayout from '../GeographicalFeatures/layouts/Warehouses';
import Home from '../Home';
import Incidents from '../Incidents';
import IncidentsActionsLayout from '../Incidents/layouts/Actions';
import IncidentsAssessmentsLayout from '../Incidents/layouts/Assessments';
import IncidentsCommandCenterLayout from '../Incidents/layouts/CommandCenter';
import IncidentsFeedsLayout from '../Incidents/layouts/Feeds';
import IncidentsIncidentTypesLayout from '../Incidents/layouts/IncidentTypes';
import IncidentsLossDatabaseLayout from '../Incidents/layouts/LossDatabase';
import EmergencyPlans from '../Plans';
import EmergencyPlanActivationsLayout from '../Plans/layouts/Activations';
import EmergencyPlanActivitiesLayout from '../Plans/layouts/Activities';
import EmergencyPlanDisseminationsLayout from '../Plans/layouts/Disseminations';
import EmergencyPlanDrillsLayout from '../Plans/layouts/Drills';
import EmergencyPlanPlannerLayout from '../Plans/layouts/Planner';
import EmergencyPlanProceduresLayout from '../Plans/layouts/Procedures';
import Resources from '../Resources';
import ResourcesAdjustmentsLayout from '../Resources/layouts/Adjustments';
import ResourcesItemCategoriesLayout from '../Resources/layouts/ItemCategories';
import ResourcesItemsLayout from '../Resources/layouts/Items';
import ResourcesItemUnitLayout from '../Resources/layouts/ItemUnit';
import ResourcesStockLayout from '../Resources/layouts/Stock';
import ResourcesUtilizationLayout from '../Resources/layouts/Utilization';
import ResourcesWarehousesLayout from '../Resources/layouts/Warehouses';
import Stakeholders from '../Stakeholders';
import StakeholdersAgenciesLayout from '../Stakeholders/layouts/Agencies';
import StakeholdersFocalPeopleLayout from '../Stakeholders/layouts/FocalPeople';
import StakeholdersNotificationsLayout from '../Stakeholders/layouts/Notifications';
import StakeholdersRolesLayout from '../Stakeholders/layouts/Roles';
import SecureRoute from '../Auth/SecureRoute';
import HeaderNavMenu from './components/HeaderNavMenu';
import './styles.css';

/* constants */
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
  '/geographicalfeatures/districts': {
    name: 'Districts',
    title: 'List of Districts',
  },
  '/geographicalfeatures/evacuationcenters': {
    name: 'Evacuation Centers',
    title: 'List of evacuation centers',
  },
  '/geographicalfeatures/facilities': {
    name: 'Facilities',
    title: 'Facilities available',
  },
  '/geographicalfeatures': {
    name: 'Geographical Features',
    title: 'Geographical features module',
  },
  '/geographicalfeatures/infrastructure': {
    name: 'Critical Infrastructure',
    title: 'List of critical infrastructures ',
  },
  '/geographicalfeatures/regions': {
    name: 'Regions',
    title: 'List of Regions',
  },
  '/geographicalfeatures/subwards': {
    name: 'Subwards',
    title: 'List of subwards',
  },
  '/geographicalfeatures/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  '/geographicalfeatures/wards': {
    name: 'Wards',
    title: 'List of all wards',
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
  '/resources': { name: 'Resources', title: 'Resource module' },
  '/resources/adjustments': {
    name: 'Adjustments',
    title: 'List of adjusted resources',
  },
  '/resources/items': { name: 'Items', title: 'List of available items' },
  '/resources/itemcategories': {
    name: 'Item Categories',
    title: 'List of available item categories',
  },
  '/resources/unitsofmeasure': {
    name: 'Item Unit',
    title: 'List of available units of measure for items',
  },
  '/resources/stocks': { name: 'Stocks', title: 'List of available stocks' },
  '/resources/utilization': {
    name: 'Utilizations',
    title: 'Resource utilizations',
  },
  '/resources/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  /* Stakeholders Routes */
  '/stakeholders/focalpeople': {
    name: 'Focal People',
    title: 'List of all focal persons',
  },
  '/stakeholders/agencies': {
    name: 'Agencies',
    title: 'List of all agencies',
  },
  '/stakeholders/notifications': {
    name: 'Notifications',
    title: 'Notify stakeholders',
  },
  '/stakeholders/roles': {
    name: 'Roles',
    title: 'Roles of Stakeholders',
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
 * @function
 * @name BaseLayout
 * @description Render base layout for EMIS dashboard
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
          <SecureRoute exact path="/" component={Home} />
          <SecureRoute exact path="/alerts" component={Alerts} />
          <SecureRoute path="/alerts/alerts" component={AlertsLayout} />
          <SecureRoute path="/alerts/actions" component={AlertsActionsLayout} />
          <SecureRoute path="/alerts/feeds" component={AlertsFeedsLayout} />
          <SecureRoute
            path="/alerts/feedback"
            component={AlertsFeedbackLayout}
          />
          <SecureRoute path="/alerts/sources" component={AlertsSourcesLayout} />
          <SecureRoute
            path="/alerts/servicerequests"
            component={AlertsServiceRequestsLayout}
          />
          <SecureRoute exact path="/assessments" component={Assessments} />
          <SecureRoute
            path="/assessments/indicators"
            component={AssessmentsIndicatorsLayout}
          />
          <SecureRoute
            path="/assessments/questionnaires"
            component={AssessmentsQuestionnairesLayout}
          />
          <SecureRoute
            path="/assessments/questions"
            component={AssessmentsQuestionsLayout}
          />
          <SecureRoute
            path="/assessments/responses"
            component={AssessmentsResponsesLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures"
            component={GeographicalFeatures}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/administrativeboundaries"
            component={AdministrativeBoundariesLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/districts"
            component={DistrictsLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/evacuationcenters"
            component={EvacuationCentersLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/facilities"
            component={GeographicalFeaturesFacilitiesLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/infrastructure"
            component={GeographicalFeaturesInfrastructureLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/regions"
            component={RegionsLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/subwards"
            component={SubWardsLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/warehouses"
            component={GeographicalFeaturesWarehousesLayout}
          />
          <SecureRoute
            exact
            path="/geographicalfeatures/wards"
            component={WardsLayout}
          />
          <SecureRoute exact path="/incidents" component={Incidents} />
          <SecureRoute
            exact
            path="/incidents/commandcenter"
            component={IncidentsCommandCenterLayout}
          />
          <SecureRoute
            exact
            path="/incidents/assessments"
            component={IncidentsAssessmentsLayout}
          />
          <SecureRoute
            exact
            path="/incidents/actions"
            component={IncidentsActionsLayout}
          />
          <SecureRoute
            exact
            path="/incidents/feeds"
            component={IncidentsFeedsLayout}
          />
          <SecureRoute
            exact
            path="/incidents/lossdatabase"
            component={IncidentsLossDatabaseLayout}
          />
          <SecureRoute
            exact
            path="/incidents/incidenttypes"
            component={IncidentsIncidentTypesLayout}
          />
          <SecureRoute exact path="/plans" component={EmergencyPlans} />
          <SecureRoute
            exact
            path="/plans/planner"
            component={EmergencyPlanPlannerLayout}
          />
          <SecureRoute
            exact
            path="/plans/planner/:planId/:activityId"
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute
            exact
            path="/plans/activations"
            component={EmergencyPlanActivationsLayout}
          />
          <SecureRoute
            exact
            path="/plans/activities"
            component={EmergencyPlanActivitiesLayout}
          />
          <SecureRoute
            exact
            path="/plans/activities/:activityId"
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute
            exact
            path="/plans/planner/:planId"
            component={EmergencyPlanActivitiesLayout}
          />
          <SecureRoute
            exact
            path="/plans/disseminations"
            component={EmergencyPlanDisseminationsLayout}
          />
          <SecureRoute
            exact
            path="/plans/drills"
            component={EmergencyPlanDrillsLayout}
          />
          <SecureRoute
            exact
            path="/plans/procedures"
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute exact path="/resources" component={Resources} />
          <SecureRoute
            exact
            path="/resources/items"
            component={ResourcesItemsLayout}
          />
          <SecureRoute
            exact
            path="/resources/itemcategories"
            component={ResourcesItemCategoriesLayout}
          />
          <SecureRoute
            exact
            path="/resources/unitsofmeasure"
            component={ResourcesItemUnitLayout}
          />
          <SecureRoute
            exact
            path="/resources/warehouses"
            component={ResourcesWarehousesLayout}
          />
          <SecureRoute
            exact
            path="/resources/stocks"
            component={ResourcesStockLayout}
          />
          <SecureRoute
            exact
            path="/resources/utilization"
            component={ResourcesUtilizationLayout}
          />
          <SecureRoute
            exact
            path="/resources/adjustments"
            component={ResourcesAdjustmentsLayout}
          />
          <SecureRoute exact path="/stakeholders" component={Stakeholders} />
          <SecureRoute
            exact
            path="/stakeholders/notifications"
            component={StakeholdersNotificationsLayout}
          />
          <SecureRoute
            exact
            path="/stakeholders/focalpeople"
            component={StakeholdersFocalPeopleLayout}
          />
          <SecureRoute
            exact
            path="/stakeholders/agencies"
            component={StakeholdersAgenciesLayout}
          />
          <SecureRoute
            exact
            path="/stakeholders/roles"
            component={StakeholdersRolesLayout}
          />
          <SecureRoute component={PageNotFound} />
        </Switch>
      </Content>
    </Layout>
  );
});

export default BaseLayout;
