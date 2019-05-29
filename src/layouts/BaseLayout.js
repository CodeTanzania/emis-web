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
import PropTypes from 'prop-types';
import { Link, Switch } from 'react-router-dom';
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
  '/app': { name: 'Home', title: 'EMIS' },
  /* Alerts Routes */
  '/app/alerts': { name: 'Alerts', title: 'Alerts module' },
  '/app/alerts/actions': {
    name: 'Actions Taken',
    title: 'List of all performed actions',
  },
  '/app/alerts/feedback': {
    name: 'Surveys & Feedback',
    title: 'Alerts surveys and feedback',
  },
  '/app/alerts/feeds': { name: 'Feeds', title: 'Alerts feeds' },
  '/app/alerts/alerts': { name: 'Issued Alerts', title: 'List of all alerts' },
  '/app/alerts/servicerequests': {
    name: 'Service Requests',
    title: 'Alerts service requests',
  },
  '/app/alerts/sources': {
    name: 'Alerts Sources',
    title: 'Data sources for alerts',
  },
  /* Assessments Routes */
  '/app/assessments': { name: 'Assessments', title: 'Assessments module' },
  '/app/assessments/indicators': {
    name: 'Indicators',
    title: 'Indicators for monitoring assessments',
  },
  '/app/assessments/questionnaires': {
    name: 'Questionnaires',
    title: 'List of questionnaires',
  },
  '/app/assessments/questions': {
    name: 'Questions',
    title: 'List of questions',
  },
  '/app/assessments/responses': {
    name: 'Responses & Observations',
    title: 'Responses and observations',
  },
  /* Geographical Features Routes */
  '/app/geographicalfeatures/administrativeboundaries': {
    name: 'Administrative Boundaries',
    title: 'List of administrative boundaries',
  },
  '/app/geographicalfeatures/districts': {
    name: 'Districts',
    title: 'List of Districts',
  },
  '/app/geographicalfeatures/evacuationcenters': {
    name: 'Evacuation Centers',
    title: 'List of evacuation centers',
  },
  '/app/geographicalfeatures/facilities': {
    name: 'Facilities',
    title: 'Facilities available',
  },
  '/app/geographicalfeatures': {
    name: 'Geographical Features',
    title: 'Geographical features module',
  },
  '/app/geographicalfeatures/infrastructure': {
    name: 'Critical Infrastructure',
    title: 'List of critical infrastructures ',
  },
  '/app/geographicalfeatures/regions': {
    name: 'Regions',
    title: 'List of Regions',
  },
  '/app/geographicalfeatures/subwards': {
    name: 'Subwards',
    title: 'List of subwards',
  },
  '/app/geographicalfeatures/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  '/app/geographicalfeatures/wards': {
    name: 'Wards',
    title: 'List of all wards',
  },
  /* Incidents Routes */
  '/app/incidents/actions': {
    name: 'Actions',
    title: 'Incident actions performed',
  },
  '/app/incidents/assessments': {
    name: 'Assessments',
    title: 'Assessment of an incident',
  },
  '/app/incidents/commandcenter': {
    name: 'Command Center',
    title: 'Incidents command center',
  },
  '/app/incidents/feeds': { name: 'Feeds', title: 'Incident feeds' },
  '/app/incidents': { name: 'Incidents', title: 'Incidents module' },
  '/app/incidents/incidenttypes': {
    name: 'Incidents Types',
    title: 'List of Incidents Types',
  },
  '/app/incidents/lossdatabase': {
    name: 'Loss Database',
    title: 'List of previous incidents',
  },
  /* Plans Routes */
  '/app/plans/activations': { name: 'Activations', title: 'Plans activation' },
  '/app/plans/activities': { name: 'Activities', title: 'Plans Activities' },
  '/app/plans/disseminations': {
    name: 'Disseminations',
    title: 'Dissemination of plans',
  },
  '/app/plans/drills': {
    name: 'Drills & Exercises',
    title: 'List of drills and exercises',
  },
  '/app/plans': { name: 'Emergency Plans', title: 'Emergency plans module' },
  '/app/plans/planner': { name: 'Planner', title: 'Planner' },
  '/app/plans/procedures': {
    name: 'Standard Operating Procedures',
    title: 'Standard Operating Procedures(SOP)',
  },
  /* Resources Routes */
  '/app/resources': { name: 'Resources', title: 'Resource module' },
  '/app/resources/adjustments': {
    name: 'Adjustments',
    title: 'List of adjusted resources',
  },
  '/app/resources/items': { name: 'Items', title: 'List of available items' },
  '/app/resources/itemcategories': {
    name: 'Item Categories',
    title: 'List of available item categories',
  },
  '/app/resources/unitsofmeasure': {
    name: 'Item Unit',
    title: 'List of available units of measure for items',
  },
  '/app/resources/stocks': {
    name: 'Stocks',
    title: 'List of available stocks',
  },
  '/app/resources/utilization': {
    name: 'Utilizations',
    title: 'Resource utilizations',
  },
  '/app/resources/warehouses': {
    name: 'Warehouses',
    title: 'List of available warehouses',
  },
  /* Stakeholders Routes */
  '/app/stakeholders/focalpeople': {
    name: 'Focal People',
    title: 'List of all focal persons',
  },
  '/app/stakeholders/agencies': {
    name: 'Agencies',
    title: 'List of all agencies',
  },
  '/app/stakeholders/notifications': {
    name: 'Notifications',
    title: 'Notify stakeholders',
  },
  '/app/stakeholders/roles': {
    name: 'Roles',
    title: 'Roles of Stakeholders',
  },
  '/app/stakeholders': { name: 'Stakeholders', title: 'Stakeholders module' },
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
 * @param {object} props Properties inject by router
 *
 * @returns {object} BaseLayout component
 * @version 0.1.0
 * @since 0.1.0
 */
const BaseLayout = props => {
  const {
    location,
    match: { url: baseUrl },
  } = props;

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

  // TODO clean this up
  const breadcrumbItems = [].concat(extraBreadcrumbItems);

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
          <SecureRoute exact path={`${baseUrl}/`} component={Home} />
          <SecureRoute exact path={`${baseUrl}/alerts`} component={Alerts} />
          <SecureRoute
            path={`${baseUrl}/alerts/alerts`}
            component={AlertsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/actions`}
            component={AlertsActionsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/feeds`}
            component={AlertsFeedsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/feedback`}
            component={AlertsFeedbackLayout}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/sources`}
            component={AlertsSourcesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/servicerequests`}
            component={AlertsServiceRequestsLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/assessments`}
            component={Assessments}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/indicators`}
            component={AssessmentsIndicatorsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/questionnaires`}
            component={AssessmentsQuestionnairesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/questions`}
            component={AssessmentsQuestionsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/responses`}
            component={AssessmentsResponsesLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/geographicalfeatures`}
            component={GeographicalFeatures}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/administrativeboundaries`}
            component={AdministrativeBoundariesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/districts`}
            component={DistrictsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/evacuationcenters`}
            component={EvacuationCentersLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/facilities`}
            component={GeographicalFeaturesFacilitiesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/infrastructure`}
            component={GeographicalFeaturesInfrastructureLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/regions`}
            component={RegionsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/subwards`}
            component={SubWardsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/warehouses`}
            component={GeographicalFeaturesWarehousesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/wards`}
            component={WardsLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/incidents`}
            component={Incidents}
          />

          <SecureRoute
            path={`${baseUrl}/incidents/commandcenter`}
            component={IncidentsCommandCenterLayout}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/assessments`}
            component={IncidentsAssessmentsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/actions`}
            component={IncidentsActionsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/feeds`}
            component={IncidentsFeedsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/lossdatabase`}
            component={IncidentsLossDatabaseLayout}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/incidenttypes`}
            component={IncidentsIncidentTypesLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/plans`}
            component={EmergencyPlans}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner`}
            component={EmergencyPlanPlannerLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner/:planId/:activityId`}
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activations`}
            component={EmergencyPlanActivationsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activities`}
            component={EmergencyPlanActivitiesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activities/:activityId`}
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner/:planId`}
            component={EmergencyPlanActivitiesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/disseminations`}
            component={EmergencyPlanDisseminationsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/drills`}
            component={EmergencyPlanDrillsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/plans/procedures`}
            component={EmergencyPlanProceduresLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources`}
            component={Resources}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources/items`}
            component={ResourcesItemsLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources/itemcategories`}
            component={ResourcesItemCategoriesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/resources/unitsofmeasure`}
            component={ResourcesItemUnitLayout}
          />
          <SecureRoute
            path={`${baseUrl}/resources/warehouses`}
            component={ResourcesWarehousesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/resources/stocks`}
            component={ResourcesStockLayout}
          />
          <SecureRoute
            path={`${baseUrl}/resources/utilization`}
            component={ResourcesUtilizationLayout}
          />
          <SecureRoute
            path={`${baseUrl}/resources/adjustments`}
            component={ResourcesAdjustmentsLayout}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/stakeholders`}
            component={Stakeholders}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/notifications`}
            component={StakeholdersNotificationsLayout}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/focalpeople`}
            component={StakeholdersFocalPeopleLayout}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/agencies`}
            component={StakeholdersAgenciesLayout}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/roles`}
            component={StakeholdersRolesLayout}
          />
          <SecureRoute component={PageNotFound} />
        </Switch>
      </Content>
    </Layout>
  );
};

BaseLayout.propTypes = {
  location: PropTypes.string.isRequired,
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string })
    .isRequired,
};

export default BaseLayout;
