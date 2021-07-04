import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'

import { Avatar, Select, Icon } from 'shared/components';
import {getUserAvatarUrl} from 'shared/utils/user';
import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsAssigneesReporter = ({ issue, updateIssue, projectUsers }) => {
  
  const getUserById = userId => ( projectUsers.find(user => get(user, "_id") === userId))

  const userOptions = projectUsers.map(user => ({ value: get(user, "_id"), label: user.name }));

  return (
    <Fragment>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        name="assignees"
        value={issue.assignees}
        options={userOptions}
        onChange={userIds => {
          updateIssue({ assignees: userIds });
        }}
        renderValue={({ value: userId, removeOptionValue }) =>
          renderUser(getUserById(userId), true, removeOptionValue)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId), false)}
      />

      <SectionTitle>Reporter</SectionTitle>
      <Fragment>
       {renderUser(getUserById(issue.reporterId), false)}
       </Fragment>
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => {  
  return (
    user &&
    <User
      key={get(user, "_id")}
      isSelectValue={isSelectValue}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar avatarUrl={getUserAvatarUrl(user)} name={user.name} size={24} />
      <Username>{user.name}</Username>
      {removeOptionValue && <Icon type="close" top={1} />}
    </User>
  );
}

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
