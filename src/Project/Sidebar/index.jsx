import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ProjectCategoryCopy } from 'shared/constants/projects';
import { Icon, ProjectAvatar } from 'shared/components';

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  LinkItem,
  LinkText,
  NotImplemented,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectSidebar = ({ project }) => {

  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{project.title}</ProjectName>
          <ProjectCategory>{ProjectCategoryCopy[project.category]} project</ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>

      {renderLinkItem(`/project/${project.slug}`, 'Kanban Board', 'board', '/board')}
      {renderLinkItem(`/project/${project.slug}`, 'Project settings', 'settings', '/settings')}
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? { as: NavLink, exact: true, to: `${match}${path}` }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
