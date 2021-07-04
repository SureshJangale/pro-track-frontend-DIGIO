import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';
import Layout from '../Layout'

import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueSearch from './IssueSearch';
import IssueCreate from './IssueCreate';
import ProjectSettings from './ProjectSettings';
import { ProjectPage } from './Styles';


const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const { slug } = match.params;

  if (!slug) return <PageError />;

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');

  const [{ data, error, isLoading, setLocalData }, fetchProject] = useApi.get(`/project/${slug}`);

  if (isLoading) return <PageLoader />;
  if (!data || error) return <PageError />;

  const project = data;

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      ...currentData,
      issues: updateArrayItemById(currentData.issues, issueId, updatedFields),
    }));
  };

  return (
    !project ?
      <Layout>
        <PageLoader />
      </Layout>
      :
      <Layout>
        <ProjectPage>
          <NavbarLeft
            issueSearchModalOpen={issueSearchModalHelpers.open}
            issueCreateModalOpen={issueCreateModalHelpers.open}
          />

          <Sidebar project={project} />

          {issueSearchModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:issue-search"
              variant="aside"
              width={600}
              top='3rem'
              onClose={issueSearchModalHelpers.close}
              renderContent={() => <IssueSearch project={project} />}
            />
          )}

          {issueCreateModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:issue-create"
              width={800}
              withCloseIcon={false}
              onClose={issueCreateModalHelpers.close}
              renderContent={modal => (
                <IssueCreate
                  project={project}
                  fetchProject={fetchProject}
                  onCreate={() => history.push(`${match.url}/board`)}
                  modalClose={modal.close}
                />
              )}
            />
          )}

          <Route
            path={`${match.url}/board`}
            render={() => (
              <Board
                project={project}
                fetchProject={fetchProject}
                updateLocalProjectIssues={updateLocalProjectIssues}
              />
            )}
          />

          <Route
            path={`/project/${slug}/settings`}
            render={() => <ProjectSettings project={project} fetchProject={fetchProject} />}
          />

          {match.isExact && <Redirect to={`/project/${slug}/board`} />}
        </ProjectPage>
      </Layout>
  );
};

export default Project;
