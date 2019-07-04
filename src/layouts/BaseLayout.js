import { Breadcrumb, Button, Col, Layout, Popover, Row } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Switch } from 'react-router-dom';
import UserMenu from './components/UserMenu';
import Alerts from '../Alerts';
import AlertsActions from '../Alerts/layouts/Actions';
import IssuedAlerts from '../Alerts/components/IssuedAlerts';
import AlertsFeedback from '../Alerts/layouts/Feedback';
import AlertsFeeds from '../Alerts/layouts/Feeds';
import AlertsServiceRequests from '../Alerts/layouts/ServiceRequests';
import AlertsSources from '../Alerts/components/AlertSources';
import Assessments from '../Assessments';
import AssessmentsIndicators from '../Assessments/layouts/Indicators';
import AssessmentsQuestionnaires from '../Assessments/layouts/Questionnaires';
import AssessmentsQuestions from '../Assessments/layouts/Questions';
import AssessmentsResponses from '../Assessments/layouts/Responses';
import OverviewDashboard from '../Dashboards';
import PageNotFound from '../components/UIState/PageNotFound';
import GeographicalFeatures from '../GeographicalFeatures';
import AdministrativeBoundaries from '../GeographicalFeatures/components/AdministrativeBoundaries';
import Districts from '../GeographicalFeatures/components/Districts';
import EvacuationCenters from '../GeographicalFeatures/components/EvacuationCenters';
import GeographicalFeaturesFacilities from '../GeographicalFeatures/components/Facilities';
import GeographicalFeaturesInfrastructure from '../GeographicalFeatures/components/Infrastructure';
import Regions from '../GeographicalFeatures/components/Regions';
import SubWards from '../GeographicalFeatures/layouts/SubWards';
import Wards from '../GeographicalFeatures/components/Wards';
import GeographicalFeaturesWarehouses from '../GeographicalFeatures/components/Warehouses';
import Home from '../Home';
import Incidents from '../Incidents';
import IncidentsActions from '../Incidents/layouts/Actions';
import IncidentsAssessments from '../Incidents/layouts/Assessments';
import IncidentsCommandCenter from '../Incidents/layouts/CommandCenter';
import IncidentsFeeds from '../Incidents/layouts/Feeds';
import IncidentsIncidentTypes from '../Incidents/components/IncidentTypes';
import IncidentsLossDatabase from '../Incidents/layouts/LossDatabase';
import EmergencyPlans from '../Plans';
import EmergencyPlanActivations from '../Plans/layouts/Activations';
import EmergencyPlanActivities from '../Plans/components/Activities';
import EmergencyPlanDisseminations from '../Plans/layouts/Disseminations';
import EmergencyPlanDrills from '../Plans/layouts/Drills';
import EmergencyPlanPlanner from '../Plans/components/Planner';
import EmergencyPlanProcedures from '../Plans/components/Procedures';
import Resources from '../Resources';
import ResourcesAdjustments from '../Resources/components/Adjustments';
import ResourcesItemCategories from '../Resources/components/ItemCategories';
import ResourcesItems from '../Resources/components/Items';
import ResourcesItemUnits from '../Resources/components/ItemUnits';
import ResourcesStock from '../Resources/components/Stock';
import ResourcesUtilization from '../Resources/layouts/Utilization';
import ResourcesWarehouses from '../Resources/components/Warehouses';
import Stakeholders from '../Stakeholders';
import StakeholdersAgencies from '../Stakeholders/components/Agencies';
import StakeholdersFocalPeople from '../Stakeholders/components/FocalPeople';
import StakeholdersNotifications from '../Stakeholders/components/Notifications';
import StakeholdersRoles from '../Stakeholders/components/Roles';
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
  '/app/alerts/issuedalerts': {
    name: 'Issued Alerts',
    title: 'List of all alerts',
  },
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
  '/app/overview': { name: 'Overview Dashboard', title: 'Overview Dashboard' },
};

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
          <Col xxl={22} xl={22} lg={22} md={22} sm={20} xs={20}>
            <Breadcrumb className="Breadcrumb" separator=">">
              {breadcrumbItems}
            </Breadcrumb>
          </Col>
          {/* breadcrumb section end */}

          <Col xxl={2} xl={2} lg={2} md={2} sm={4} xs={4}>
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
                <UserMenu />
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
            path={`${baseUrl}/alerts/issuedalerts`}
            component={IssuedAlerts}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/actions`}
            component={AlertsActions}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/feeds`}
            component={AlertsFeeds}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/feedback`}
            component={AlertsFeedback}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/sources`}
            component={AlertsSources}
          />
          <SecureRoute
            path={`${baseUrl}/alerts/servicerequests`}
            component={AlertsServiceRequests}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/assessments`}
            component={Assessments}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/indicators`}
            component={AssessmentsIndicators}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/questionnaires`}
            component={AssessmentsQuestionnaires}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/questions`}
            component={AssessmentsQuestions}
          />
          <SecureRoute
            path={`${baseUrl}/assessments/responses`}
            component={AssessmentsResponses}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/geographicalfeatures`}
            component={GeographicalFeatures}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/administrativeboundaries`}
            component={AdministrativeBoundaries}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/districts`}
            component={Districts}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/evacuationcenters`}
            component={EvacuationCenters}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/facilities`}
            component={GeographicalFeaturesFacilities}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/infrastructure`}
            component={GeographicalFeaturesInfrastructure}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/regions`}
            component={Regions}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/subwards`}
            component={SubWards}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/warehouses`}
            component={GeographicalFeaturesWarehouses}
          />
          <SecureRoute
            path={`${baseUrl}/geographicalfeatures/wards`}
            component={Wards}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/incidents`}
            component={Incidents}
          />

          <SecureRoute
            path={`${baseUrl}/incidents/commandcenter`}
            component={IncidentsCommandCenter}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/assessments`}
            component={IncidentsAssessments}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/actions`}
            component={IncidentsActions}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/feeds`}
            component={IncidentsFeeds}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/lossdatabase`}
            component={IncidentsLossDatabase}
          />
          <SecureRoute
            path={`${baseUrl}/incidents/incidenttypes`}
            component={IncidentsIncidentTypes}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/plans`}
            component={EmergencyPlans}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner`}
            component={EmergencyPlanPlanner}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner/:planId/:activityId`}
            component={EmergencyPlanProcedures}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activations`}
            component={EmergencyPlanActivations}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activities`}
            component={EmergencyPlanActivities}
          />
          <SecureRoute
            path={`${baseUrl}/plans/activities/:activityId`}
            component={EmergencyPlanProcedures}
          />
          <SecureRoute
            path={`${baseUrl}/plans/planner/:planId`}
            component={EmergencyPlanActivities}
          />
          <SecureRoute
            path={`${baseUrl}/plans/disseminations`}
            component={EmergencyPlanDisseminations}
          />
          <SecureRoute
            path={`${baseUrl}/plans/drills`}
            component={EmergencyPlanDrills}
          />
          <SecureRoute
            path={`${baseUrl}/plans/procedures`}
            component={EmergencyPlanProcedures}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources`}
            component={Resources}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources/items`}
            component={ResourcesItems}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/resources/itemcategories`}
            component={ResourcesItemCategories}
          />
          <SecureRoute
            path={`${baseUrl}/resources/unitsofmeasure`}
            component={ResourcesItemUnits}
          />
          <SecureRoute
            path={`${baseUrl}/resources/warehouses`}
            component={ResourcesWarehouses}
          />
          <SecureRoute
            path={`${baseUrl}/resources/stocks`}
            component={ResourcesStock}
          />
          <SecureRoute
            path={`${baseUrl}/resources/utilization`}
            component={ResourcesUtilization}
          />
          <SecureRoute
            path={`${baseUrl}/resources/adjustments`}
            component={ResourcesAdjustments}
          />
          <SecureRoute
            exact
            path={`${baseUrl}/stakeholders`}
            component={Stakeholders}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/notifications`}
            component={StakeholdersNotifications}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/focalpeople`}
            component={StakeholdersFocalPeople}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/agencies`}
            component={StakeholdersAgencies}
          />
          <SecureRoute
            path={`${baseUrl}/stakeholders/roles`}
            component={StakeholdersRoles}
          />
          <SecureRoute
            path={`${baseUrl}/overview`}
            component={OverviewDashboard}
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
