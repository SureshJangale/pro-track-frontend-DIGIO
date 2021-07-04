import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork'

// import { Icon } from 'shared/components';

import {
  Sidebar,
  LinkItem,
  LinkText,
  MaterialIcon
} from './Styles';


const ProjectSidebar = () => {
  return (
    <Sidebar>
      {renderLinkItemWithMaterialIcon(`/dashboard`, 'DashBoard', <DashboardIcon/>, '')}
      {renderLinkItemWithMaterialIcon(`/dashboard`, 'Projects', <GroupWorkIcon/>, '/projects')}
      {renderLinkItemWithMaterialIcon(`/dashboard`, 'Users', <PeopleIcon/>, '/users')}
    </Sidebar>
  );
};

const renderLinkItemWithMaterialIcon = (match, text, icon, path) => {
  
  const linkItemProps = { as: NavLink, exact: true, to: `${match}${path}` };
 
 return (
    <LinkItem {...linkItemProps}>
      <MaterialIcon>
        {icon}
      </MaterialIcon>
      <LinkText>{text}</LinkText>
    </LinkItem>
  );
};

// const renderLinkItem = (match, text, iconType, path) => {

//   const linkItemProps = { as: NavLink, exact: true, to: `${match}${path}` };

//   return (
//     <LinkItem {...linkItemProps}>
//       <Icon type={iconType} />
//       <LinkText>{text}</LinkText>
//     </LinkItem>
//   );
// };

export default ProjectSidebar;
